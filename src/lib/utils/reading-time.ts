export const readingTime = (text: string): { time: string; words: number } => {
	const wordsPerMinute = 200;
	const words = text.split(/\s+/g).length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return {
		time: `${minutes} min read`,
		words,
	};
};
