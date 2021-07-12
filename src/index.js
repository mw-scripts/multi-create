#!/usr/bin/env node

const { mwn } = require('mwn');
const { version } = require('../package.json');
const config = require('../config.json');
const { setTimeout: sleep } = require('timers/promises');

const bot = new mwn({
	apiUrl: config.api_url,

	username: config.auth.name,
	password: config.auth.pass,

	userAgent: `MultiCreate ${version} [https://github.com/mw-scripts/multi-create multi-create]`,

	defaultParams: {
		// Ensure bot is logged in on every API request
		assert: 'user'
	}
});

const doEdit = async (number) => {
	await bot.save(
		config.title.replace('$number', number),
		config.text.replace('$number', number),
		config.summary
	);
};

const main = async () => {
	await bot.login();

	let num = 40;
	for (num; num < config.number; num++) {
		await doEdit(num + 1);
		console.log(`Edited page ${num + 1}`)
		await sleep(config.timeout * 1000);
	}
};

main().then(() => console.log('Started.'));
