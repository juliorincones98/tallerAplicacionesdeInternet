import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { allowedOrigins, env } from "./config/env.js";
import { apiRouter } from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../");

export const app = express();

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origen no permitido por la politica CORS."));
  }
}));
app.use(express.json({ limit: "10kb" }));
app.use(express.static(publicDir));

app.use("/api", rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Demasiadas solicitudes desde este origen. Intenta nuevamente en unos minutos."
  }
}));

app.use("/api", apiRouter);

app.get("/", (_request, response) => {
  response.sendFile(path.join(publicDir, "index.html"));
});
