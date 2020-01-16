import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import JSXImage from '~/components/JSXImage';
import waifuIndexes from '~/assets/images/waifu/indexes.json';
import styles from './styles.scss';

function preloadAll()
{
	return Promise.all(waifuIndexes.map(path => new Promise(resolve =>
	{
		const img = new Image();
		img.onload = resolve;
		img.src = path;
	})));
}

export default function WallPaper()
{
	const [ ready, setReady ] = useState(false);

	useEffect(() =>
	{
		setTimeout(() => preloadAll().then(() => setReady(true)), 1000);
	}, []);

	if (!ready)
	{
		return (
			<JSXImage
				src={waifuIndexes[0]}
				class={styles.wallpaperImg}
				width={1024}
				height={240}
			/>
		);
	}

	return (
		<div class={styles.wallpaper} ref={handlerScrollableWallPaper}>
			{
				waifuIndexes.map((source, i) => (
					<img
						key={`${source}-${i}`}
						src={source}
						class={styles.wallpaperImg}
						width={1024}
						height={240}
					/>
				))
			}
		</div>
	);
}

function handlerScrollableWallPaper(ele: HTMLDivElement | null): void
{
	if (ele == null) return;

	let index = 0;
	let offset = 1;

	setInterval(() =>
	{
		index += offset;
		if (index === 0 || index === waifuIndexes.length - 1) offset *= -1;

		ele.scrollTo(index * ele.clientWidth, 0);
	}, 10000);
}
