import { h, Component } from 'preact';
import Loading from '../../loading';
import BlogListItem from './blog-list-item';
import { fetchBlogs, fetchBlogsWithTag } from '../../../reducers/blog';
import style from './style.less';
import { connect } from 'preact-redux';

const OPTS = { passive: true };

class BlogList extends Component {

	constructor(props, ctx) {
		super(props, ctx);

		let anchorPoint = 0;
		let query = "";

		this._onScroll = _ => {
			const { scrollTop, scrollHeight } = document.scrollingElement;

			if(scrollTop > anchorPoint && this.state.resolved) {
				anchorPoint = 
					this.base
						.querySelector(`.${style.listItem}:nth-last-child(2)`)
						.getBoundingClientRect().top
					+ (
						window.pageYOffset || document.documentElement.scrollTop
					);				
			}
		}

		this._loadBlogs = _ => {
			const tag = this.props.tag || "";
			if (tag.length > 0) {
				this.props.dispatch(fetchBlogsWithTag(tag));
			} else {
				this.props.dispatch(fetchBlogs());
			}
		}
	}	

	componentDidUpdate(prevProp) {
		if (this.props.tag !== prevProp.tag)
			this._loadBlogs();
	}

	componentDidMount() {
		this._loadBlogs();
		window.addEventListener('scroll', this._onScroll, OPTS);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._onScroll, OPTS)
	}

	render({ tag="", list, loading, error }) {
					
		if (loading)
			return <Loading />
		else if (error)
			return <h3 style="text-align: center;">
					{ 
						tag.length > 0 
							? `No blog found with tag "${tag}"` 
							: "Well, i guess no body has post a blog yet ~" 
					}
				</h3>
		else
			return (
				<div class={ style.blogList }>
					{ Object.keys(list).map(key => (
						<BlogListItem blog={list[key]} />
					)) }
				</div>
			);
	}
}

const mapStateToProps = ({blog:{list, fetchStatus:{list:{isFetching, error}}}}) => {
	return {
		list,		
		error,
		loading: isFetching,
	}
}

export default connect(mapStateToProps)(BlogList);