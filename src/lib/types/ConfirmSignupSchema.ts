import { z } from 'zod'
import { confirmSignupSchema } from '@/lib/schemas/confirm-signup'

export type TConfirmSignupSchema = z.infer<typeof confirmSignupSchema>
