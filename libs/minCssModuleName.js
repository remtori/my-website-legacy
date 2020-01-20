function minCssModuleName(ABC = 'abcefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ_')
{
	const classNameMap = {};
	let count = 0;

	return function(ctx, localIdentName, localName)
	{
		const key = ctx.resourcePath + localName;
		const existing = classNameMap[key];

		if (existing) return existing;

		let className = '';
		let cycle = ++count;
		let pos;

		while (cycle > 0)
		{
			pos = (cycle - 1) % ABC.length;
			cycle = Math.floor((cycle - pos) / ABC.length);
			className = ABC[pos] + className;
		}

		classNameMap[key] = className;
		return className;
	}
};

module.exports = minCssModuleName();
