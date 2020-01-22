import createStore from 'unistore';

const localState = 'localStorage' in window && localStorage.getItem('state');
const defaultState = { auth: null, blogs: {} };

export interface StoreState
{
	auth: null | User;
	blogs: { [key: string]: Blog };
}

const store = createStore<StoreState>(localState ? JSON.parse(localState) : defaultState);

export default store;
