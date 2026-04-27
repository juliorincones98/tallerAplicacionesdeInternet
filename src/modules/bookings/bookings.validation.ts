import { z } from "zod";

export const createBookingSchema = z.object({
  ownerName: z.string().trim().min(3, "El nombre del tutor debe tener al menos 3 caracteres."),
  petName: z.string().trim().min(2, "El nombre de la mascota debe tener al menos 2 caracteres."),
  petType: z.string().trim().min(1, "Debes seleccionar un tipo de mascota."),
  service: z.string().trim().min(1, "Debes seleccionar un servicio."),
  appointmentDate: z.iso.date("Debes ingresar una fecha valida."),
  appointmentTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Debes ingresar una hora valida."),
  phone: z.string().trim().min(8, "Debes ingresar un telefono valido."),
  notes: z.string().trim().max(500, "Las observaciones no pueden superar los 500 caracteres.").optional().or(z.literal(""))
});

export type CreateBookingDto = z.infer<typeof createBookingSchema>;
