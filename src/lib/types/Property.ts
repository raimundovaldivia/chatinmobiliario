import { Property } from '@/lib/schemas/property'
import { z } from 'zod'

export type Property = z.infer<typeof Property>
