import { h, render, hydrate } from 'preact';
import App from './components/App';
import './styles.scss';

function init() {
	const entry = document.getElementById('app') as HTMLDivElement;

	if (process.env.NODE_ENV === 'production') {
		hydrate(<App />, entry);
	}

	if (process.env.NODE_ENV === 'development') {
		entry.innerText = '';
		render(<App />, entry);
		// tslint:disable-next-line: no-var-requires
		require('preact/debug');
	}
}

requestAnimationFrame(init);
