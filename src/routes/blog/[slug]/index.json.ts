/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import posts from '../_blog-api';

export function get({ params }) {
	const post = posts
		.map((blog, index, blogArray) => {
			const nextArticleLink = index === blogArray.length - 1 ? '' : blogArray[index + 1].metadata.slug;
			const previousArticleLink = index === 0 ? '' : blogArray[index - 1].metadata.slug;
			return { ...blog, index, nextArticleLink, previousArticleLink };
		})
		.filter((blog) => blog.metadata.slug === params.slug);
	if (post.length === 1) {
		return {
			body: post[0],
		};
	}

	return {
		status: 404,
	};
}
