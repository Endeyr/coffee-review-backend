import { Request } from 'express'
import { IUser } from './model'

export type UserAuthRequest = Request & {
	user?: IUser | null
}
