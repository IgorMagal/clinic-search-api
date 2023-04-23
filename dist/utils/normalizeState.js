"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeState = void 0;
const usa_states_1 = require("usa-states");
// Import the usa-states package to use it in the function
const usStates = new usa_states_1.UsaStates();
// Create a new instance of the UsaStates class
function normalizeState(state) {
    const foundState = usStates.states.find((s) => s.name.toLowerCase() === state.toLowerCase() ||
        s.abbreviation.toLowerCase() === state.toLowerCase());
    // Use the find() method to find a state in the states array that matches the input parameter
    if (foundState) {
        return `${foundState.name} ${foundState.abbreviation}`;
    }
    // If a state is found, use a template literal to return the state name and abbreviation
    return state;
    // If no state is found, return the input parameter
}
exports.normalizeState = normalizeState;
//# sourceMappingURL=normalizeState.js.map