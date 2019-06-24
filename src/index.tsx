import { h, render } from 'preact';
import './assets/styles/global.scss';

const root = document.getElementById('root') as HTMLElement;
function init() {
    const App = require('./components/App').default;
    render(
        <App/>,
        root,
    );
}

if (module.hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug');
    module.hot.accept('./components/App', () => requestAnimationFrame(init));
}

init();
