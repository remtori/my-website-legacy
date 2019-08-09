import * as React from 'react';
import { render } from 'react-dom';

import './assets/styles/global.scss';

const root = document.getElementById('root') as HTMLElement;
function init() {
    const App = require('./components/App').default;
    render(
        <App />,
        root,
    );
}

if (module.hot) {
    module.hot.accept('./components/App', () => requestAnimationFrame(init));
}

init();
