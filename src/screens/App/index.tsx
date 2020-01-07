import { h } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Header from '../../screens/Header';
import Home from '../../screens/Home';
import { Blog, BlogList } from '../../screens/Blogs';
import { Project, ProjectList } from '../Projects';
import JSXImage from '~/components/JSXImage';

import styles from './styles.scss';
import Footer from '../../screens/Footer';

const Editor = () => import(/* webpackChunkName: "admin" */'../Editor').then(m => m.default);

export default function App()
{
	return (
		<div class={styles.root}>
			<Header />
			<div class={styles.wrapper}>
				<JSXImage
					class={styles.headerImg}
					src='https://i.imgur.com/wr9yiYE.png'
				/>
				<div class={styles.container}>
					<Router>
						<AsyncRoute
							path='/'
							component={Home}
						/>
						<AsyncRoute
							path='/blogs/:id'
							component={Blog}
						/>
						<AsyncRoute
							exact={true}
							path='/blogs'
							component={BlogList}
						/>
						<AsyncRoute
							path='/projects/:id'
							component={Project}
						/>
						<AsyncRoute
							exact={true}
							path='/projects'
							component={ProjectList}
						/>
						<AsyncRoute
							path='/editor'
							getComponent={Editor}
						/>
					</Router>
				</div>
			</div>
			<Footer />
		</div>
	);
}
