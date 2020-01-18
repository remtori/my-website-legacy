
const Home        = () => import(/* webpackChunkName: "home" */    './Home').then(m => m.default);
const Blogs       = () => import(/* webpackChunkName: "contents" */'./Blogs').then(m => m.default);
const BlogContent = () => import(/* webpackChunkName: "contents" */'./Blogs/Blog').then(m => m.default);
const Projects    = () => import(/* webpackChunkName: "contents" */'./Blogs/Projects').then(m => m.default);
const Editor      = () => import(/* webpackChunkName: "admin" */   './Editor').then(m => m.default);
const BlogEditor  = () => import(/* webpackChunkName: "admin" */   './Editor/BlogEditor').then(m => m.default);

export const routes = [
	{
		path: '/',
		page: Home,
	},
	{
		path: '/blogs',
		page: Blogs,
	},
	{
		path: '/contents/:id',
		page: BlogContent,
	},
	{
		path: '/editor',
		page: Editor,
	},
	{
		path: '/editor/:id',
		page: BlogEditor,
	},
];
