import * as z from "zod";

export const userValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "minimum 3 characters" })
    .max(15, { message: "maximum 15 characters" }),
  username: z
    .string()
    .min(3, { message: "minimum 3 characters" })
    .max(15, { message: "maximum 15 characters" }),
});
