import { h, render } from 'preact';
import './style/index.less';

let root;
function init() {
	let Root = require('./components/root').default;
	root = render(<Root/>, document.body, root);
}

if ('serviceWorker' in navigator) {
	window.addEventListener('load', _ => {
		navigator.serviceWorker.register('/sw.js').then(registration => {
			console.log('SW registered: ', registration);
		}).catch(registrationError => {
			console.log('SW registration failed: ', registrationError);
		});
	});
}

// in development, set up HMR:
if (module.hot) {
	require('preact/devtools');
	module.hot.accept('./components/root', _ => requestAnimationFrame(init) );
}

init();
