import { h } from 'preact';
import { uploadFile } from '~/libs/firebase-wrap/storage';
import { signInWithGoogle } from '~/libs/firebase-wrap/auth';

import * as marked from 'marked';
import highlight from '~/libs/highlight.js';

marked.setOptions({
	gfm: true,
	highlight,
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
