import { h, Component, Fragment } from 'preact';
import { Router, Route } from 'preact-router';
import AsyncRoute from 'preact-async-route';

import Header from './Header';
import Footer from './Footer';
import Redirect from '~/components/Redirect';
import ELink from '~/components/ExternalLink';
import WallPaper from './WallPaper';
import Error404 from '../Error404';

import styles from './styles.scss';

const Home        = () => import(/* webpackChunkName: "home" */    '../Home').then(m => m.default);
const Blogs       = () => import(/* webpackChunkName: "contents" */'../Blogs').then(m => m.default);
const BlogContent = () => import(/* webpackChunkName: "contents" */'../Blogs/Blog').then(m => m.default);
const Editor      = () => import(/* webpackChunkName: "admin" */   '../Editor').then(m => m.default);
const BlogEditor  = () => import(/* webpackChunkName: "admin" */   '../Editor/BlogEditor').then(m => m.default);

export interface AppProps
{
	url?: string;
	isSSR?: boolean;
}

export default class App extends Component<AppProps>
{
	render()
	{
		return (
			<Fragment>
				<Header />
				<div class={styles.wrapper}>
					<ELink href='https://imgur.com/a/8GJSDJA'>
						<WallPaper />
					</ELink>
					<div class={styles.container}>
						<Router url={this.props.url}>
							<AsyncRoute path='/'                 getComponent={Home}        exact />
							<AsyncRoute path='/blogs'            getComponent={Blogs}       exact />
							<AsyncRoute path='/blogs/:id'        getComponent={BlogContent} exact />
							<AsyncRoute path='/blogs/:id/edit'   getComponent={BlogEditor}  exact />
							<AsyncRoute path='/editor'           getComponent={Editor}      exact />
							<Route default component={Error404} />
						</Router>
					</div>
				</div>
				<Footer />
			</Fragment>
		);
	}
}
