import { SERVICE_ACCOUNT_KEY_FILE } from './../utils/config'
import { google, type sheets_v4 } from 'googleapis'

export async function _getGoogleSheetClient() {
	const auth = new google.auth.GoogleAuth({
		keyFile: SERVICE_ACCOUNT_KEY_FILE,
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	})
	return google.sheets({
		version: 'v4',
		auth,
	})
}

interface IReadGoogleSheet {
	googleSheetClient: sheets_v4.Sheets
	sheetId: string
	tabName: string
	range: string
}

interface IWriteGoogleSheet extends IReadGoogleSheet {
	data: string[][]
}

export async function _readGoogleSheet(
	googleSheetClient: IReadGoogleSheet['googleSheetClient'],
	sheetId: IReadGoogleSheet['sheetId'],
	tabName: IReadGoogleSheet['tabName'],
	range: IReadGoogleSheet['range']
): Promise<string[][] | undefined | null> {
	try {
		const res = await googleSheetClient.spreadsheets.values.get({
			spreadsheetId: sheetId,
			range: `${tabName}!${range}`,
		})

		return res.data.values
	} catch (error) {
		console.error('Error reading Google Sheet:', error)
		return null
	}
}

export async function _writeGoogleSheet(
	googleSheetClient: IWriteGoogleSheet['googleSheetClient'],
	sheetId: IWriteGoogleSheet['sheetId'],
	tabName: IWriteGoogleSheet['tabName'],
	range: IWriteGoogleSheet['range'],
	data: IWriteGoogleSheet['data']
): Promise<void> {
	try {
		await googleSheetClient.spreadsheets.values.append({
			spreadsheetId: sheetId,
			range: `${tabName}!${range}`,
			valueInputOption: 'USER_ENTERED',
			insertDataOption: 'INSERT_ROWS',
			requestBody: {
				majorDimension: 'ROWS',
				values: data,
			},
		})
	} catch (error) {
		console.error('Error writing to Google Sheet:', error)
	}
}
