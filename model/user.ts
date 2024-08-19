import { writeSheet } from '../google/main'

export interface IUser {
	uuid: string
	username: string
	email: string
	password: string
	createdAt?: Date
}

// TODO add model for google sheets backend
export default class UserModel {
	uuid: string
	username: string
	email: string
	password: string
	createdAt: string
	constructor(
		username: string,
		email: string,
		password: string,
		createdAt?: Date | number
	) {
		// TODO generate uuid
		this.uuid = ''
		this.username = username
		this.email = email
		this.password = password
		this.createdAt = createdAt?.toString() || Date.now().toString() // TODO update this to date type
	}
	save(): void {
		// save to google sheets db
		const userData = [
			[this.uuid, this.username, this.email, this.password, this.createdAt],
		]
		writeSheet(userData)
	}
}
