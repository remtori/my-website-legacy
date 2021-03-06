import { h } from 'preact';
import { useCallback, useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import Icon, { icons } from '~/components/Icon';
import ELink from '~/components/ExternalLink';
import useStore from '~/hooks/useStore';
import config from '~/config';
import cx from '~/lib/cx';

import preactIcon from '~/assets/brands/preact.svg';
import firebaseIcon from '~/assets/brands/firebase.svg';
import webpackIcon from '~/assets/brands/webpack.svg';

import styles from './styles.m.scss';

export function useLanguage() {
	const store = useStore(['lang', 'url']);
	const { lang, url } = store.state;

	const setLang = useCallback(
		(next: string) => {
			if (typeof document !== 'undefined' && document.documentElement) {
				document.documentElement.lang = next;
			}
			store.update({ lang: next });
		},
		[url]
	);

	return { lang, setLang };
}

export default function Footer() {

	const { lang, setLang } = useLanguage();
	const onSelect = useCallback((e: any) => setLang(e.target.value), [ setLang ]);

	return (
		<footer class={styles.footer}>
			<div>
				<span>Language: </span>
				<select value={lang || 'en'} onInput={onSelect}>
					{Object.keys(config.languages).map(id => (
						<option key={id} selected={id === lang} value={id}>
							{config.languages[id]}
						</option>
					))}
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
			<div class={styles.version}>{`v${__VERSION__}`}</div>
		</footer>
	);
}
