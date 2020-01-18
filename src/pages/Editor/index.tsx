import { h } from 'preact';
import { route } from 'preact-router';
import { useSelector } from 'react-redux';
import * as marked from 'marked';
import highlight from '~/libs/highlight.js';
import { RootState } from '~/ducks';
import { genDocumentKey } from '~/libs/firebase-wrap/firestore';
import { signIn, signOut } from '~/libs/firebase-wrap/auth';

import ggIcon from '~/assets/brands/google.svg';
import styles from './styles.scss';

marked.setOptions({
	gfm: true,
	highlight,
	smartLists: true,
	smartypants: true,
});

export default function Editor()
{
	const user = useSelector<RootState, User | null>(s => s.auth.user);

	if (user == null)
	{
		return (
			<div>
				<div class='text'>
					<span>Hey, welcome random stranger.</span><br/>
					<span>You aren't suppose to be here</span><br/>
					<span>BUT if you wanna continue you need to login first.</span><br/>
				</div>
				<button class={styles.loginBtn} onClick={signIn}>
					<img src={ggIcon} />
					<span>Sign in with Google</span>
				</button>
			</div>
		);
	}

	return (
		<div class='text'>
			<div>Editor</div>
			{
				!user.isAdmin
				? <div>:( Too bad you not an admin.</div>
				: (
				<div>
					<button onClick={() => route(`/editor/${genDocumentKey()}`)}>
						Create new a Blog
					</button>
				</div>
				)
			}
			<button onClick={signOut}>Sign out</button>
		</div>
	);
}