const WEBP_IMAGE = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';

const willHasWebp = new Promise(resolve =>
{
	const image = new Image();
	image.onload = () => resolve(image.width === 1);
	image.onerror = () => resolve(false);
	image.src = WEBP_IMAGE;
});

export default willHasWebp;
