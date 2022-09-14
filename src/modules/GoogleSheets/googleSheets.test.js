require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { getSpreadSheet, getSheetRows, validateEmail, verifyIfExistRowValues } = require('./index');

jest.setTimeout(10000);

describe('-> GoogleSheets', () => {
	it('Should returning a instance of GoogleSpreadsheet', async () => {
		const spreadSheet = await getSpreadSheet(process.env.SHEET_ID);

		expect(spreadSheet).not.toBeNull();
		expect(spreadSheet).not.toBeUndefined();
		expect(spreadSheet).toBeInstanceOf(GoogleSpreadsheet);
	});

	it('Should returning a array of contacts', async () => {
		const spreadSheet = await getSpreadSheet(process.env.SHEET_ID);
		const rows = await getSheetRows(spreadSheet);

		expect(spreadSheet).not.toBeNull();
		expect(spreadSheet).not.toBeUndefined();
		expect(spreadSheet).toBeInstanceOf(GoogleSpreadsheet);

		expect(rows).not.toBeNull();
		expect(rows).not.toBeUndefined();
		expect(rows).toBeInstanceOf(Array);
	});

	it('Should returning true to invalid email and false to valid email', async () => {
		const invalidEmail = 'teste@teste';
		const validEmail = 'teste@teste.com.br';

		const isValidOne = validateEmail(invalidEmail, 'www.teste.com.br');
		const isValidTwo = validateEmail(validEmail, 'www.teste.com.br');

		expect(isValidOne).not.toBeNull();
		expect(isValidOne).not.toBeUndefined();
		expect(isValidOne).toBe(false);

		expect(isValidTwo).not.toBeNull();
		expect(isValidTwo).not.toBeUndefined();
		expect(isValidTwo).toBe(true);
	});

	it('Should returning true in valid rows object and false in invalid rows object', async () => {
		const invalidRow = {
			'Nome da Empresa': 'empresa teste',
			'Nome Completo': 'teste teste',
			'Email': 'teste@teste.com.br',
			'Website': 'www.teste.com.br'
		};

		const validRow = {
			'Nome da Empresa': 'empresa teste',
			'Nome Completo': 'teste teste',
			'Email': 'teste@teste.com.br',
			'Telefone': '99999999',
			'Website': 'www.teste.com.br'
		};

		const isValidOne = verifyIfExistRowValues(invalidRow);
		const isValidTwo = verifyIfExistRowValues(validRow);

		expect(isValidOne).not.toBeNull();
		expect(isValidOne).not.toBeUndefined();
		expect(isValidOne).toBe(false);

		expect(isValidTwo).not.toBeNull();
		expect(isValidTwo).not.toBeUndefined();
		expect(isValidTwo).toBe(true);
	});
});
