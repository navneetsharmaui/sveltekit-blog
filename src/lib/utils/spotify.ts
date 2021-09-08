import querystring from 'querystring';

import { environment } from '$environment/environment';

const refresh_token = `${environment.spotifyConfig.SPOTIFY_REFRESH_TOKEN}`.trim().slice();

const basic = `${environment.spotifyConfig.SPOTIFY_CLIENT_BASIC}`.trim().slice();
const NOW_PLAYING_ENDPOINT = `${environment.spotifyConfig.SPOTIFY_NOW_PLAYING_ENDPOINT}`.trim().slice();
const TOP_TRACKS_ENDPOINT = `${environment.spotifyConfig.SPOTIFY_TOP_TRACKS_ENDPOINT}`.trim().slice();
const TOKEN_ENDPOINT = `${environment.spotifyConfig.SPOTIFY_TOKEN_ENDPOINT}`.trim().slice();

const getAccessToken = async () => {
	return await fetch(`${TOKEN_ENDPOINT}`, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token,
		}),
	}).then((res) => res.json());
};

export const getNowPlaying = async (): Promise<Response> => {
	const { access_token } = await getAccessToken();

	return fetch(`${NOW_PLAYING_ENDPOINT}`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};

export const getTopTracks = async (): Promise<Response> => {
	const { access_token } = await getAccessToken();

	return fetch(`${TOP_TRACKS_ENDPOINT}`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};
