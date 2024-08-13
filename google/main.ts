import {
	_getGoogleSheetClient,
	_readGoogleSheet,
	_writeGoogleSheet,
} from '../helpers/google'
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
		console.log('Data read from Google Sheet:', data)

		await _writeGoogleSheet(
			googleSheetClient,
			SHEET_ID,
			TAB_NAME,
			RANGE,
			userData
		)

		console.log('Data successfully written to Google Sheet')
		return true
	} catch (error) {
		console.error('Error in Google Sheets operation write Sheet: ', error)
		return false
	}
}
