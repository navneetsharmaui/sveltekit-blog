import { posts } from './_blog-api';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ query }) {

	const limit = Number(query.get('limit') ?? Infinity);

	if (Number.isNaN(limit)) {
		return {
			status: 400,
		};
	}

	const metadata = posts.map((p) => p.metadata);

	return {
		body: metadata.slice(0, limit),
		headers: {
			'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
		},
	};
}
