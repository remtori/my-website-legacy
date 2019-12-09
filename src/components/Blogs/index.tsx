import React from 'react';
import marked from 'marked';
import { parse } from 'query-string';
import { Redirect. RouteComponentProps } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

import Loader from '../common/Loader';
import { getDocument } from '../../firebase';

export { default as BlogList } from './List';
export { default as BlogUpdate } from './Update';

export function BlogView({ location: { search } }: RouteComponentProps) {

    const query = parse(search);

    function loadData(): Promise<string> {
        if (typeof query.id === "string") {
            return getDocument('blogs', query.id)
                .then(doc => doc.data() as Blog)
                .then(blog => typeof blog !== "undefined"
                    ? fetch(blog.contentUrl).then(r => r.text())
                    : 'Blog unavailable~'
                )                
                .then(t => marked(t));
        }

        return Promise.resolve('Undefined behaviour');
    }

    function render(data: string) {

        return (
            <Card className="bg-dark">
                <CardBody dangerouslySetInnerHTML={{ __html: data }} />                    
            </Card>
        );
    }

    return typeof query.id !== "string"
    ? <Redirect to="/blogs" />
    : (
        <Loader<string> 
            loadData={loadData}
            render={render}
        />
    );
}
