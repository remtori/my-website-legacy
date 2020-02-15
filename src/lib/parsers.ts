import * as marked from 'marked';
import { highlightAuto, registerLanguage } from 'highlight.js/lib/highlight.js';

// tslint:disable: no-var-requires
registerLanguage('markdown', require('highlight.js/lib/languages/markdown.js'));
registerLanguage('javascript', require('highlight.js/lib/languages/javascript.js'));
// tslint:enable: no-var-requires

const MARKED_OPTIONS: marked.MarkedOptions = {
	gfm: true,
	highlight: (code: string) => highlightAuto(code).value,
	smartLists: true,
	smartypants: true
};

export function parseMarkdown(content: string): string {
	return marked(content, MARKED_OPTIONS);
}

// minimal yaml parser
export function parseYaml<T extends object>(text: string): T {
	return Object.fromEntries(
		text.split('\n').map(kv => kv.split(': '))
	);
}

export function getMetaText(text: string): string {
	return (/^\s*---\n\s*([\s\S]*?)\s*\n---\n/i.exec(text) || [])[1];
}

export function parsePageContent(text: string): PageContent {
	const meta = parseYaml<PartialBy<PageContent, 'content'>>(getMetaText(text));
	const content = text.replace(/^\s*---\n\s*([\s\S]*?)\s*\n---\n/i, '');

	return {
		...meta,
		content
	};
}
