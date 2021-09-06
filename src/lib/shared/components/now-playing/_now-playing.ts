import { getNowPlaying } from '$utils/spotify';

export const getNowPlayingSong = async () => {
	const response = await getNowPlaying();

	if (response.status === 204 || response.status > 400) {
		return {
			isPlaying: false,
		};
	}

	const song = await response.json();

	if (song.item === null) {
		return {
			isPlaying: false,
		};
	}

	const isPlaying = song.is_playing;
	const title = song.item.name;
	const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
	const album = song.item.album.name;
	const albumImageUrl = song.item.album.images[0].url;
	const songUrl = song.item.external_urls.spotify;

	return {
		album,
		albumImageUrl,
		artist,
		isPlaying,
		songUrl,
		title,
	};
};
