import type { IBlog } from './iblog.interface';
export interface IBlogLayout {
	previousArticleLink?: string;
	nextArticleLink?: string;
	metadata: IBlog;
}
