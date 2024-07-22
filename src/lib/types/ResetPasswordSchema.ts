import { z } from 'zod'
import { resetPasswordSchema } from '../schemas/reset-password'

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>
