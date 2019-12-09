import { h, Component } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';

import Home from '../Home';
import Navigator from '../Navigator';
import LoadingAnimation from '../LoadingAnimation';

import styles from './index.scss';

class App extends Component
{

    handleRoute({ url }: { url: string})
    {
        console.log(url);
    }

    render()
    {
        return (
            <div class={styles.wrapper}>
                <Navigator />
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
                            getComponent={() => import('../Blog').then((m) => m.default)}
                        />
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;
