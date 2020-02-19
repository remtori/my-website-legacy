import { h } from 'preact';
import { route } from 'preact-router';
import Icon, { icons } from '../Icon';
import { LoadingDot } from '../placeholders';
import { signIn, signOut } from '~/lib/firebase';
import useStore from '~/hooks/useStore';

import styles from './styles.m.scss';

export default function Editor(props: { forward?: string, signingIn?: string }) {

	const { forward, signingIn } = props;
	const store = useStore([ 'auth' ]);
	const level = store.state.auth?.level || 0;

	if (forward && level > 0) route(forward);

	function doSignIn() {
		route(`/admin?signingIn=true&forward=${forward || '/admin'}`);
		signIn();
	}

	if (signingIn === 'true') {
		return (
			<div>
				Signing in
				<LoadingDot />
			</div>
		);
	}

	if (level === 0) {
		return (
			<div>
				<div class='text'>
					<span>Hey, welcome random stranger.</span><br />
					<span>You aren't suppose to be here</span><br />
					<span>BUT if you wanna continue you need to login first.</span><br />
				</div>
				<button class={styles.loginBtn} onClick={doSignIn}>
					<Icon class={styles.logo} icon={icons.faGithub} />
					<span>Sign in with Github</span>
				</button>
			</div>
		);
	}

	return (
		<div class='text'>
			{
				level === 0
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
