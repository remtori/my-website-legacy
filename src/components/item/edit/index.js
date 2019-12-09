import { h, Component } from 'preact';
import Loading from '../../loading';
import { getDefaultBlog, addBlog, updateBlog, loadBlogById } from '../blogHandlers';

export default class BlogEditor extends Component {

    state = {
        blog: {},
        resolved: false
    }

    componentWillMount() {
        if (this.props.id == null)
            this.setState({ blog: getDefaultBlog() })
        else
            loadBlogById(this.props.id)
                .then(blog => this.setState({ blog, resolved: true }))
                .catch(e => this.setState({resolved: true}))
    }

    render({ id }, { resolved, blog: { key, title, previewImg, description, author, tags, content} }) {
        return !resolved
            ? <Loading />
            : key == null
                ? <BlogIdNotFound id={id}/>
                : (
                    <div>
                        
                    </div>
                );
    }
}