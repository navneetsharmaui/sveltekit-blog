import type { INowPlayingTrack } from '$models/interfaces/inow-playing-track.interface';
import { getNowPlaying } from '$utils/spotify';

/** @type {import('@sveltejs/kit').Page} */
export async function get(): Promise<{
	status: number;
	body: INowPlayingTrack;
	headers?: {
		[key: string]: string;
	};
}> {
	const response = await getNowPlaying();

	if (response.status === 204 || response.status > 400) {
		return {
			status: 200,
			body: { isPlaying: false },
		};
	}

	const song = await response.json();

	if (song.item === null) {
		return {
			status: 200,
			body: { isPlaying: false },
		};
	}

	const isPlaying = song.is_playing;
	const title = song.item.name;
	const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
	const album = song.item.album.name;
	const albumImageUrl = song.item.album.images[0].url;
	const songUrl = song.item.external_urls.spotify;

	return {
		status: 200,
		headers: {
			'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
		},
		body: {
			album,
			albumImageUrl,
			artist,
			isPlaying,
			songUrl,
			title,
		},
	};
}
