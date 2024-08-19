import { Request, Response } from 'express'

// @desc Register new user
// @route POST /user/register
// @access Public
export const registerUser = (req: Request, res: Response) => {
	const { username, email, password } = req.body
	return res.status(200).json({ username, email, password })
	// search db for existing user
	// if existing user return error
	// salt + hash password
	// create new user with model
	// save user to db
	// generate token based on user
	// return status, success, and user data including token
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
export const getUser = (req: Request, res: Response) => {
	return res.status(200).json({ id: req.params.id })
	// find existing user in db by id
	// return if not found
	// return success and user data
}
