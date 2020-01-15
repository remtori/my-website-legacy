import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '~/libs/firebase-wrap/storage';
import * as marked from 'marked';
import highlight from '~/libs/highlight.js';
import { RootState } from '~/store';
import { signIn, signOut } from '~/libs/firebase-wrap/auth';

import ggIcon from '~/assets/brands/google.svg';
import styles from './styles.scss';

marked.setOptions({
	gfm: true,
	highlight,
	smartLists: true,
	smartypants: true,
});

console.log(uploadFile);
console.log(marked);

export default function Editor()
{
	const dispatch = useDispatch();
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
		<div>
			Editor
			{!user.isAdmin && <div>:( Too bad you not an admin.</div>}
			<button onClick={signOut}>Sign out</button>
		</div>
	);
}
