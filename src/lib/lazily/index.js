export function lazily(callback) {
	if (PRERENDER) return 0;
	if (typeof requestIdleCallback === 'function') {
		return requestIdleCallback(callback, { timeout: 10000 });
	}
	return setTimeout(callback, 5000);
}

export function cancelLazily(id) {
	if (typeof cancelIdleCallback === 'function') {
		cancelIdleCallback(id);
	} else {
		clearTimeout(id);
	}
}