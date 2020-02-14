const { h, render } = require('preact');
require('undom/register');

const VOID_ELEMENTS = [ 'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', ];

const ESC = {
	'&': 'amp',
	'<': 'lt',
	'>': 'gt',
	'"': 'quot',
	"'": 'apos',
};

const enc = s => s.replace(/[&'"<>]/g, a => `&${ESC[a]};`);
const attr = (a) => {
	if (a.name === 'class' && a.value === '') return '';

	return ` ${a.name.replace(/^html/, '')}${a.value === 'true' || a.value === '' ? '' : `="${enc(a.value)}"`}`;
};

const serializeHtml = (el) => {
	const { nodeType, nodeName, textContent, attributes, childNodes, innerHTML, style } = el;

	const normalizedNodeName = nodeName.toLowerCase();

	if (nodeType === 3) return enc(textContent);

	const start = `<${normalizedNodeName}${attributes.map(attr).join('')}`;

	if (VOID_ELEMENTS.includes(normalizedNodeName)) return `${start} />`;

	return `${start}>${innerHTML || childNodes.map(serializeHtml).join('')}</${normalizedNodeName}>`;
};

const preactDomRenderer = () => {
	const parent = document.createElement('x-root');
	document.body.appendChild(parent);

	const renderer = {
		render: (jsx) => {
			render(jsx, parent);
			return renderer;
		},
		html: () => {
			return parent.childNodes.map(serializeHtml).join('');
		},
		tearDown: () => {
			render(h('nothing'), parent);
			parent.remove();
		}
	};
	return renderer;
};

Object.assign(global, {
	requestAnimationFrame(callback) {
		return setImmediate(callback, 1/60);
	},
	cancelAnimationFrame: clearImmediate,
})

module.exports = preactDomRenderer;
