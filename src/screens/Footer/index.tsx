import { h } from 'preact';
import Icon, { icons } from '~/components/Icon';
import ELink from '~/components/ExternalLink';

import preactIcon from '~/assets/brands/preact.svg';
import firebaseIcon from '~/assets/brands/firebase.svg';

import styles from './styles.scss';

export default function Footer()
{
	return (
		<footer class={styles.footer}>
			<div>
				<span>Language:</span>
				<select>
					<option>English</option>
					<option>Tiếng Việt</option>
				</select>
			</div>
			<div>
				<span>Created with </span>
				<Icon class={styles.icon} icon={preactIcon} alt='Preact' />
				<Icon class={styles.icon} icon={firebaseIcon} alt='Firebase' />
				<span>by a very proud fan of </span>
				<ELink href='https://rezero.fandom.com/wiki/Rem'>Rem</ELink>
			</div>
			<div>
				<ELink href='https://github.com/remtori'>
					<Icon icon={icons.faGithub} alt='github' />
					<span>Remtori</span>
				</ELink>
			</div>
			<div>
				<ELink href='https://twitter.com/lqv_vn'>
					<Icon icon={icons.faTwitter} alt='twitter' />
					<span>@LQV_VN</span>
				</ELink>
			</div>
		</footer>
	);
}
