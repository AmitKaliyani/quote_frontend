import { z } from "zod";

export const createQuotesSchema = z.object({
  text: z
    .string()
    .min(50, "minimum 20 character required")
    .max(250, "Maximum 250 character allowed "),
  tags: z
    .array(z.string())
    .min(1, "Please select at least one")
    .max(3, "Maximum 3 tags allowed"),
  author: z
    .string()
    .trim()
    .min(2, "Author name must be at least 2 character")
    .max(50, "Author name is too long"),
});
