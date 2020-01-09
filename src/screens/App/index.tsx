import { h } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Header from '../Header';
import Footer from '../Footer';
import JSXImage from '~/components/JSXImage';

import styles from './styles.scss';

const Home        = () => import(/* webpackChunkName: "home" */    '../Home').then(m => m.default);
const Editor      = () => import(/* webpackChunkName: "admin" */   '../Editor').then(m => m.default);
const Blog        = () => import(/* webpackChunkName: "contents" */'../Blogs/Blog').then(m => m.default);
const BlogList    = () => import(/* webpackChunkName: "contents" */'../Blogs/BlogList').then(m => m.default);
const Project     = () => import(/* webpackChunkName: "contents" */'../Projects/Project').then(m => m.default);
const ProjectList = () => import(/* webpackChunkName: "contents" */'../Projects/ProjectList').then(m => m.default);

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
						<AsyncRoute path='/'             getComponent={Home} />
						<AsyncRoute path='/blogs/:id'    getComponent={Blog} />
						<AsyncRoute path='/blogs'        getComponent={BlogList} exact={true} />
						<AsyncRoute path='/projects/:id' getComponent={Project} />
						<AsyncRoute path='/projects'     getComponent={ProjectList} exact={true} />
						<AsyncRoute path='/editor'       getComponent={Editor} />
					</Router>
				</div>
			</div>
			<Footer />
		</div>
	);
}
