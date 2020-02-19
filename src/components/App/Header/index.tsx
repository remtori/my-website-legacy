import { h } from 'preact';
import { Link } from 'preact-router/match';
import { Link as PassiveLink } from 'preact-router';
import icon from '~/assets/icons/icon-minimal.png';

import styles from './styles.m.scss';

export default function Header() {
	return (
		<header class={styles.header}>
			<div class={styles.nav}>
				<PassiveLink href='/' class={styles.home} >
					<img src={icon} />
					<span>Remtori's Comfy Home</span>
				</PassiveLink>
				<nav>
					<Link activeClassName={styles.focused} href='/about'>
						<span>ABOUT</span>
					</Link>
					<Link activeClassName={styles.focused} href='/blogs'>
						<span>BLOGS</span>
					</Link>
					<PassiveLink href=''>
						<span>PROJECTS</span>
					</PassiveLink>
				</nav>
			</div>
		</header>
	);
}
