import { normalizeState } from "./normalizeState";

describe("normalizeState", () => {
  it("should return the state name and abbreviation if found", () => {
    const result = normalizeState("Florida");
    expect(result).toBe("Florida FL");
  });

  it("should return the state name and abbreviation if found using lowercase input", () => {
    const result = normalizeState("florida");
    expect(result).toBe("Florida FL");
  });

  it("should return the state name and abbreviation if found using abbreviation input", () => {
    const result = normalizeState("FL");
    expect(result).toBe("Florida FL");
  });

  it("should return the input parameter if state not found", () => {
    const result = normalizeState("Some Random State");
    expect(result).toBe("Some Random State");
  });

  it("should return the input parameter if empty string is passed", () => {
    const result = normalizeState("");
    expect(result).toBe("");
  });
});
