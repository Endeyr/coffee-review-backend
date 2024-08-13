import dotenv from 'dotenv'
dotenv.config()
export const PORT = process.env.PORT as string
export const CLIENT_HOST = process.env.CLIENT_HOST as string
