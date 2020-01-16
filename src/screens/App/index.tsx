import { h, Component } from 'preact';
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
const Projects    = () => import(/* webpackChunkName: "contents" */'../Blogs/Projects').then(m => m.default);
const Editor      = () => import(/* webpackChunkName: "admin" */   '../Editor').then(m => m.default);
const BlogEditor  = () => import(/* webpackChunkName: "admin" */   '../Editor/BlogEditor').then(m => m.default);

export default class App extends Component
{
	componentDidMount()
	{
		import(/* webpackChunkName: "auth" */ '~/libs/firebase-wrap/auth');
	}

	render()
	{
		return (
			<div class={styles.root}>
				<Header />
				<div class={styles.wrapper}>
					<ELink href='https://imgur.com/a/8GJSDJA'>
						<WallPaper />
					</ELink>
					<div class={styles.container}>
						<Router>
							<AsyncRoute path='/'             getComponent={Home}              />
							<AsyncRoute path='/blogs'        getComponent={Blogs}       exact />
							<AsyncRoute path='/projects'     getComponent={Projects}    exact />
							<AsyncRoute path='/contents/:id' getComponent={BlogContent}       />
							<AsyncRoute path='/editor/:id'   getComponent={BlogEditor}        />
							<AsyncRoute path='/editor'       getComponent={Editor}      exact />
							<Redirect path='/contents' to='/blogs' />
							<Route default component={Error404} />
						</Router>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
