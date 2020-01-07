import { h } from 'preact';
import { uploadFile } from '../../firebase/storage';
import * as marked from 'marked';
import { highlightAuto } from 'highlight.js';

marked.setOptions({
	gfm: true,
	highlight: code => highlightAuto(code).value,
	smartLists: true,
	smartypants: true,
});

console.log(uploadFile);
console.log(marked);
export default function Editor()
{
	return <div>Editor</div>;
}
