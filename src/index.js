require('dotenv').config();
const { getSpreadSheet, getSheetRows } = require('./modules/GoogleSheets');
const { createHubSpotClient, createContacts } = require('./modules/HubSpot');
const logger = require('pino')();

async function start() {
	try {
		logger.info('Iniciando processo de integração');

		const sheetId = process.env.SHEET_ID;

		const spreadSheet = await getSpreadSheet(sheetId);
		const rows = await getSheetRows(spreadSheet);

		const hubSpotClient = createHubSpotClient();
		await createContacts(hubSpotClient, rows);

		logger.info('Encerrando processo de integração');
	} catch (error) {
		logger.error(error);
	}
}

start();
