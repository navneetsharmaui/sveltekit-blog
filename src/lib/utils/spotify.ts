import querystring from 'querystring';

import { environment } from '$environment/environment';

const client_id = environment.spotifyConfig.SPOTIFY_CLIENT_ID;
const client_secret = environment.spotifyConfig.SPOTIFY_CLIENT_SECRET;
const refresh_token = environment.spotifyConfig.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = environment.spotifyConfig.SPOTIFY_NOW_PLAYING_ENDPOINT;
const TOP_TRACKS_ENDPOINT = environment.spotifyConfig.SPOTIFY_TOP_TRACKS_ENDPOINT;
const TOKEN_ENDPOINT = environment.spotifyConfig.SPOTIFY_TOKEN_ENDPOINT;

const getAccessToken = async () => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token,
		}),
	});

	return response.json();
};

export const getNowPlaying = async () => {
	const { access_token } = await getAccessToken();

	return fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};

export const getTopTracks = async () => {
	const { access_token } = await getAccessToken();

	return fetch(TOP_TRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};
