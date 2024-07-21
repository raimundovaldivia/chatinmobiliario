import { z } from 'zod'
export const confirmSignupSchema = z.object({
    email: z.string().trim().email('Ingresa un email válido'),
    code: z.string().trim().min(6, '6 caracteres como mínimo'),
})
