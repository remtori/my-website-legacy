import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<nav>
					<Link href="/">Home</Link>
					<Link href="/blog?id=about">About</Link>
					<Link href="/work">Work</Link>
					<Link href="/bloglist">Blog</Link>
				</nav>
			</header>
		);
	}
}
