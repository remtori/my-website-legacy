import React from 'react';
import {
    Container
} from 'reactstrap';
import { BrowserRouter, Route } from 'react-router-dom';

import MainNav from './Nav';
import Footer from './Footer';
import LandingPage from '../LandingPage';
import { BlogView, BlogList, BlogUpdate } from '../Blogs';
import { ProjectView, ProjectList } from '../Projects';
import styles from './styles.scss';

export default function App() {
    return (
        <BrowserRouter>
            <MainNav />
            <Container fluid className={styles.container}>
                <Route path="/" exact component={LandingPage} />
                <Route path="/blogs" exact component={BlogList} />
                <Route path="/blogs/view" exact component={BlogView} />
                <Route path="/blogs/update" exact component={BlogUpdate} />
                <Route path="/projects" exact component={ProjectList} />
                <Route path="/projects/view" exact component={ProjectView} />
            </Container>
            <Footer />
        </BrowserRouter>
    );
}
