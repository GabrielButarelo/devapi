const hubspot = require('@hubspot/api-client');
const logger = require('pino')();

function createHubSpotClient() {
	const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_TOKEN });
	return hubspotClient;
}

async function createContacts(hubspotClient, rows) {
	for(const row of rows){
		if(row) {
			try {
				await hubspotClient.crm.contacts.basicApi.create({properties: row});
				logger.info(`Contato '${row.firstname} ${row.lastname}' integrado com sucesso.`);
			} catch (error) {
				if(error.body.category === 'CONFLICT') {
					logger.error(`O contato '${row.firstname} ${row.lastname}' já está integrado.`);
					return;
				}
				logger.error(error);
			}
		}
	}
}

module.exports = {
	createHubSpotClient,
	createContacts
};
