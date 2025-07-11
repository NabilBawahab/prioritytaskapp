import express, { type Request, type Response } from "express";
import "dotenv/config";
import { authenticationRoute } from "./routes/register-login";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { userRoute } from "./routes/user-create-task";

const app = express();

const PORT = process.env.PORT;

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

// app.get("/", (_, res: Response) => {
//   res.send("server sudah running");
// });

app.use("/", authenticationRoute);

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server Running on PORT:${PORT}`);
});
