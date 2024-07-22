import { z } from 'zod'
export const resetPasswordSchema = z.object({
    email: z.string().trim().email('Ingresa un email válido'),
    code: z.string().trim().min(6, '6 caracteres como mínimo'),
    newPassword: z
        .string()
        .min(8, 'La contraseña debe tener 8 caracteres como mínimo y al menos 2 letras')
        .refine(val => /[a-zA-Z].*[a-zA-Z]/.test(val), {
            message: 'La contraseña debe contener al menos 2 letras',
        }),
    confirmPassword: z.string(),
})
