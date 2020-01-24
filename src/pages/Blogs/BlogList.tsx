import { h, Component } from 'preact';
import { Link } from 'preact-router';

import styles from './styles.scss';
import JSXImage from '~/components/JSXImage';
import Icon, { icons } from '~/components/Icon';
import { LoadingDot } from '~/components/placeholder';
import { Resource, createDataGetter  } from '~/libs/firebase/firestore/fsGetData';

interface Props
{
	matches: { tag?: string };
}

interface States
{
	list: Blog[] | null;
	resource: Resource;
	isFetching: boolean;
	shouldFetchData: boolean;
}

export default class BlogList extends Component<Props, States>
{
	private isMounted = true;

	constructor(props: Props)
	{
		super(...arguments);

		this.state = {
			list: null,
			resource: createDataGetter(props.matches.tag),
			shouldFetchData: true,
			isFetching: false,
		};

		this.infiniteScrollHandler = this.infiniteScrollHandler.bind(this);
	}

	componentWillReceiveProps(nextProps: Readonly<Props>)
	{
		if (this.props.matches.tag !== nextProps.matches.tag)
		{
			window.scroll(0, 0);
			this.state.resource.reset(nextProps.matches.tag);
			this.fetchData();
		}
	}

	componentDidMount()
	{
		this.fetchData();
		window.addEventListener('scroll', this.infiniteScrollHandler);
	}

	componentWillUnmount()
	{
		this.isMounted = false;
		window.removeEventListener('scroll', this.infiniteScrollHandler);
	}

	infiniteScrollHandler()
	{
		const target = document.documentElement;
		if (!this.state.isFetching &&
			this.state.resource.hasMore() &&
			target.scrollHeight - (target.scrollTop + target.clientHeight) < 150
		)
		{
			this.fetchData();
		}
	}

	fetchData()
	{
		this.setState({ isFetching: true, shouldFetchData: false });
		this.state.resource.getNextData().then(d =>
			this.isMounted && this.setState({
				list: d,
				isFetching: false,
			}),
		);
	}

	render(props: Props, { list, isFetching }: States)
	{
		if (list == null) return <LoadingDot />;
		if (list.length === 0) return <div>Empty :(</div>;

		return (
			<div class={styles.listStyle}>
				{list.map((d, i) => <BlogItem key={`${props.matches.tag}-${i}`} data={d} />)}
				{isFetching && <LoadingDot />}
			</div>
		);
	}
}

type BlogItemProps = { data: Blog };

const BlogItem = ({ data: {
	author, description, key, previewImg, tags, timestamp, title,
}}: BlogItemProps) =>
(
	<div class={styles.listItem} data-key={key} >
		<div>
			<Link href={`/blogs/${key}`}>
				<JSXImage src={previewImg.url} width={previewImg.width} height={previewImg.height} />
			</Link>
			<div class={styles.authorAndTime}>
				<span class={styles.author}>
					<Icon class={styles.icon} icon={icons.faUser} />
					{author}
				</span>
				<span>
					<Icon class={styles.icon} icon={icons.faClock} />
					{new Date(timestamp).toDateString()}
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
