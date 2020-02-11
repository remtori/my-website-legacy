import { useCallback } from 'preact/hooks';
import { signIn, signOut } from '~/lib/firebase';
import useStore from './useStore';

export default function useAuth() {
	const store = useStore([]);

	const signInFn = useCallback(() => {
		signIn().then(user => store.update({ auth: user }));
	}, []);

	// auth object is nullify via an listener in ~/components/App

	return { signIn: signInFn, signOut };
}
