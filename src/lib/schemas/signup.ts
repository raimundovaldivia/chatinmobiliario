import { z } from 'zod'

export const signUpSchema = z
    .object({
        name: z.string().trim().min(1, { message: 'Campo requerido' }),
        surname: z.string().trim().min(1, { message: 'Campo requerido' }),
        email: z.string().trim().email('Ingresa un email válido'),
        password: z
            .string()
            .min(8, 'La contraseña debe tener 8 caracteres como mínimo y al menos 2 letras')
            .refine(val => /[a-zA-Z].*[a-zA-Z]/.test(val), {
                message: 'La contraseña debe contener al menos 2 letras',
            }),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword'],
    })
