import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getUser } from '../google/main'
import { UserAuthRequest } from './../types/middleware'

export const protect = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let token: string | undefined
	// check if headers includes bearer token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer ')
	) {
		token = req.headers.authorization.split(' ')[1]
	}
	// reject req if missing token
	if (!token) {
		return res.status(401).json({ message: 'Not authorized, missing token' })
	}
	// decode token
	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as jwt.JwtPayload
		const userReq = req as UserAuthRequest
		userReq.user = await getUser(decoded.id)
		if (!userReq.user) {
			return res.status(401).json({ message: 'Not authorized, user not found' })
		}
		next()
	} catch (error) {
		console.error(error)
		res.status(401).json({ message: 'Not authorized' })
	}
}
