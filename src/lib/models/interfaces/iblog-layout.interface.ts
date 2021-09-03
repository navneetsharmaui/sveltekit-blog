import type { IBlog } from './iblog.interface';
export interface IBlogLayout extends IBlog {
	readingTime: string;
	previousArticleLink?: string;
	nextArticleLink?: string;
}
