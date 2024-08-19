import { uuidv7 as v7 } from 'uuidv7'
import { writeSheet } from '../google/main'
import { formattedDate } from '../helpers/date'
import { IUser } from '../types/model'

export default class UserModel implements IUser {
	uuid: string
	username: string
	email: string
	password: string
	createdAt: Date
	constructor(username: string, email: string, password: string) {
		this.uuid = v7()
		this.username = username
		this.email = email
		this.password = password
		this.createdAt = new Date()
	}
	save(): void {
		const userData = [
			[
				this.uuid,
				this.username,
				this.email,
				this.password,
				formattedDate(this.createdAt),
			],
		]
		writeSheet(userData)
	}
}
