import jwt from 'jsonwebtoken'
import { IUser } from '../types/model'

export const generateToken = (user: IUser) => {
	const token = jwt.sign(
		{
			userId: user.uuid,
		},
		process.env.JWT_SECRET as string,
		{ expiresIn: '30d' }
	)
	return token
}
