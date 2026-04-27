import type { Booking } from "./bookings.types.js";
import type { CreateBookingDto } from "./bookings.validation.js";
import { BookingsRepository } from "./bookings.repository.js";

export class BookingsService {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  async createBooking(input: CreateBookingDto): Promise<Booking> {
    return this.bookingsRepository.create({
      ...input,
      notes: input.notes?.trim() || ""
    });
  }
}
