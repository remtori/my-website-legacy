import { h } from 'preact';
import { route } from 'preact-router';
import Icon, { icons } from '../Icon';
import useStore from '~/hooks/useStore';

import styles from './styles.scss';
import useAuth from '~/hooks/useAuth';

export default function Editor() {

	const store = useStore([ 'auth' ]);
	const { signIn, signOut } = useAuth();

	const isAuth = !!store.state.auth;
	const isStaff = store.state.auth?.isStaff || false;

	if (!isAuth) {
		return (
			<div>
				<div class='text'>
					<span>Hey, welcome random stranger.</span><br />
					<span>You aren't suppose to be here</span><br />
					<span>BUT if you wanna continue you need to login first.</span><br />
				</div>
				<button class={styles.loginBtn} onClick={signIn}>
					<Icon class={styles.logo} icon={icons.faGithub} />
					<span>Sign in with Github</span>
				</button>
			</div>
		);
	}

	return (
		<div class='text'>
			{
				!isStaff
					? <div>:( Too bad you do not have permission to view this</div>
					: (
						<div>
							<button onClick={() => route(`/admin/editor`)}>
								Create new a Blog
					</button>
						</div>
					)
			}
			<button onClick={signOut}>Sign out</button>
		</div>
	);
}
