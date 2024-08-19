import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { getUser } from '../google/main'
import { generateToken } from '../helpers/generateToken'
import UserModel from '../model/user'

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
		const existingUser = await getUser(email)
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
export const loginUser = (req: Request, res: Response) => {
	const { email, password } = req.body
	return res.status(200).json({ email, password })
	// search db for existing user
	// return if not found
	// return if incorrect email or password
	// generate token
	// return status, success, user data including token
}

// @desc Delete user account
// @route DELETE /user/delete/:id
// @access Private
export const deleteUser = (req: Request, res: Response) => {
	return res.status(200).json({ id: req.params.id })
	// find existing user in db by id
	// return if not found
	// delete user from db
	// return success and message
}

// @desc Update user account
// @route PUT /user/update/:id
// @access Private
export const updateUser = (req: Request, res: Response) => {
	return res.status(200).json({ id: req.params.id })
	// find existing user in db by id
	// return if not found
	// update user information in db
	// return success, message, and user data
}

// @desc Get user account info
// @route GET /user/:id
// @access Private
export const getUserById = (req: Request, res: Response) => {
	return res.status(200).json({ id: req.params.id })
	// find existing user in db by id
	// return if not found
	// return success and user data
}
