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
// Importing the Express module
const express_1 = __importDefault(require("express"));
const services_1 = require("./services");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Creating an instance of the Express application
const app = (0, express_1.default)();
// Setting the port to listen for incoming requests
const port = process.env.PORT || 3000;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Defining a route to handle GET requests to the root path of the server
app.get("/", (req, res) => {
    res.json({
        message: "Hello, this is a  API created by IgorMagal for the Scratch clinic search project.",
    });
});
// Defining a route to handle GET requests containing the clinic results:
app.get("/clinics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, state, type, from, to, page, limit } = req.query;
        const clinics = yield (0, services_1.fetchClinics)({
            name,
            state,
            type,
            from,
            to,
            page,
            limit,
        });
        res.json(clinics);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Starting the server and listening for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map