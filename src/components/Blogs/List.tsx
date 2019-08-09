import React from 'react';
import { parse } from 'query-string';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faTags } from '@fortawesome/free-solid-svg-icons';

import Loader from '../common/Loader';
import LoadImage from '../common/LoadImage';
import { getDocumentList } from '../../firebase';

export default function BlogList({ location: { search } }: RouteComponentProps) {

    const query = parse(search);

    function loadData(): Promise<Blog[]> {

        if (typeof query.tag === "string") {
            return getDocumentList('blogs', query.tag);
        }

        return getDocumentList('blogs');
    }

    function render(data: Blog[]) {
        return (
            <>
                {
                    data.map(blog => (
                        <Card key={blog.key} className="mb-3 bg-dark">
                            <CardBody className="p-2">
                                <Row>
                                    <Col sm="auto">
                                        <Link to={`/blogs/view?id=${blog.key}`}>
                                            <LoadImage {...blog.previewImg} />
                                        </Link>
                                    </Col>
                                    <Col>
                                        <h3 className="text-center">
                                            <Link to={`/blogs/view?id=${blog.key}`}>
                                                {blog.title}
                                            </Link>
                                        </h3>
                                        <p>{blog.description}</p>
                                    </Col>
                                </Row>
                                <CardFooter>
                                    <Row>
                                        <Col>
                                            <FontAwesomeIcon icon={faUser} />
                                            <span className="px-2">{blog.author}</span>
                                        </Col>
                                        <Col>
                                        <FontAwesomeIcon icon={faClock} />
                                            <span className="px-2">
                                                { new Date(blog.timeAdded).toLocaleString('vn-VN') }
                                            </span>
                                        </Col>                                    
                                        <Col>
                                            <FontAwesomeIcon icon={faTags} />
                                            {
                                                blog.tags.map(tag => (
                                                    <Link className="ml-2" to={`/blogs?tag=${tag}`} key={`${blog.key}/${tag}`} >
                                                        {tag}
                                                    </Link>
                                                ))
                                            }
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </CardBody>
                        </Card>
                    ))
                }
            </>
        );
    }

    return (
        <Loader<Blog[]>
            loadData={loadData}
            render={render}
        />
    );
}