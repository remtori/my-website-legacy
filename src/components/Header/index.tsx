import { h } from 'preact';
import { Link } from 'preact-router/match';
import { Link as PassiveLink } from 'preact-router';
import JSXImage from '~/components/JSXImage';

import styles from './styles.scss';

export default function Header() {
	return (
		<header class={styles.header}>
			<PassiveLink href='/' class={styles.home} >
				<JSXImage
					src='/assets/icons/icon-192.webp'
					width={40}
					height={40}
				/>
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
					<span>GALLERY</span>
				</PassiveLink>
			</nav>
		</header>
	);
}
