import { h } from 'preact';

export default function Blog({ id }: { id: string })
{
	return (
		<div>A Blog with id="{id}"</div>
	);
}
