import dotenv from 'dotenv'
dotenv.config()
export const PORT = process.env.PORT as string
export const CLIENT_HOST = process.env.CLIENT_HOST as string
export const SERVICE_ACCOUNT_KEY_FILE = process.env
	.SERVICE_ACCOUNT_KEY_FILE as string
export const SHEET_ID = process.env.SHEET_ID as string
export const TAB_NAME = process.env.TAB_NAME as string
export const RANGE = process.env.RANGE as string
