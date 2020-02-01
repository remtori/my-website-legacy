import { h } from 'preact';
import { route } from 'preact-router';
import { Formik } from 'formik';

import styles from './styles.scss';

export default function BlogEditor({ id }: { id: string }) {
	return (
		<div class={styles.editor}>
			<div>Editing: {id}</div>
		</div>
	);
}
