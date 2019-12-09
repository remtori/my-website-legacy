import { Reducer } from 'redux';

import {
    USER_AUTH_ACTION,
    USER_SIGN_IN, 
    USER_SIGN_OUT, 
    USER_AUTH_ERROR,
    USER_SIGN_IN_WITH_GOOGLE,
} from '../actions/user';

const user: Reducer< User | object, USER_AUTH_ACTION> = (
    state = {},
    action
) => {
    switch (action.type) {
        case USER_SIGN_IN:
        case USER_SIGN_IN_WITH_GOOGLE:
            return action.payload.user;

        case USER_SIGN_OUT:
        case USER_AUTH_ERROR:
            return {};

        default:
            return state;
    }
}

export default user;
