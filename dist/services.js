"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchClinics = void 0;
// Importing the axios module to make HTTP requests
const axios_1 = __importDefault(require("axios"));
const normalizeState_1 = require("./utils/normalizeState");
// Async function to fetch clinics data
function fetchClinics(params) {
    return __awaiter(this, void 0, void 0, function* () {
        // Define the URLs for the remote clinics data sources
        const urls = [
            "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json",
            "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json",
        ];
        try {
            // Make HTTP GET requests to the remote URLs in parallel
            const requests = urls.map((url) => axios_1.default.get(url));
            const responses = yield Promise.all(requests);
            // Initialize an empty array to store the clinics data
            const clinics = [];
            // Parse the clinics data from the HTTP responses
            responses.forEach((response, index) => {
                const data = response.data;
                const clinicType = urls[index].includes("dental") ? "dental" : "vet";
                data.forEach((clinic) => {
                    clinics.push({
                        type: clinicType,
                        name: clinic.name || clinic.clinicName || null,
                        state: (0, normalizeState_1.normalizeState)(clinic.stateCode || clinic.stateName),
                        availability: clinic.availability || clinic.opening,
                    });
                });
            });
            // Filter clinics by name, state, type, from, to
            let filteredClinics = clinics;
            if (params.name) {
                filteredClinics = filteredClinics.filter((clinic) => { var _a; return (_a = clinic.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(params.name.toLowerCase()); });
            }
            if (params.state) {
                filteredClinics = filteredClinics.filter((clinic) => { var _a; return (_a = clinic.state) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(params.state.toLowerCase()); });
            }
            if (params.type) {
                filteredClinics = filteredClinics.filter((clinic) => { var _a; return (_a = clinic.type) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(params.type.toLowerCase()); });
            }
            if (params.from) {
                filteredClinics = filteredClinics.filter((clinic) => {
                    const clinicFrom = clinic.availability.from;
                    if (!clinicFrom)
                        return false; // ignore clinics with missing availability data
                    const clinicFromTime = new Date(`01/01/2000 ${clinic.availability.from}:00`);
                    const paramFromTime = new Date(`01/01/2000 ${params.from}:00`);
                    return clinicFromTime >= paramFromTime;
                });
            }
            if (params.to) {
                filteredClinics = filteredClinics.filter((clinic) => {
                    const clinicTo = clinic.availability.from;
                    if (!clinicTo)
                        return false;
                    const clinicToTime = new Date(`01/01/2000 ${clinic.availability.to}:00`);
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
        }
        catch (error) {
            // Catch any errors that occur while fetching the data
            console.error(error);
            throw new Error("Failed to fetch clinics data");
        }
    });
}
exports.fetchClinics = fetchClinics;
//# sourceMappingURL=services.js.map