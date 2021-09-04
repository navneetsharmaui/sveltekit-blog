import { getTopTracks } from '$lib/utils/spotify';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ query }) {
	const limit = Number(query.get('limit') ?? 10);

	if (Number.isNaN(limit)) {
		return {
			status: 400,
		};
	}

	const response = await getTopTracks();
	const { items } = await response.json();

	const tracks = items.slice(0, limit).map((track, index) => ({
		artist: track.artists.map((_artist) => _artist.name).join(', '),
		songUrl: track.external_urls.spotify,
		title: track.name,
		ranking: index + 1,
	}));

	return {
		status: 200,
		headers: {
			'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
		},
		body: tracks,
	};
}
