import "dotenv/config";
import express from "express";
import morgan from "morgan";
import userRouter from "./routes/users.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", userRouter);

app.listen(port, () => console.log(`Server running at ${port}`));
