import { h } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Header from './Header';
import Footer from './Footer';
import JSXImage from '~/components/JSXImage';
import Redirect from '~/components/Redirect';

import styles from './styles.scss';

const Home        = () => import(/* webpackChunkName: "home" */    '../Home').then(m => m.default);
const Editor      = () => import(/* webpackChunkName: "admin" */   '../Editor').then(m => m.default);
const Blogs       = () => import(/* webpackChunkName: "contents" */'../Blogs').then(m => m.default);
const BlogContent = () => import(/* webpackChunkName: "contents" */'../Blogs/Blog').then(m => m.default);
const Projects    = () => import(/* webpackChunkName: "contents" */'../Blogs/Projects').then(m => m.default);

export default function App()
{
	return (
		<div class={styles.root}>
			<Header />
			<div class={styles.wrapper}>
				<JSXImage
					class={styles.headerImg}
					src='/assets/images/sunset-you.jpg'
					width={1024}
					height={240}
				/>
				<div class={styles.container}>
					<Router>
						<AsyncRoute path='/'             getComponent={Home}     />
						<AsyncRoute path='/blogs'        getComponent={Blogs}    />
						<AsyncRoute path='/projects'     getComponent={Projects} />
						<AsyncRoute path='/contents/:id' getComponent={BlogContent} />
						<AsyncRoute path='/editor'       getComponent={Editor}   />
						<Redirect path='/contents' to='/blogs' />
					</Router>
				</div>
			</div>
			<Footer />
		</div>
	);
}
