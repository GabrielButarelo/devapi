require('dotenv').config();
const GoogleSheets = require('./modules/GoogleSheets');
const HubSpot = require('./modules/HubSpot');
const logger = require('pino')();

async function start() {
	try {
		logger.info('Iniciando processo de integração');

		const sheetId = process.env.SHEET_ID;

		const spreadSheet = await GoogleSheets.getSpreadSheet(sheetId);
		const rows = await GoogleSheets.getSheetRows(spreadSheet);

		const hubSpotClient = HubSpot.createClient();
		await HubSpot.createContacts(hubSpotClient, rows);

		logger.info('Encerrando processo de integração');
	} catch (error) {
		logger.error(error);
	}
}

start();
