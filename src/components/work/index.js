import { h, Component } from 'preact';
import style from './style.less';

export default class Work extends Component {
	
	// update the current time
	updateTime = _ => {
		
	};

	// gets called when this route is navigated to
	componentDidMount() {
		
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		
	}

	// Note: `id` comes from the URL, courtesy of our router
	render({ id="" }, { }) {
		return (
			<div class={style.workList}>
				<span>{ id.length == 0 ? "list of my work" : `a specific work id: ${id}`}</span>
			</div>
		);
	}
}
