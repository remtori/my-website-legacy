import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import useStore from '~/hooks/useStore';
import Markdown from '../Markdown';

import styles from './styles.scss';
import 'highlight.js/styles/atom-one-dark-reasonable.css';

function contentPathFromUrl(url: string): string {
	switch (url) {
		case '/':
			return 'home';

		case '/about':
			return 'about';

		default:
			if (url.startsWith('/blogs/')) return url.slice(1);
			return '404';
	}
}

export default function Content() {

	const store = useStore([ 'url', 'lang' ]);
	const contentPath = contentPathFromUrl(store.state.url);
	const [ content, setContent ] = useState('loading...');
	const [ isFallback, setIsFallback ] = useState(Boolean(store.state.lang));
	const lang = store.state.lang || 'en';

	useEffect(() => {
		fetch(`/content/${lang}/${contentPath}.md`)
			.then(r => {
				if (r.status === 200) return r;
				setIsFallback(true);
				return fetch(`/content/en/${contentPath}.md`);
			})
			.then(r => r.text())
			.then(setContent);
	}, [ contentPath ]);

	return <Markdown content={content} />;
}
