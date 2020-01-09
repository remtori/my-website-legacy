import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getStorageURLFromPath } from '~/libs/firebase-wrap/utils';
import { LoadingCircle } from '~/components/placeholder';

import styles from './styles.scss';
import 'highlight.js/styles/atom-one-dark-reasonable.css';

function parseContent(stuff: [ number, string ] | string)
{
	return {
		__html: stuff.length && stuff[0] === 200
			? stuff[1]
			: `
				<div>Can not load this blog :((</div>
				<details class=${styles.error}>
					<summary>More Info</summary>
					<textarea rows=10 cols=50>
						${stuff.length ? stuff[1] : stuff}
					</textarea>
				</details>
			`,
	};
}

export default function Blog({ id }: { id: string })
{
	const [ content, setContent ] = useState({ __html: '' });

	useEffect(() =>
	{
		fetch(getStorageURLFromPath(`blogs/${id}`))
			.then(res => Promise.all([ res.status, res.text() ]))
			.then(resp => setContent(parseContent(resp)))
			.catch(err => setContent(parseContent(err)));

	}, [ id ]);

	return content.__html.length === 0
		? <LoadingCircle />
		: <div dangerouslySetInnerHTML={content} />;
}
