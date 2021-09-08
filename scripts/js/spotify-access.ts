/* eslint-disable no-console */
import querystring from 'querystring';

import fetch from 'node-fetch';

const getAccessToken = async () => {
	const refresh_token =
		'AQDS75g4U-Xd9K3RYbgPktSjGCm5_GbnLitKAvRkamclTgh8PB-Lw3KY7X85ufBxy8kukTAQHiUkh6slIqdwg5FODWO6y9YYzNohluM2Va0rhgsHMtAmR7cr-0O9BfD87Hw';
	return await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ZjliNzVjZmM2Yjg1NDA2NWFmNjAzZDhkMDhkNDg2NDg6MGJhYTMxNWIzMzFkNGU3ODk5NTY1NmQ5ZjQ1MDQ4ZDk=`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token,
		}),
	}).then((res) => res.json());
};

getAccessToken().then((value) => console.log('Token: ', value));
