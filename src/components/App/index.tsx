import { h, Component } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
// import { Provider } from 'preact-redux';

import Header from '../Header';
import Home from '../Home';
import LoadingAnimation from '../LoadingAnimation';

import styles from './index.scss';

class App extends Component
{
    public handleRoute({ url }: { url: string})
    {
        console.log(url);
    }

    public render()
    {
        return (
            // <Provider>
                <div class={styles.wrapper}>
                    <Header />
                    <div class={styles.container}>
                        <Router onChange={this.handleRoute}>
                            <Home path="/" />
                            <AsyncRoute
                                path="/bloglist"
                                loading={() => <LoadingAnimation/>}
                                getComponent={() => import('../BlogList').then((m) => m.default)}
                            />
                            <AsyncRoute
                                path="/projects"
                                loading={() => <LoadingAnimation/>}
                                getComponent={() => import('../Projects').then((m) => m.default)}
                            />
                            <AsyncRoute
                                path="/blog"
                                loading={() => <LoadingAnimation/>}
                                getComponent={() => import('../BlogItem').then((m) => m.default)}
                            />
                        </Router>
                    </div>
                </div>
            // </Provider>
        );
    }
}

export default App;
