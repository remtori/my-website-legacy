import { h } from 'preact';

export const BlogIdNotFound = ({ id }) => (
    <h3 style="text-align:center">{ `Can not found blog with id: "${id}"` }</h3>
);