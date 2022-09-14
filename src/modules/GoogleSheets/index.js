const { GoogleSpreadsheet } = require('google-spreadsheet');
const logger = require('pino')();

const sheetColumns = {
	COMPANY_NAME: 'Nome da Empresa',
	FULLNAME: 'Nome Completo',
	EMAIL: 'Email',
	PHONE_NUMBER: 'Telefone',
	WEBSITE: 'Website'
};

async function getSpreadSheet(sheetId) {
	try {
		const spreadSheet = new GoogleSpreadsheet(sheetId);

		await spreadSheet.useServiceAccountAuth({
			client_email: process.env.SHEET_API_CLIENT_EMAIL,
			private_key: process.env.SHEET_API_PRIVATE_KEY.replace(/\\n/g, '\n')
		});
		await spreadSheet.loadInfo();

		return spreadSheet;
	} catch (error) {
		logger.error(error);
	}
};

async function getSheetRows(spreadSheet) {
	try {
		const sheet = spreadSheet.sheetsByIndex[0];
		const rows = await sheet.getRows();

		const formattedRows = rows.map(row => {
			if(!verifyIfExistRowValues(row)) return;

			if(!validateEmail(row[sheetColumns.EMAIL], row[sheetColumns.WEBSITE])) return;

			const nameArray = row[sheetColumns.FULLNAME].split(' ');
			const firstname = nameArray[0];
			const lastname = nameArray[nameArray.length - 1];

			return {
				company: row[sheetColumns.COMPANY_NAME],
				email: row[sheetColumns.EMAIL],
				phone: row[sheetColumns.PHONE_NUMBER],
				website: row[sheetColumns.WEBSITE],
				firstname,
				lastname
			};
		});

		return formattedRows;
	} catch (error) {
		logger.error(error);
	}
}

function verifyIfExistRowValues(row) {
	const values = Object.values(sheetColumns);

	let exists = true;

	values.forEach(value => {
		if(!row[value]) exists = false;
	});

	return exists;
}

function validateEmail(email, website) {
	var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

	if(!reg.test(email)) return false;

	const websiteDomain = website.split('www.')[1].split('/')[0];
	const emailDomain = email.split('@')[1];

	if(websiteDomain !== emailDomain) return false;

	return true;
}

module.exports = {
	getSpreadSheet,
	getSheetRows
};
