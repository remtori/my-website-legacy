import { h, Component, Fragment } from 'preact';
import { Router, Route, RouterOnChangeArgs } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import { Provider } from 'unistore/preact';
import { createStore, storeCtx } from '~/store';
import { lazily } from '~/lib/lazily';

import Header from './Header';
import Footer from './Footer';
import ELink from '../ExternalLink';
import WallPaper from './WallPaper';
import Blogs from '../Blogs';
import Page from '../Page';

import styles from './styles.scss';

const Admin = () => import(/* webpackChunkName: "admin" */ '../Admin').then(m => m.default);
const Editor = () => import(/* webpackChunkName: "admin" */ '../Admin/Editor').then(m => m.default);

export interface AppProps {
	url?: string;
	isSSR?: boolean;
}

export default class App extends Component<AppProps>
{
	store = createStore({
		url: this.props.url || location.pathname,
		lang: 'en'
	});

	componentDidMount() {

		if (process.env.NODE_ENV === 'development') (window as any).store = this.store;

		lazily(() => import(/* webpackChunkName: "admin" */ '~/lib/firebase/auth')
			.then(m => m.auth.onAuthStateChanged(
					u => u
					? Promise.all([u.getIdTokenResult(), m.auth.getRedirectResult()])
						.then(([r, rr]) => ({
							displayName: m.auth.currentUser!.displayName,
							photoURL: m.auth.currentUser!.photoURL,
							email: m.auth.currentUser!.email,
							uid: m.auth.currentUser!.uid,
							isStaff: r?.claims.staff || r?.claims.admin || false,
							isAdmin: r?.claims.admin || false,
							credential: rr.credential
						}) as User)
						.then(user => this.store.setState({ auth: user }))

					: this.store.setState({ auth: null })
				)
			)
		);
	}

	handleUrlChange = ({ url }: RouterOnChangeArgs) => {
		const prev = this.store.getState().url || '/';
		if (url !== prev) {
			this.store.setState({
				...this.store.getState(),
				url
			});

			// if (typeof ga === 'function') {
			// 	ga('send', 'pageview', url);
			// }
		}
	}

	render() {
		return (
			<Provider store={this.store}>
				<storeCtx.Provider value={this.store}>
					<Header />
					<div class={styles.wrapper}>
						<ELink href='https://imgur.com/a/8GJSDJA'>
							<WallPaper />
						</ELink>
						<div class={styles.container}>
							<Router onChange={this.handleUrlChange} url={this.props.url}>
								<AsyncRoute path='/admin/editor/:id' getComponent={Editor} exact />
								<AsyncRoute path='/admin' getComponent={Admin} exact />
								<Route path='/blogs' component={Blogs} />
								<Route default component={Page} />
							</Router>
						</div>
					</div>
					<Footer />
				</storeCtx.Provider>
			</Provider>
		);
	}
}
