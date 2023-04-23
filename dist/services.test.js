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
const axios_1 = __importDefault(require("axios"));
const services_1 = require("./services");
describe("GET /clinics", () => {
    it("should return the expected clinics when no params are provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const queryParams = {};
        const clinics = yield (0, services_1.fetchClinics)(queryParams);
        expect(clinics.length).toBeGreaterThan(0);
    }));
    it("should return the expected clinics", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const clinics = yield (0, services_1.fetchClinics)(queryParams);
        expect(clinics).toEqual(expectedClinics);
    }));
    it("throws an error when fetching data", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Failed to fetch data");
        jest.spyOn(axios_1.default, "get").mockRejectedValueOnce(mockError);
        yield expect((0, services_1.fetchClinics)({})).rejects.toThrow("Failed to fetch clinics data");
    }));
    it("should return an error if clinic availability 'to' field is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { to: "12:00" };
        const mockError = new Error("Failed to fetch clinics data");
        jest.spyOn(axios_1.default, "get").mockRejectedValueOnce(mockError);
        yield expect((0, services_1.fetchClinics)(params)).rejects.toThrow("Failed to fetch clinics data");
    }));
});
//# sourceMappingURL=services.test.js.map