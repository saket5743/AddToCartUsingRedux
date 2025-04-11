import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./connect/db.js";
const app = express();

dotenv.config('')

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());

import userRouter from "./router/user.routes.js";
import taskRouter from "./router/task.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

const start = async () => {
  await connectDB();
  console.log("DB is connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
};

start();
