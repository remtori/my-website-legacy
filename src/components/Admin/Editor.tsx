import { h } from 'preact';
import { route } from 'preact-router';
import { Formik } from 'formik';

import styles from './styles.scss';

export default function BlogEditor({ path }: { path: string }) {
	return (
		<div class={styles.editor}>
			<div>Editing: {path}</div>
		</div>
	);
}
