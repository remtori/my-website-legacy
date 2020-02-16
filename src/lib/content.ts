import parse from './yaml';
import mark from './mark';

import config from '~/config';

// Find YAML FrontMatter preceding a markdown document
const FRONT_MATTER_REG = /^\s*---\n\s*([\s\S]*?)\s*\n---\n/i;

export interface Meta {
	title?: string;
	description?: string;
}

export interface Content {
	html: string;
	meta: Meta;
	contentPath: string;
	fallback?: boolean;
}

const CACHE: { [k: string]: Promise<Content>; } = {};
(window as any).CACHE = CACHE;

export function getContent(name: string, lang: string) {

	if (name === '/') name = 'index';

	const path = `/content/${lang}`;
	let url = `${path}/${name.replace(/^\//, '')}`;
	let ext = (url.match(/\.([a-z]+)$/i) || [])[1];
	if (!ext) url += '.md';

	// In prod, never re-fetch the content
	if (process.env.NODE_ENV === 'production' && url in CACHE) {
		return CACHE[url];
	}

	let fallback = false;
	let contentPath = url;
	const res = fetch(contentPath)
		.then(r => {
			// fall back to english
			if (!r.ok && lang !== 'en') {
				fallback = true;
				contentPath = url.replace(/content\/[^/]+\//, 'content/en/');
				return fetch(contentPath);
			}
			return r;
		})
		.then(r => {
			if (r.ok) return r;
			ext = 'md';
			contentPath = `${path}/${r.status}.md`;
			return fetch(contentPath);
		})
		.then(r => r.text())
		.then(getContentFromSource)
		.then(data => {
			data.fallback = fallback;
			data.contentPath = contentPath;
			return data;
		});

	return (CACHE[url] = res);
}

type TypeGetContentOnServer = (route: string) => Content;

export const getContentOnServer: TypeGetContentOnServer = PRERENDER
	? (route: string) => {
			if (route === '/') route = '/index';
			route = route.replace(/^\//, '');

			const fs = __non_webpack_require__('fs');
			return getContentFromSource(
				fs.readFileSync(`content/en/${route}.md`, 'utf8')
			);
	  }
	: (() => void 0) as any;

function getContentFromSource(text: string): Content {

	const metaSource = (FRONT_MATTER_REG.exec(text) || [])[1];
	const meta = Object.assign(
		{
			title: config.title,
			description: config.description
		},
		metaSource && parse(metaSource)
	);

	const content = text.replace(/^\s*---\n\s*([\s\S]*?)\s*\n---\n/i, '');

	return {
		meta,
		html: mark(content)
	} as Content;
}
