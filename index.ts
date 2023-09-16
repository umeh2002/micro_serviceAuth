import express, { Application } from "express";
import { mainApp } from "./app";

const app: Application = express();
const port: number = 2910;

mainApp(app)

const server = app.listen(port, () => {
  console.log("");
  console.log(`listening on ${port}`);
});

process.on("uncaughtException", (err: any) => {
  console.log("server is shutting down", err);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("server is shutting down", reason);
  server.close(() => {
    process.exit(1);
  });
});
