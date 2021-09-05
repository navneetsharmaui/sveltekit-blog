export function humanDate(date: string | Date) {
	return toDate(date).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	});
}

export function UTCDate(date: string | Date) {
	return toDate(date).toUTCString();
}

export function ISODate(date: string | Date) {
	return toDate(date).toISOString().split('T')[0];
}

function toDate(date: string | Date) {
	if (!date) return new Date();
	return typeof date === 'string' ? new Date(date) : date;
}
