import dotenv from 'dotenv'
dotenv.config()
let isSetup = false

beforeAll(async () => {
	try {
		process.env.NODE_ENV = 'test'
		isSetup = true
	} catch (error) {
		console.error('Error in beforeAll setup: ', error)
		process.exit(1)
	}
}, 20000)

afterAll(async () => {
	if (!isSetup) {
		console.error('Error in setup: ', isSetup)
		process.exit(1)
	}
})
