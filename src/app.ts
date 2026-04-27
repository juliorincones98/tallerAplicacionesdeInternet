import cors from "cors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { apiRouter } from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../");

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(publicDir));

app.use("/api", apiRouter);

app.get("/", (_request, response) => {
  response.sendFile(path.join(publicDir, "index.html"));
});
