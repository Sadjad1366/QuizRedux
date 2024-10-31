import {z} from 'zod'

export const movieSchema = z.object({
      id:z.number(),
      name:z.string().min(5,'Name must be at least 5 characters'),
      director:z.string().min(5,'Name must be at least 5 characters'),
      rate: z.number().min(0, 'Rate cannot be negative').max(20, 'Rate cannot be more than 20'),
})
