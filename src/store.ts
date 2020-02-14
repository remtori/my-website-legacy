import { createContext } from 'preact';
import createStore, { Store } from 'unistore';

export const storeCtx = createContext<Store<StoreState>>(null as any);
export { init as createStore };

const SAVE: Array<keyof StoreState> = ['lang', 'auth'];

export interface StoreState {
	auth: null | User;
	lang: string;
	url: string;
}

function init(initialState: Partial<StoreState>) {
	const savedState = getSavedState();
	const state = { ...initialState, ...savedState };
	const store = createStore<StoreState>(state);
	store.subscribe(saveState);
	return store;
}

let prevSaved = '';
function saveState(state: StoreState) {
	const saved: any = {};
	for (const key of SAVE) saved[key] = state[key];

	const strSaved = JSON.stringify(saved);
	if (strSaved === prevSaved) return;

	localStorage.setItem('state', strSaved);
	prevSaved = strSaved;

	if (process.env.NODE_ENV === 'development') {
		console.log(`Saving state:`);
		console.log(saved);
	}
}

function getSavedState() {
	let state;
	try {
		state = JSON.parse(localStorage.getItem('state')!);
	}
	// tslint:disable-next-line: no-empty
	catch (e) { }

	return state || {};
}
