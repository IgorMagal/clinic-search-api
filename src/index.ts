// Importing the Express module
import express, { Application, Response, Request } from "express";
import { QueryParams } from "./models";
import { fetchClinics } from "./services";
import rateLimit from "express-rate-limit";

// Creating an instance of the Express application

const app: Application = express();

// Setting the port to listen for incoming requests
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Defining a route to handle GET requests to the root path of the server
app.get("/", (req: Request, res: Response) => {
  res.json({
    message:
      "Hello, this is a  API created by IgorMagal for the Scratch clinic search project.",
  });
});

// Defining a route to handle GET requests containing the clinic results:
app.get("/clinics", async (req: Request, res: Response) => {
  try {
    const { name, state, type, from, to, page, limit } =
      req.query as QueryParams & { page?: string; limit?: string };
    const clinics = await fetchClinics({
      name,
      state,
      type,
      from,
      to,
      page,
      limit,
    });

    res.json(clinics);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Starting the server and listening for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
