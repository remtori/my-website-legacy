import { useState, useEffect } from 'preact/hooks';
import store from '../store';

export default function useAuth()
{
	const [ isAuth, setIsAuth ] = useState(!!store.getState().auth);
	const [ isStaff, setIsStaff ] = useState(store.getState().auth?.isStaff || false);

	useEffect(() =>
	{
		const remove = store.subscribe(s =>
		{
			if (!!s.auth !== isAuth) setIsAuth(!!s.auth);
			if (s.auth?.isStaff !== isStaff) setIsStaff(s.auth?.isStaff || false);
		});

		return () => remove();
	}, []);

	return [ isAuth, isStaff ];
}
