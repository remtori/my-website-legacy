import * as marked from 'marked';
import { highlightAuto, registerLanguage } from 'highlight.js/lib/highlight.js';

registerLanguage('markdown', require('highlight.js/lib/languages/markdown.js'));
registerLanguage('javascript', require('highlight.js/lib/languages/javascript.js'));

const OPTIONS: marked.MarkedOptions = {
	gfm: true,
	highlight: (code: string) => highlightAuto(code).value,
	smartLists: true,
	smartypants: true
};

export default function mark(content: string): string {
	return marked(content, OPTIONS);
}
