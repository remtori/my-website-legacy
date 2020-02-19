import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'preact-router';
import JSXImage from '../JSXImage';
import { LoadingDot } from '../placeholders';
import Icon, { icons } from '../Icon';
import query from '~/lib/indexQuery';

import styles from './styles.m.scss';

interface Props {
	tag?: string;
}

export default function BlogList({ tag }: Props) {

	const [ data, setData ] = useState<null | PageContent[]>(null);

	useEffect(() => {
		setData(null);
		query({ tag: `blog ${tag || ''}` }).then(setData);
	}, [ tag ]);

	if (data == null) return <LoadingDot />;
	if (data.length === 0) return <div>Empty :(</div>;

	return (
		<div class={styles.listStyle}>
			{data.map((d, i) => <BlogItem key={`${tag || ''}-${i}`} data={d} />)}
		</div>
	);
}

type BlogItemProps = { data: PageContent };

const BlogItem = ({ data: {
	author, description, id, content, previewImg, tags, modified, title
} }: BlogItemProps) =>
	(
		<div class={styles.listItem} data-id={id} >
			<div>
				<Link href={content}>
					<JSXImage
						src={previewImg?.url || '/assets/images/notfound.svg'}
						width={previewImg?.width}
						height={previewImg?.height}
					/>
				</Link>
				<div class={styles.authorAndTime}>
					<span class={styles.author}>
						<Icon class={styles.icon} icon={icons.faUser} />
						{author}
					</span>
					<span>
						<Icon class={styles.icon} icon={icons.faClock} />
						{new Date(modified).toUTCString()}
					</span>
				</div>
				<div class={styles.tags}>
					<Icon class={styles.icon} icon={icons.faTags} />
					{
						tags.split(/\s/g).map((tag, i) =>
							<a key={`${id}-${i}`} href={`/blogs?tag=${tag}`}>{tag}</a>
						)
					}
				</div>
			</div>
			<div>
				<Link class={styles.titleWrapper} href={content}>{title}</Link>
				<div>{description || 'No description specified'}</div>
			</div>
		</div>
	);
