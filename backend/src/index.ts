import express, { type Request, type Response } from "express";
import "dotenv/config";
import { authenticationRoute } from "./routes/register-login";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (_, res: Response) => {
  res.send("server sudah running");
});

app.use("/", authenticationRoute);

app.listen(PORT, () => {
  console.log(`Server Running on PORT:${PORT}`);
});
