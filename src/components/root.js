import { h, Component } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';

import Header from './header';
import Home from './home';
import Loading from './loading';
import Background from './background';

export default class Root extends Component {

    handleRoute({ url }) {
        console.log(url);
    }

    render() {
        return (
            <div>
                <Background/>                
                <div id="content-wrapper">
                    <Header />
                    <div id="content">                        
                        <Router onChange={this.handleRoute}>
                            <Home path="/"/>
                            <AsyncRoute 
                                path="/work"
                                loading={()=><Loading/>}
                                getComponent={()=>import('./work').then(m=>m.default)}
                            />
                            <AsyncRoute
                                path="/blog"
                                loading={()=><Loading/>}
                                getComponent={()=>import('./item').then(m=>m.default)}
                            />
                            <AsyncRoute
                                path="/bloglist"
                                loading={()=><Loading/>}
                                getComponent={()=>import('./item/list').then(m=>m.default)}
                            />
                            <AsyncRoute 
                                path="/blogedit"
                                loading={()=><Loading/>}
                                getComponent={()=>import('./item/edit').then(m=>m.default)}
                            />
                        </Router>                        
                    </div>
                </div>
            </div>
        );
    }
}