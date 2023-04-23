import axios from "axios";
import { fetchClinics } from "./services";
import { QueryParams } from "./models";

describe("GET /clinics", () => {
  it("should return the expected clinics when no params are provided", async () => {
    const queryParams = {};

    const clinics = await fetchClinics(queryParams);

    expect(clinics.length).toBeGreaterThan(0);
  });

  it("should return the expected clinics", async () => {
    const queryParams = {
      name: "t",
      state: "CA",
      type: "vet",
      from: "00:00",
      to: "24:00",
      page: "1",
      limit: "10",
    };

    const expectedClinics = [
      {
        type: "vet",
        name: "National Veterinary Clinic",
        state: "California CA",
        availability: {
          from: "15:00",
          to: "22:30",
        },
      },
      {
        type: "vet",
        name: "Scratchpay Test Pet Medical Center",
        state: "California CA",
        availability: {
          from: "00:00",
          to: "24:00",
        },
      },
    ];

    const clinics = await fetchClinics(queryParams);

    expect(clinics).toEqual(expectedClinics);
  });

  it("throws an error when fetching data", async () => {
    const mockError = new Error("Failed to fetch data");
    jest.spyOn(axios, "get").mockRejectedValueOnce(mockError);

    await expect(fetchClinics({})).rejects.toThrow(
      "Failed to fetch clinics data"
    );
  });

  it("should return an error if clinic availability 'to' field is missing", async () => {
    const params: QueryParams = { to: "12:00" };
    const mockError = new Error("Failed to fetch clinics data");
    jest.spyOn(axios, "get").mockRejectedValueOnce(mockError);

    await expect(fetchClinics(params)).rejects.toThrow(
      "Failed to fetch clinics data"
    );
  });
});
