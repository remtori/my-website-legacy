import { h } from 'preact';
import { route } from 'preact-router';
import useStore from '~/hooks/useStore';
import cx from '~/lib/cx';

import * as codemirror from 'codemirror';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/addon/comment/comment';
import 'codemirror/lib/codemirror.css';

import styles from './styles.scss';

// codemirror(HTMLElement, {
// 	value: String(value || ''),
// 	mode: 'jsx',
// 	theme: 'one-dark',
// 	lineNumbers: true,
// 	indentWithTabs: !spaces,
// 	tabSize: tabSize || 2,
// 	indentUnit: spaces ? Math.round(spaces) || 2 : undefined,
// 	showCursorWhenSelecting: true,
// 	extraKeys: {
// 		'Cmd-/': 'toggleComment'
// };

export default function Editor(props: { path: string }) {

	const { path } = props;

	return (
		<div class={styles.editor}>
			<div>Editing: {path}</div>
		</div>
	);
}
