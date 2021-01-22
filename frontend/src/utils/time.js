export const format = (timestamp) => {
	if (!Number.isFinite(timestamp)) return;
	return (new Date(timestamp)).toString().slice(4, 24);
}