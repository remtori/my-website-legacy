import { h } from 'preact';
import { Link } from 'preact-router';
import { blogs } from '~/libs/firebase-wrap/firestore';

import styles from './styles.scss';
import JSXImage from '~/components/JSXImage';
import ListView from '~/components/ListView';
import Icon, { icons } from '~/components/Icon';

export default function BlogList()
{
	return (
		<ListView<Blog>
			getData={getData}
			renderData={renderData}
		/>
	);
}

function getData()
{
	return blogs.get().then(snapshot => {
		const list: IDocument[] = [];
		snapshot.forEach(d => list.push(d.data() as IDocument)) ;
		return list;
	});
}

function renderData(data: Blog[])
{
	return (
		<div class={styles.listStyle}>
			{data.length === 0 ? 'Empty :<' : data.map((d, i) => <BlogItem key={i} data={d} />)}
		</div>
	);
}

function BlogItem({ data: {
	author, description, key, previewImg, tags, timeAdded, title,
}}: { data: Blog })
{
	return (
		<div class={styles.listItem} data-key={key} >
			<div>
				<Link href={`/blogs/${key}`}>
					<JSXImage src={previewImg.url}/>
				</Link>
				<div class={styles.authorAndTime}>
					<span class={styles.author}>
						<Icon class={styles.icon} icon={icons.faUser} />
						{author}
					</span>
					<span>
						<Icon class={styles.icon} icon={icons.faClock} />
						{new Date(timeAdded).toLocaleString()}
					</span>
				</div>
				<div class={styles.tags}>
					<Icon class={styles.icon} icon={icons.faTags} />
					{
						tags.map((tag, i) =>
							<a key={`${key}${i}`} href={`/blogs?tag=${tag}`}>{tag}</a>,
						)
					}
				</div>
			</div>
			<div>
				<Link class={styles.titleWrapper} href={`/blogs/${key}`}>{title}</Link>
				<div>{description}</div>
			</div>
		</div>
	);
}
