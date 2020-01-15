import { ThunkAction } from 'redux-thunk';

export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_SIGN_OUT = 'USER_SIGN_OUT';

export type AuthState = { user: User | null };
export interface AuthAction
{
	type: typeof USER_SIGN_IN | typeof USER_SIGN_OUT;
	user?: User | null;
}

export default function reducers(
	state: AuthState = { user: null }, action: AuthAction,
): AuthState
{
	switch (action.type)
	{
		case USER_SIGN_IN:
			return { user: action.user! };

		case USER_SIGN_OUT:
			return { user: null };

		default:
			return state;
	}
}

// type ThunkActionCreator = () => ThunkAction<void, AuthState, null, AuthAction>;

// export const signIn: ThunkActionCreator = () => dispatch =>
// 	import(/* webpackChunkName: "admin" */ '../libs/firebase-wrap/auth')
// 		.then(m => m.signIn())
// 		.then(user => dispatch({ type: USER_SIGN_IN, user }));

// export const signOut: ThunkActionCreator = () => dispatch =>
// 	import(/* webpackChunkName: "admin" */ '../libs/firebase-wrap/auth')
// 	.then(m => m.signOut())
// 	.then(() => dispatch({ type: USER_SIGN_OUT }));
