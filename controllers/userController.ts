import bcrypt from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'
import {
	deleteUserByInfo,
	getUserByEmail,
	getUserById,
	writeSheet,
} from '../google/main'
import { generateToken } from '../helpers/generateToken'
import UserModel from '../model/user'
import { UserAuthRequest } from './../types/middleware'

// @desc Register new user
// @route POST /user/register
// @access Public
export const registerUser = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body
		// Validate input
		if (!username || !email || !password) {
			return res.status(400).json({ message: 'All fields are required' })
		}
		// search db for existing user
		const existingUser = await getUserByEmail(email)
		// if existing user return error
		if (existingUser) {
			return res
				.status(400)
				.json({ message: 'User already registered, please sign in' })
		}
		// salt + hash password
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)
		// create new user with model
		const newUser = new UserModel(username, email, hashedPassword)
		// save user to db
		newUser.save()
		// generate token based on user
		const token = generateToken(newUser)
		// return status, success, and user data including token
		return res.status(201).json({
			success: true,
			message: 'User registered successfully',
			data: {
				userId: newUser.uuid,
				username: newUser.username,
				email: newUser.email,
				token: token,
			},
		})
	} catch (error) {
		console.error('Error registering user: ', error)
		return res
			.status(500)
			.json({ message: 'Server error, please try again later' })
	}
}

// @desc Login new user
// @route POST /user/login
// @access Public
export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		// search db for existing user
		const existingUser = await getUserByEmail(email)
		// return if not found
		if (!existingUser) {
			const error = new Error('Incorrect email or password')
			return res.status(401).send(error.message)
		}
		const isPasswordValid = await bcrypt.compare(
			password,
			existingUser.password
		)
		// return if incorrect email or password
		if (!isPasswordValid) {
			const error = new Error('Incorrect email or password')
			return res.status(401).send(error.message)
		}
		// generate token
		const token = generateToken(existingUser)
		// return status, success, user data including token
		return res.status(200).json({
			success: true,
			message: 'User logged in successfully',
			data: {
				userId: existingUser.uuid,
				email: existingUser.email,
				username: existingUser.username,
				token: token,
			},
		})
	} catch (err) {
		const error = err as Error
		return res.status(401).send(error.message)
	}
}

// @desc Delete user account
// @route DELETE /user/delete/:id
// @access Private
export const deleteUser = async (req: Request, res: Response) => {
	try {
		// find existing user in db by id
		if (!req.params.id) {
			return res.status(400).json({ message: 'No id provided' })
		}
		const userToDelete = await getUserById(req.params.id)
		// return if not found
		if (!userToDelete) {
			return res.status(400).json({ message: 'User not found' })
		}
		// delete user from db
		await deleteUserByInfo(userToDelete)
		// return success and message
		return res
			.status(200)
			.json({ id: req.params.id, message: 'User deleted successfully' })
	} catch (error) {
		console.error('Error deleting user:', error)
		return res.status(500).json({ message: 'Server error' })
	}
}

// @desc Update user account
// @route PUT /user/update/:id
// @access Private
export const updateUser = async (req: UserAuthRequest, res: Response) => {
	try {
		// return if id not provided on url
		if (!req.params.id) {
			return res.status(400).json({ message: 'No id provided' })
		}
		// find existing user in db by id
		const userToUpdate = await getUserById(req.params.id)
		// return if not found
		if (!userToUpdate) {
			return res.status(400).json({ message: 'User not found in db' })
		}
		if (!req.user) {
			return res.status(400).json({ message: 'User not found in req' })
		}
		// return if no changes included in body
		if (!req.body || Object.keys(req.body).length === 0) {
			return res.status(400).json({ message: 'Please add update fields' })
		}
		const updatedUser: string[][] = [
			[
				userToUpdate.uuid,
				req.body.username || userToUpdate.username,
				req.body.email || userToUpdate.email,
				req.body.password || userToUpdate.password,
				userToUpdate.createdAt
					? userToUpdate.createdAt.toISOString()
					: new Date().toISOString(),
			],
		]

		// update user information in db
		await writeSheet(updatedUser)

		// return success, message, and user data
		return res
			.status(200)
			.json({ updatedUser, message: 'User updated successfully' })
	} catch (error) {
		console.error('Error updating user:', error)
		return res.status(500).json({ message: 'Server error' })
	}
}

// @desc Get user account info
// @route GET /user/:id
// @access Private
export const getUserInfo = (
	req: UserAuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		// return if not found
		if (!req.user) {
			return res.status(404).json({ message: 'User not found' })
		}
		// find existing user info from req
		const { username, email } = req.user
		// return success and user data
		return res.status(200).json({ userId: username, email })
	} catch (error) {
		return next(error)
	}
}
