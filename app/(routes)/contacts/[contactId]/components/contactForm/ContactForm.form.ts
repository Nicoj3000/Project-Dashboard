import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),

});