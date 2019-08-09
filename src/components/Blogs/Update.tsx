import React from 'react';
import { parse } from 'querystring';
import { RouteComponentProps } from 'react-router-dom';
import { Input, Card, CardBody } from 'reactstrap';

import { getBaseDocument, getDocument } from '../../firebase';
import Loader from '../common/Loader';

interface LoaderData extends Array<any> {
    0: Blog;
    1: string;
}

export default function BlogUpdate({ location: { search } }: RouteComponentProps) {

    const query = parse(search);

    function loadData() {
        if (typeof query.id === "string") {
            return getDocument('blogs', query.id)
                .then(d => d.data())
                .then<LoaderData>(blog => typeof blog === "undefined"
                    ? [ getBaseDocument('blogs'), '' ]
                    : Promise.all([
                        blog as Blog,
                        fetch(blog.contentUrl).then(r=>r.text()) 
                    ])
                );
        }

        return Promise.resolve<LoaderData>([
            getBaseDocument('blogs'), ''
        ]);
    }

    function render([ blog, data ]: LoaderData) {
        return <textarea className="form-control">{data}</textarea>
    }

    return (
        <Card>
            <CardBody>
                <Input />
                <Loader<LoaderData> 
                    loadData={loadData}
                    render={render}
                />
            </CardBody>
        </Card>
    );
}