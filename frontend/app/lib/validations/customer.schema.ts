import { z } from "zod";

const RESERVED_KEYS = ["first_name", "last_name", "email", "phone", "created_at", "updated_at"];

export const customerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  custom_fields: z
    .array(
      z.object({
        key: z
          .string()
          .min(1, "Key is required")
          .refine(
            (key) => !RESERVED_KEYS.includes(key),
            "This key is reserved"
          ),
        value: z.string().min(1, "Value is required"),
      })
    )
    .refine(
      (fields) => {
        const keys = fields.map((f) => f.key);
        return new Set(keys).size === keys.length;
      },
      { message: "Keys must be unique" }
    ),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;