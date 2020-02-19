import { h } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import Markup from 'preact-markup';
import useStore from '~/hooks/useStore';
import { Link } from 'preact-router';
import Hydrator from '../Hydrator';
import { getContentOnServer, getContent, Meta } from '~/lib/content';
import Icon, { icons } from '../Icon';
import config from '~/config';

import styles from './styles.m.scss';
import 'highlight.js/styles/darcula.css';

export function useTitle(title?: string) {
	useEffect(() => {
		if (title) {
			document.title = `${title} | ${config.title}`;
		}
	}, [title]);
}

export function useDescription(text?: string) {
	useEffect(() => {
		const el = document.querySelector('meta[name=description]');
		if (text && el) {
			el.setAttribute('content', text);
		}
	}, [text]);
}

export function usePage(route: string, lang: string) {

	if (PRERENDER) {
		// tslint:disable-next-line: no-shadowed-variable
		const { html, meta } = getContentOnServer(route);
		return {
			html,
			meta,
			loading: true
		};
	}

	const [ html, setHtml ] = useState('');
	const [ meta, setMeta ] = useState<Meta>({});
	const [ loading, setLoading ] = useState(true);
	const [ contentPath, setContentPath ] = useState('');
	const [ isFallback, setIsFallback ] = useState(false);

	useTitle(meta.title);
	useDescription(meta.description);

	let didLoad = false;
	const lock = useRef<string>();
	useEffect(() => {
		if (!didLoad) {
			setLoading(true);
		}

		(lock as any).current = route;
		getContent(route, lang).then(data => {
			// Discard old load events
			if (lock.current !== route) return;

			// tslint:disable-next-line: no-shadowed-variable
			const { html, meta, fallback, contentPath } = data;

			didLoad = true;
			if (!meta) return;

			setMeta(meta);
			setHtml(html);
			setLoading(false);
			setIsFallback(!!fallback);
			setContentPath(contentPath);

			if ((window as any).nextStateToTop) {
				(window as any).nextStateToTop = false;
				scrollTo({
					top: 0,
					left: 0,
					behavior: 'smooth'
				});
			}
		});
	}, [ route, lang ]);

	return {
		html,
		meta,
		loading,
		isFallback,
		contentPath
	};
}

export default function Content() {

	const store = useStore([ 'url', 'lang', 'auth' ]);
	const level = store.state.auth?.level || 0;

	const [editRoute, setEditRoute] = useState(`/admin`);

	const {
		html,
		meta,
		loading,
		isFallback,
		contentPath
	} = usePage(store.state.url, store.state.lang);

	useEffect(() => {
		const url = `/editor?path=${contentPath}`;
		if (level === 0) {
			setEditRoute(`/admin?forward=${url}`);
		} else {
			setEditRoute(url);
		}
	}, [ contentPath, level ]);

	return (
		<div class={styles.contentContainer}>
			<Link class={styles.edit} href={editRoute}>
				<Icon icon={icons.faEdit} />
				<span>Edit</span>
			</Link>
			<Hydrator
				boot={!!html}
				component={Marked}
				markup={html}
				type='html'
				trim={false}
			/>
		</div>
	);
}

function Marked(props: any) {
	return PRERENDER
		? <div dangerouslySetInnerHTML={{__html: props.markup}} />
		: <Markup {...props} />;
}
