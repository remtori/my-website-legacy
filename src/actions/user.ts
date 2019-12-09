import { Dispatch } from 'redux';

import { signIn as authSignIn, signInWithGoogle as authSignInWithGoogle, signOut as authSignOut } from '../firebase';

export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_SIGN_IN_WITH_GOOGLE = 'USER_SIGN_IN_WITH_GOOGLE';
export const USER_SIGN_OUT = 'USER_SIGN_OUT';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';

export interface USER_AUTH_ACTION {
    type: string;
    payload: {
        user: User;
    }
}

export function signIn(email: string, password: string) {
    return (dispatch: Dispatch) => {
        return authSignIn(email, password).then(user => {
                dispatch({
                    type: USER_SIGN_IN,
                    payload: { user }
                })
            }).catch(() => {
                dispatch({
                    type: USER_AUTH_ERROR
                });
            });
    }
}

export function signInWithGoogle() {
    return (dispatch: Dispatch) => {
        return authSignInWithGoogle().then(userCre => {
            
            const isNewUser = 
                ( userCre.additionalUserInfo 
                && userCre.additionalUserInfo.isNewUser)
                || false;

            dispatch({
                type: USER_SIGN_IN_WITH_GOOGLE,
                payload: {
                    user: {
                        ...userCre.user,
                        isNewUser
                    }
                }
            })
        }).catch(() => {
            dispatch({
                type: USER_AUTH_ERROR
            });
        });
    }
}

export function signOut() {
    return (dispatch: Dispatch) => {
        return authSignOut().finally(() => {
            dispatch({
                type: USER_SIGN_OUT                
            });
        });
    }
}