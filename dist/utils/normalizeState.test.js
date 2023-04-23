"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizeState_1 = require("./normalizeState");
describe("normalizeState", () => {
    it("should return the state name and abbreviation if found", () => {
        const result = (0, normalizeState_1.normalizeState)("Florida");
        expect(result).toBe("Florida FL");
    });
    it("should return the state name and abbreviation if found using lowercase input", () => {
        const result = (0, normalizeState_1.normalizeState)("florida");
        expect(result).toBe("Florida FL");
    });
    it("should return the state name and abbreviation if found using abbreviation input", () => {
        const result = (0, normalizeState_1.normalizeState)("FL");
        expect(result).toBe("Florida FL");
    });
    it("should return the input parameter if state not found", () => {
        const result = (0, normalizeState_1.normalizeState)("Some Random State");
        expect(result).toBe("Some Random State");
    });
    it("should return the input parameter if empty string is passed", () => {
        const result = (0, normalizeState_1.normalizeState)("");
        expect(result).toBe("");
    });
});
//# sourceMappingURL=normalizeState.test.js.map