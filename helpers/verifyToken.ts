import jwt from 'jsonwebtoken'

const verifyToken = (token: string): string | jwt.JwtPayload | null => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
		return decoded
	} catch (error) {
		console.error(error)
		return null
	}
}

export default verifyToken
