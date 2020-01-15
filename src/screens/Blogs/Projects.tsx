import { h } from 'preact';
import BlogList from './BlogList';

export default function Projects()
{
	return <BlogList matches={{ tag: 'project' }}  />;
}
