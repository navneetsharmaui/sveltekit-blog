import type { IBlogLayout } from './iblog-layout.interface';
export interface IBlogMD extends IBlogLayout {
	html: string;
	tldr: string;
	index: number;
}
