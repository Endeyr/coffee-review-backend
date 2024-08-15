import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError, ZodIssue, ZodSchema } from 'zod'

export const validateData = (schema: ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body)
			next()
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessage = error.errors.map((issue: ZodIssue) => ({
					message: `${issue.path.join('.')} is ${issue.message}`,
				}))
				res.status(StatusCodes.BAD_REQUEST).json({ errors: errorMessage })
			} else {
				res
					.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({ error: 'Internal Server Error' })
			}
		}
	}
}
