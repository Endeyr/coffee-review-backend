import { z } from 'zod'

export const userLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export const userRegistrationSchema = z
	.object({
		username: z.string().min(1),
		email: z.string().email().min(1),
		password: z.string().min(8),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export type UserLoginType = z.infer<typeof userLoginSchema>
export type UserRegistrationType = z.infer<typeof userRegistrationSchema>
