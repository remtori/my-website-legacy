import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

type HookComponent = () => h.JSX.Element;

export default function AsyncEditorScreen()
{
	const [ Comp, setComp ] = useState<HookComponent>(null as unknown as HookComponent);

	useEffect(() =>
	{
		import(/* webpackChunkName: "admin" */'./Editor').then(m => setComp(m.default));
	}, []);

	return typeof Comp === 'function' ? <Comp /> : <div>Loading...</div>;
}
