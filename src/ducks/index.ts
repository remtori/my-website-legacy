import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth';
import blogs from './blogs';

let composeEnhancers = compose;
if (process.env.NODE_ENV !== 'production')
{
	composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const rootReducer = {
	auth, blogs,
};

type RRO = typeof rootReducer;
export type RootState = { [P in keyof RRO]: ReturnType<RRO[P]> };

const store = createStore(
	combineReducers(rootReducer),
	composeEnhancers(applyMiddleware(thunk)),
);

if (process.env.NODE_ENV !== 'production') (window as any).store = store;
export default store;
