import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import cors from "cors";
import { evaluateFeature, evaluateFlag } from './utils'
// Create a new express application instance
const app = express();

const client = new PrismaClient();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
  {
    origin: "*",
  }
));
// Set the network port
const port = process.env.PORT || 3000;

app.use((err: any, req: Request, res: Response, next: any) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});
// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express + TypeScripts Server!" });
});

app.post("/users", async (req: Request, res: Response) => {
  const user = await client.user.create({
    data: req.body,
  });
  res.json({ message: "User created", user });
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const user = await client.user.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  const feature = await evaluateFeature({
    enableDebug: true,
    entityContext: {
      location: user?.location,
      name: user?.name,
    },
    entityID: user?.id.toString() ?? '',
    entityType: "user",
    flagID: 3,
    flagTagsOperator: "ALL",
  });
  res.json({ message: "User", user, feature });
});

app.get("/features", async (req: Request, res: Response) => {
  const feature = await evaluateFlag(2);
  res.json({ message: "Features", features: [feature] });
});

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});


