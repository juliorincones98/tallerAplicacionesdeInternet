import { Router } from "express";

import { bookingsRouter } from "../modules/bookings/bookings.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_request, response) => {
  response.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

apiRouter.use("/bookings", bookingsRouter);
