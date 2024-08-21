import express from 'express'
import {
	deleteUser,
	getUserInfo,
	loginUser,
	registerUser,
	updateUser,
} from '../controllers/userController'
import { protect } from '../middleware/authMiddleware'
import { validateData } from '../middleware/validationMiddleware'
import { userRegistrationSchema } from '../schemas/userSchema'
import { userLoginSchema } from './../schemas/userSchema'

const userRouter = express.Router()

// router.method(url, middleware, controller)
userRouter.post('/register', validateData(userRegistrationSchema), registerUser)
userRouter.post('/login', validateData(userLoginSchema), loginUser)
userRouter.put('/update/:id', protect, updateUser)
userRouter.delete('/delete/:id', protect, deleteUser)
userRouter.get('/:id', protect, getUserInfo)

export default userRouter
