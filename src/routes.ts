import { makeQuery } from './libs/firebase/firestore/dbQuery';

export default async function()
{
	const blogs = await makeQuery();
	return ([
		'/',
		'/about',
		'/editor',
		'/blogs',
	]).concat(blogs.map(b => `/blogs/${b.key}`));
}
