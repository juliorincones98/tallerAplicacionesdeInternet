import { supabase } from "../../lib/supabase.js";
import type { Booking, CreateBookingInput } from "./bookings.types.js";

const TABLE_NAME = "bookings";

type BookingRow = {
  id: string;
  owner_name: string;
  pet_name: string;
  pet_type: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  phone: string;
  notes: string | null;
  status: "pendiente" | "confirmada" | "cancelada";
  created_at: string;
};

const toDomain = (row: BookingRow): Booking => ({
  id: row.id,
  ownerName: row.owner_name,
  petName: row.pet_name,
  petType: row.pet_type,
  service: row.service,
  appointmentDate: row.appointment_date,
  appointmentTime: row.appointment_time,
  phone: row.phone,
  notes: row.notes ?? "",
  status: row.status,
  createdAt: row.created_at
});

export class BookingsRepository {
  async create(data: CreateBookingInput): Promise<Booking> {
    const { data: createdBooking, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        owner_name: data.ownerName,
        pet_name: data.petName,
        pet_type: data.petType,
        service: data.service,
        appointment_date: data.appointmentDate,
        appointment_time: data.appointmentTime,
        phone: data.phone,
        notes: data.notes || null,
        status: "pendiente"
      })
      .select()
      .single<BookingRow>();

    if (error) {
      throw new Error(`No fue posible guardar la reserva: ${error.message}`);
    }

    return toDomain(createdBooking);
  }
}
