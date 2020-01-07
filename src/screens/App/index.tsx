import { h } from 'preact';
import { Router, Route } from 'preact-router';

import Header from '../../screens/Header';
import Home from '../../screens/Home';
import { Blog, BlogList } from '../../screens/Blogs';
import { Project, ProjectList } from '../Projects';
import Editor from '../../screens/Editor';
import JSXImage from '~/components/JSXImage';

import styles from './styles.scss';
import Footer from '../../screens/Footer';
import { LoadingCircle, NotFound } from '~/components/placeholder';

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
						<Route
							path='/'
							component={Home}
						/>
						<Route
							path='/blogs/:id'
							component={Blog}
						/>
						<Route
							exact={true}
							path='/blogs'
							component={BlogList}
						/>
						<Route
							path='/projects/:id'
							component={Project}
						/>
						<Route
							exact={true}
							path='/projects'
							component={ProjectList}
						/>
						<Route
							path='/editor'
							component={Editor}
						/>
					</Router>
				</div>
			</div>
			<Footer />
		</div>
	);
}
