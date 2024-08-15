import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const protect = (req: Request, res: Response, next: NextFunction) => {
	let token: string | undefined
	// check if headers includes bearer token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
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
		const userReq = req
		// get user from db by id
		console.log(userReq, decoded.userId)
		// if (!userReq.user) {
		// 	return res.status(401).json({ message: 'Not authorized, user not found' })
		// }
		next()
	} catch (error) {
		console.log(error)
		res.status(401).json({ message: 'Not authorized' })
	}
}
