import { z } from 'zod';

export const joinWaitlistFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .transform((val) => val.toLowerCase()),
});
