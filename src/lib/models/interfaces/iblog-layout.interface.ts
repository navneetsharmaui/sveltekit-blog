export interface IBlogLayout {
	title: string;
	author: string;
	publishedAt: string;
	slug: string;
	published: boolean;
	summary: string;
	readingTime: string;
	previousArticleLink?: string;
	nextArticleLink?: string;
}
