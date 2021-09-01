import posts from '../_blog-api';

export function get({ params }) {

	const post = posts.filter((blog) => blog.slug === params.slug);
	if (post.length === 1) {
		return {
			body: post[0],
		};
	}

	return {
		status: 404,
	};
}
