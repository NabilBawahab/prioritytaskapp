import express, { type Request, type Response } from "express";
import "dotenv/config";
import { authenticationRoute } from "./routes/register-login";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { userRoute } from "./routes/user-create-task";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT ?? 8080;

const FRONTEND_URL = process.env.FE_URL;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cookieParser());

// app.get("/", (_, res: Response) => {
//   res.send("server sudah running");
// });

app.use("/", authenticationRoute);

app.use("/user", userRoute);

app.get("/ping", (_, res: Response) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT:${PORT}`);
});
