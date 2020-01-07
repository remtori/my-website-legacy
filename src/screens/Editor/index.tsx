import { h } from 'preact';
import { uploadFile } from '~/fire_wrap/storage';
import { signInWithGoogle } from '~/fire_wrap/auth';
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
(window as any).signIn = signInWithGoogle;

export default function Editor()
{
	return <div>Editor</div>;
}
