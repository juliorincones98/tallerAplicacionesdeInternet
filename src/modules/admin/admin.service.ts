import type { Booking } from "../bookings/bookings.types.js";
import { BookingsRepository } from "../bookings/bookings.repository.js";

export class AdminService {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  async listScheduledBookings(): Promise<Booking[]> {
    return this.bookingsRepository.listScheduled();
  }
}
