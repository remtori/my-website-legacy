import { h } from 'preact';
import * as marked from 'marked';
import Markup from 'preact-markup';
import highlight from '~/lib/highlight.js';

const CACHE: { [k: string]: string } = {};

const OPTIONS: marked.MarkedOptions = {
	gfm: true,
	highlight,
	smartLists: true,
	smartypants: true
};

export const markdownToHtml = (md: string) =>
	CACHE[md] || (CACHE[md] = marked(md, OPTIONS));

export interface MarkdownProps {
	content: string;
	postProcess?: (html: string) => string;
	[key: string]: any;
}

export default function Markdown({ content, postProcess, ...props }: MarkdownProps) {
	let markup = markdownToHtml(content);
	if (postProcess) markup = postProcess(markup);
	return <Markup markup={markup} type='html' trim={false} {...props} />;
}
