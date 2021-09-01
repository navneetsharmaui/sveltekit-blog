import type { ISnippet } from './isnippet.interface';
import type { IStatistics } from './istatistics.interface';

export interface IVideoCard {
	id: number;
	snippet: ISnippet;
	statistics: IStatistics;
}
