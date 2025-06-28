import { z } from "zod"

export const createProductSchema = z.object({
    name: z.string()
})
