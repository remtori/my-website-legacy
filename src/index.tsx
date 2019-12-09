import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import './styles/global.scss';

const root = document.getElementById('root') as HTMLElement;
function init() {
    const App = require('./components/App').default;
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        root,
    );
}

if (module.hot) {
    module.hot.accept('./components/App', () => requestAnimationFrame(init));
}

init();
