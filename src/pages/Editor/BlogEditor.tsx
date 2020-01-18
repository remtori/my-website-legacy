import { h } from 'preact';
import { route } from 'preact-router';
import { useSelector } from 'react-redux';
import { RootState } from '~/ducks';
import { Formik } from 'formik';

import styles from './styles.scss';

export default function BlogEditor({ id }: { id: string })
{
	return (
		<div class={styles.editor}>
			<div>Editing: {id}</div>
		</div>
	);
}