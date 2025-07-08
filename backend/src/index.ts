import express, { type Request, type Response } from "express";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT;

app.get("/", (_, res: Response) => {
  res.send("server sudah running");
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT:${PORT}`);
});
