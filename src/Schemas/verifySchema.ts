import { z } from "zod";

export const VerifySchema = z.object({
    code: z.string().length(6,{message: "PLease enter a 6 digit code"})
})