import {
	highlightAuto,
	registerLanguage
} from 'highlight.js/lib/highlight.js';

registerLanguage('javascript', require('highlight.js/lib/languages/javascript.js'));
registerLanguage('css', require('highlight.js/lib/languages/css.js'));

export default function highlight(code, language) {
	return highlightAuto(code, language).value;
}