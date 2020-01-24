import createStore from 'unistore';

const localState = 'localStorage' in window && localStorage.getItem('state');
const defaultState = { auth: null, blogs: {} };

export interface StoreState
{
	auth: null | User;
	blogs: { [key: string]: Blog };
	FINISH_RENDER?: boolean;
}

const store = createStore<StoreState>(localState ? JSON.parse(localState) : defaultState);

store.subscribe((state: StoreState) =>
{
	localStorage.setItem('state', JSON.stringify({
		auth: state.auth,
		blogs: state.blogs,
	}));
});

if (process.env.NODE_ENV !== 'production') (window as any).store = store;
export default store;
