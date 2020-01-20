import { h } from 'preact';
import { render } from 'preact-render-to-string';
import App from './pages/App';

export default () => render(<App isSSR />);
