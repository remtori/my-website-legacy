import { h } from 'preact';
import App from './pages/App';
import store from './store';

type RenderFn = (vNode: preact.ComponentChild) => void;

export { default as getRoutes } from './routes';

export function renderHTML(url: string, render: RenderFn)
{
	return new Promise(resolve =>
	{
		render(<App url={url} />);
		store.subscribe(state => state.FINISH_RENDER === true && resolve());
	});
}
