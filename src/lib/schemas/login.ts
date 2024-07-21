import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().trim().email({ message: 'Ingresa un email válido' }),
    password: z.string().min(8, 'La contraseña debe tener 8 caracteres como mínimo y al menos 2 letras'),
})
