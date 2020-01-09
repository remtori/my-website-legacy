import { highlightAuto, registerLanguage } from 'highlight.js/lib/highlight.js';

registerLanguage('javascript', require('highlight.js/lib/languages/javascript.js'));

export default function highlight(code, language)
{
	return highlightAuto(code, language).value;
}
