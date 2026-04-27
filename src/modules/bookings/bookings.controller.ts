import type { Request, Response } from "express";

import { BookingsService } from "./bookings.service.js";
import { createBookingSchema } from "./bookings.validation.js";

export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  create = async (request: Request, response: Response): Promise<void> => {
    const parsedBody = createBookingSchema.safeParse(request.body);

    if (!parsedBody.success) {
      response.status(400).json({
        message: "Los datos enviados no son validos.",
        errors: parsedBody.error.flatten().fieldErrors
      });
      return;
    }

    try {
      const booking = await this.bookingsService.createBooking(parsedBody.data);

      response.status(201).json({
        message: "Reserva registrada correctamente.",
        data: booking
      });
    } catch (error) {
      response.status(500).json({
        message: error instanceof Error ? error.message : "Ocurrio un error inesperado al registrar la reserva."
      });
    }
  };
}
