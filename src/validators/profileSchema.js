import { z } from "zod";

export const profileSchema = z.object({
  name: z.string(),
  bio: z.string().max(70, "Maximum 70 character alllowed"),
});
