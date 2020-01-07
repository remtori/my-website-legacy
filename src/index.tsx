import { h, render, hydrate, options } from 'preact';
import App from './screens/App';
import './styles.scss';

render(<App />, document.body);

if (process.env.NODE_ENV === 'development')
{
	// tslint:disable-next-line: no-var-requires
	require('preact/debug');
}

const IDLE_TIMEOUT = 50;
export default () => new Promise(resolve =>
{
	let timer = 0;
	options.debounceRendering = commit =>
	{
		clearTimeout(timer);
		timer = setTimeout(resolve, IDLE_TIMEOUT);
		commit();
	};

	render(<App/>, document.body);
});
