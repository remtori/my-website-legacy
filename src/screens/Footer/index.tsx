import { h } from 'preact';
import Icon, { icons } from '~/components/Icon';
import ELink from '~/components/ExternalLink';

import preactIcon from '~/assets/brands/preact.svg';
import firebaseIcon from '~/assets/brands/firebase.svg';
import webpackIcon from '~/assets/brands/webpack.svg';

import styles from './styles.scss';

const cx = (...c: string[]) => c.join(' ');

export default function Footer()
{
	return (
		<footer class={styles.footer}>
			<div>
				<span>Language: </span>
				<select>
					<option>English</option>
					<option>Tiếng Việt</option>
				</select>
			</div>
			<div>
				<span>Found an issue? </span>
				<ELink href='https://github.com/remtori/my-website'>
					Help me fix it
				</ELink>
			</div>
			<div>
				<span>Created with </span>
				<Icon class={styles.icon} icon={preactIcon}   title='Preact'   />
				<Icon class={styles.icon} icon={firebaseIcon} title='Firebase' />
				<Icon class={styles.icon} icon={webpackIcon}  title='Webpack'  />
				<span> by a proud fan of </span>
				<ELink href='https://rezero.fandom.com/wiki/Rem'>Rem</ELink>
			</div>
			<div>
				<ELink class={styles.social} href='https://twitter.com/lqv_vn'>
					<Icon class={cx(styles.icon, styles.iconTwitter)} icon={icons.faTwitter} title='twitter' />
					<span>@LQV_VN</span>
				</ELink>
				<ELink class={styles.social} href='https://github.com/remtori'>
					<Icon class={cx(styles.icon, styles.iconWhite)} icon={icons.faGithub} title='github' />
					<span>Remtori</span>
				</ELink>
				<ELink class={styles.social} href='mailto:lqv.remtori+sites@gmail.com'>
					<Icon class={cx(styles.icon, styles.iconWhite)} icon={icons.faEnvelope} title='mail' />
					<span>lqv.remtori@gmail.com</span>
				</ELink>
			</div>
		</footer>
	);
}
