import { h } from 'preact';
import { route } from 'preact-router';
import { Formik } from 'formik';

import styles from './styles.scss';
import useStore from '~/hooks/useStore';

export default function BlogEditor(props: { path: string, url: string }) {

	const { path, url } = props;
	const store = useStore([ 'auth' ]);
	const level = store.state.auth?.level || 0;

	if (level === 0) route(`/admin?forward=${url}`);

	return (
		<div class={styles.editor}>
			<div>Editing: {path}</div>
		</div>
	);
}
