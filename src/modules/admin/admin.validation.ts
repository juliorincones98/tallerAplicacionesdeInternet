import { z } from "zod";

export const adminLoginSchema = z.object({
  username: z.string().trim().min(1, "Debes ingresar un usuario."),
  password: z.string().min(1, "Debes ingresar una contrasena.")
});

export type AdminLoginDto = z.infer<typeof adminLoginSchema>;
