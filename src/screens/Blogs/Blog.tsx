import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { getStorageURLFromPath } from '~/libs/firebase-wrap/utils';
import { LoadingCircle } from '~/components/placeholder';
import Icon, { icons } from '~/components/Icon';
import { getBlog } from '~/libs/firebase-wrap/firestore/dbQuery';
import { RootState } from '~/store';

import styles from './styles.scss';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import JSXImage from '~/components/JSXImage';
import { Link } from 'preact-router';

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
	const [ blog, setBlog ] = useState<Blog | null>(null);
	const user = useSelector<RootState, User | null>(s => s.auth.user);

	useEffect(() =>
	{
		setBlog(null);
		setContent({ __html: '' });

		getBlog(id).then(setBlog).catch(() => 0);
		fetch(getStorageURLFromPath(`blogs/${id}.html`))
			.then(res => Promise.all([ res.status, res.text() ]))
			.then(resp => setContent(parseContent(resp)))
			.catch(err => setContent(parseContent(err)));

	}, [ id ]);

	if (content.__html.length === 0) return <LoadingCircle />;
	if (blog == null) return <div class={styles.content} dangerouslySetInnerHTML={content} />;

	return (
		<div class={styles.contentContainer}>
			{
				user && user.isAdmin
				? (
			 	<Link class={styles.edit} href={`/editor/${id}`}>
				 	<Icon icon={icons.faEdit} />
				</Link>
				)
				: <div class={styles.edit} />
			}
			<h1>{blog.title}</h1>
			<span class={styles.timeAdded}>
				<Icon class={styles.icon} icon={icons.faClock} />
				{new Date(blog.timestamp).toDateString()}
			</span>
			<div class={styles.desc}>{blog.description}</div>
			<JSXImage class={styles.coverImg} src={blog.previewImg.url} />
			<div class={styles.content} dangerouslySetInnerHTML={content} />
			<div class={styles.tags}>
				<Icon class={styles.icon} icon={icons.faTags} />
				{
					blog?.tags.map((tag, i) =>
						<a key={`${id}${i}`} href={`/blogs?tag=${tag}`}>{tag}</a>,
					)
				}
			</div>
		</div>
	);
}
