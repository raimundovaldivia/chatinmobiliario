import { z } from 'zod'

export const createUserSchema = z
    .object({
        name: z.string().trim().min(1, { message: 'Campo requerido' }),
        surname: z.string().trim().min(1, { message: 'Campo requerido' }),
        email: z.string().trim().email('Ingresa un email válido'),
        password: z
            .string()
            .min(8, '8 caracteres y 2 letras como mínimo')
            .refine(val => /[a-zA-Z].*[a-zA-Z]/.test(val), {
                message: '2 letras como mínimo',
            }),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword'],
    })
