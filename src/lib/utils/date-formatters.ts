function toDate(date: string | Date) {
	if (!date) return new Date();
	return typeof date === 'string' ? new Date(date) : date;
}

export function blogTypeDate(date: string | Date): string {
	return toDate(date).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	});
}
