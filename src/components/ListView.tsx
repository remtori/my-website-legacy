import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { LoadingCircle } from './placeholder';

export interface ListProps<T>
{
	getData: () => Promise<T[]>;
	renderData: (data: T[]) => h.JSX.Element;
}

function renderError(err: string)
{
	return <div>Can not load data :|</div>;
}

export default function ListView<T>({ getData, renderData }: ListProps<T>)
{
	const [ Comp, setComp ] = useState<h.JSX.Element>(<LoadingCircle />);

	useEffect(() =>
	{
		getData()
			.then(d => setComp(renderData(d)))
			.catch(err => setComp(renderError(err)));
	}, []);

	return Comp;
}
