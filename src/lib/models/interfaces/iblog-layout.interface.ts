import type { IReadingTime } from './ireading-time.interface';

export interface IBlogLayout {
	by: string;
	title: string;
	publishedAt: string;
	readingTime: IReadingTime;
	slug: string;
}
