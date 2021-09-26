import type { ITopTrack } from '$models/interfaces/itop-track.interface';
import { getTopTracks } from '$utils/spotify';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({
	query,
}: {
	query: URLSearchParams;
}): Promise<
	| {
			status: number;
			headers?: {
				[key: string]: string;
			};
			body?: string;
	  }
	| {
			status: number;
			headers: {
				[key: string]: string;
			};
			body: ITopTrack[];
	  }
> {
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
