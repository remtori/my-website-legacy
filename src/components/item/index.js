import { h, Component } from 'preact';
import { route } from 'preact-router';
import { timeToString } from '../../utils';
import { BlogIdNotFound } from './error';
import Loading from '../loading';
import ImageV from '../imageV';
import style from './style.less';

export default class Blog extends Component {

	componentDidMount = _ => {
		if (this.props.id == null)
			route('/blog/list');
		else
			fetchBlogIfNeeded(this.props.id);
	}

	componentDidUpdate = (prevProps) => {
		if (this.props.id == null)
			route('/blog/list');
		else if (this.props.id !== prevProps.id)
			fetchBlogIfNeeded(this.props.id);
	}

	render({ id, loading, error, list }) {

		if (loading) {
			return <Loading />
		} else if (!list[id]) {
			return <BlogIdNotFound id={id}/>
		} else if (error) {
			return <div>{ error }</div>
		}

		const { title, description, timeAdded, author, tags, content } = list[id];

		return (
			<div class={ style.blog }>			
				<div class={style.title}>{ title }</div>
				<div class={style.detail}>
					<span>{ author }</span>
					<span> ~ </span>
					<span>{ timeToString(timeAdded) }</span>
				</div>
				<div class={style.content}>
					{ content }
				</div>
			</div>
		);				
	}
}