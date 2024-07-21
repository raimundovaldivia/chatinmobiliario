import { z } from 'zod'
import { signUpSchema } from '../schemas/signup'

export type TSignUpSchema = z.infer<typeof signUpSchema>
