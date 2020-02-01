import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import JSXImage from '~/components/JSXImage';
import waifuIndexes from '~/assets/images/waifu/indexes.json';
import styles from './styles.scss';
import { lazily } from '~/lib/lazily';

function preloadAll() {
	return Promise.all(
		waifuIndexes.map(path => new Promise(resolve => {
			const img = new Image();
			img.onload = resolve;
			img.src = path;
		}))
	);
}

export default function WallPaper() {

	const [ ready, setReady ] = useState(false);

	useEffect(() => {
		/**
		 * We dont want to overload the network with images when there more important stuff need fetching
		 * Uncomment the code below to enable auto sliding wallpaper
		 */
		lazily(() => preloadAll().then(() => setReady(true)));
	}, []);

	if (!ready) {
		return (
			<div class={styles.wallpaper}>
				<JSXImage
					src={waifuIndexes[Math.floor(Math.random() * (waifuIndexes.length - 1))]}
					class={styles.wallpaperImg}
					width={1024}
					height={240}
				/>
			</div>
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

function handlerScrollableWallPaper(ele: HTMLDivElement | null): void {

	if (ele == null) return;

	let index = 0;
	let offset = 1;

	setInterval(() => {
		index += offset;
		if (index === 0 || index === waifuIndexes.length - 1) offset *= -1;

		ele.scrollTo(index * ele.clientWidth, 0);
	}, 10000);
}
