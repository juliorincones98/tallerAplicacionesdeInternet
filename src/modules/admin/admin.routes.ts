import { Router } from "express";

import { AdminController } from "./admin.controller.js";
import { requireAdminSession } from "./admin.middleware.js";

const adminController = new AdminController();

export const adminRouter = Router();

adminRouter.post("/login", adminController.login);
adminRouter.post("/logout", adminController.logout);
adminRouter.get("/session", adminController.getSession);
adminRouter.get("/bookings", requireAdminSession, adminController.listBookings);
