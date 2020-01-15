import { h, render, hydrate, options } from 'preact';
import { Provider } from 'react-redux';
import store from './store';
import App from './screens/App';
import './styles.scss';

const Root = () => <Provider store={store}><App/></Provider>;

render(<Root/>, document.body);

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

	render(<Root/>, document.body);
});
