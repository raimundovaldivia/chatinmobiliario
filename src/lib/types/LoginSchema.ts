import { loginSchema } from '@/lib/schemas/login'
import { z } from 'zod'

export type TLoginSchema = z.infer<typeof loginSchema>
