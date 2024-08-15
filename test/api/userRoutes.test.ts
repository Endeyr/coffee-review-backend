import supertest from 'supertest'
import app from '../../api/server'

describe('User Routes /user', () => {
	describe('registerUser /register', () => {
		it('should return if user already registered', async () => {
			const res = await supertest(app).post('/user/register').send({
				username: 'mock',
				email: 'mock@example.com',
				password: 'password1233',
				confirmPassword: 'password1233',
			})
			expect(res.status).toBe(400)
		})
	})
	describe('loginUser /login', () => {
		it('should catch error finding user from db', async () => {
			const res = await supertest(app).post('/user/login').send({
				email: 'mock@example.com',
				password: 'password1233',
			})
			expect(res.status).toBe(400)
			expect(res.error).toHaveProperty('text')
		})
	})
	describe('updateUser /update/:id', () => {
		it('should catch error updating user', async () => {
			// TODO create a mockUser in setupFile from user model
			const id = 'mockId'
			// TODO create token from mockUser
			const token = 'mockToken'
			const res = await supertest(app)
				.put(`/user/update/${id}`)
				.set('Authorization', `Bearer ${token}`)
				.send({})
			expect(res.status).toBe(404)
		})
	})
	describe('deleteUser /delete/:id', () => {
		it('should catch error deleting user', async () => {
			const id = '37C0BC868213E6D55BB47FCF'
			// TODO create token from mockUser
			const token = 'mockToken'
			const res = await supertest(app)
				.delete(`/user/delete/${id}`)
				.set('Authorization', `Bearer ${token}`)
			expect(res.status).toBe(400)
		})
	})
	describe('getUser /:id', () => {
		it('should catch error getting user data without id', async () => {
			const token = 'mockToken'
			const res = await supertest(app)
				.get('/user/')
				.set('Authorization', `Bearer ${token}`)
			expect(res.status).toBe(404)
		})
	})
})
