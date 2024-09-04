import { z } from 'zod'
import { createUserSchema } from '@/lib/schemas/create-user'

export type TCreateUserSchema = z.infer<typeof createUserSchema>
