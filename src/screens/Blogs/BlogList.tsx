import { h, Component } from 'preact';
import { Link } from 'preact-router';

import styles from './styles.scss';
import JSXImage from '~/components/JSXImage';
import Icon, { icons } from '~/components/Icon';
import { LoadingCircle } from '~/components/placeholder';
import { Resource, createDataGetter  } from '~/libs/firebase-wrap/firestore/fsGetData';

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

		this.handleScroll = this.handleScroll.bind(this);
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
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount()
	{
		this.isMounted = false;
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll()
	{
		const target = document.documentElement;
		if (target.clientHeight + target.scrollTop > target.scrollHeight * 0.8 &&
			!this.state.isFetching &&
			this.state.resource.hasMore()
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
		if (list == null) return <LoadingCircle />;
		if (list.length === 0) return <div>Empty :(</div>;

		return (
			<div class={styles.listStyle}>
				{list.map((d, i) => <BlogItem key={`${props.matches.tag}-${i}`} data={d} />)}
				{isFetching && <LoadingCircle />}
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
			<Link href={`/contents/${key}`}>
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
			<Link class={styles.titleWrapper} href={`/contents/${key}`}>{title}</Link>
			<div>{description}</div>
		</div>
	</div>
);
