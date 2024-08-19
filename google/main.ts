import { throwError } from '../helpers/error'
import {
	_getGoogleSheetClient,
	_readGoogleSheet,
	_writeGoogleSheet,
} from '../helpers/google'
import { IUser } from '../types/model'
import { RANGE, SHEET_ID, TAB_NAME } from './../utils/config'

export async function getSheet(): Promise<string[][] | null | undefined> {
	try {
		const googleSheetClient = await _getGoogleSheetClient()

		const data = await _readGoogleSheet(
			googleSheetClient,
			SHEET_ID,
			TAB_NAME,
			RANGE
		)
		return data
	} catch (error) {
		console.error('Error in Google Sheets operation getSheet: ', error)
	}
}

export async function writeSheet(userData: string[][]): Promise<boolean> {
	try {
		const googleSheetClient = await _getGoogleSheetClient()
		const data = await _readGoogleSheet(
			googleSheetClient,
			SHEET_ID,
			TAB_NAME,
			RANGE
		)

		if (data) {
			// Runtime check data & userData format
			if (!Array.isArray(data) || !Array.isArray(userData)) {
				throw new Error('Invalid data format.')
			}
			// Flatten data and userData to compare
			const dataStrings = data.map((row) => row.join('|'))
			const userDataStrings = userData.map((row) => row.join('|'))
			// Check if userData is already in data
			const isPresent = userDataStrings.some((userStr) =>
				dataStrings.includes(userStr)
			)
			if (isPresent) {
				throw new Error('User already in database')
			}
		}

		await _writeGoogleSheet(
			googleSheetClient,
			SHEET_ID,
			TAB_NAME,
			RANGE,
			userData
		)

		return true
	} catch (error) {
		console.error('Error in Google Sheets operation write Sheet: ', error)
		return false
	}
}

export async function getUser(email: string): Promise<IUser | null> {
	try {
		const googleSheetClient = await _getGoogleSheetClient()
		const data = await _readGoogleSheet(
			googleSheetClient,
			SHEET_ID,
			TAB_NAME,
			RANGE
		)

		if (!data || data === null)
			throw new Error('Unable to retrieve data from sheets')

		const rows: string[][] = data ?? []

		if (rows.length) {
			for (const row of rows) {
				if (row.length < 5) {
					throw new Error('Incomplete user data found')
				}
				if (row[2] === email) {
					return {
						uuid: row[0] ?? throwError('uuid'),
						username: row[1] ?? throwError('username'),
						email: row[2] ?? throwError('email'),
						password: row[3] ?? throwError('password'),
						createdAt: row[4] ? new Date(row[4]) : throwError('createdAt'),
					}
				}
			}
		}
		return null // if user isn't found
	} catch (error) {
		console.error('Error in Google Sheets operation get User: ', error)
		return null
	}
}
