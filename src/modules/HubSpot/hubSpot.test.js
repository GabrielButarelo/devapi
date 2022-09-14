require('dotenv').config();
const { Client } = require('@hubspot/api-client');
const { createHubSpotClient, createContacts } = require('./index');

jest.setTimeout(10000);

describe('-> HubSpot', () => {
	it('Should returning a instance of HubSpot Client', async () => {
		const spreadSheet = createHubSpotClient();

		expect(spreadSheet).not.toBeNull();
		expect(spreadSheet).not.toBeUndefined();
		expect(spreadSheet).toBeInstanceOf(Client);
	});
});
