// Importing the axios module to make HTTP requests
import axios from "axios";
import { Clinic, QueryParams } from "./models";
import { normalizeState } from "./utils/normalizeState";

// Async function to fetch clinics data
async function fetchClinics(params: QueryParams): Promise<Clinic[]> {
  // Define the URLs for the remote clinics data sources
  const urls = [
    "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json",
    "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json",
  ];

  try {
    // Make HTTP GET requests to the remote URLs in parallel
    const requests = urls.map((url) => axios.get(url));
    const responses = await Promise.all(requests);

    // Initialize an empty array to store the clinics data
    const clinics: Clinic[] = [];

    // Parse the clinics data from the HTTP responses
    responses.forEach((response, index) => {
      const data = response.data;
      const clinicType = urls[index].includes("dental") ? "dental" : "vet";

      data.forEach((clinic: any) => {
        clinics.push({
          type: clinicType,
          name: clinic.name || clinic.clinicName || null,
          state: normalizeState(clinic.stateCode || clinic.stateName),
          availability: clinic.availability || clinic.opening,
        });
      });
    });

    // Filter clinics by name, state, type, from, to
    let filteredClinics = clinics;
    if (params.name) {
      filteredClinics = filteredClinics.filter((clinic) =>
        clinic.name?.toLowerCase().includes(params.name!.toLowerCase())
      );
    }
    if (params.state) {
      filteredClinics = filteredClinics.filter((clinic) =>
        clinic.state?.toLowerCase().includes(params.state!.toLowerCase())
      );
    }
    if (params.type) {
      filteredClinics = filteredClinics.filter((clinic) =>
        clinic.type?.toLowerCase().includes(params.type!.toLowerCase())
      );
    }
    if (params.from) {
      filteredClinics = filteredClinics.filter((clinic) => {
        const clinicFrom = clinic.availability.from;
        if (!clinicFrom) return false; // ignore clinics with missing availability data
        const clinicFromTime = new Date(
          `01/01/2000 ${clinic.availability.from}:00`
        );
        const paramFromTime = new Date(`01/01/2000 ${params.from}:00`);
        return clinicFromTime >= paramFromTime;
      });
    }
    if (params.to) {
      filteredClinics = filteredClinics.filter((clinic) => {
        const clinicTo = clinic.availability.from;
        if (!clinicTo) return false;
        const clinicToTime = new Date(
          `01/01/2000 ${clinic.availability.to}:00`
        );
        const paramToTime = new Date(`01/01/2000 ${params.to}:00`);
        return clinicToTime <= paramToTime;
      });
    }

    // Pagination
    const page = params.page ? parseInt(params.page, 10) : 1;
    const limit = params.limit ? parseInt(params.limit, 10) : 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedClinics = filteredClinics.slice(startIndex, endIndex);

    // Return the filtered and paginated clinics data
    return paginatedClinics;
  } catch (error) {
    // Catch any errors that occur while fetching the data
    console.error(error);
    throw new Error("Failed to fetch clinics data");
  }
}

export { fetchClinics };
