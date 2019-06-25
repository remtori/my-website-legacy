import { h, Component } from 'preact';
import lazyFire from '../../lazyFire';
import { switchMap } from 'rxjs/operators';

import ListComponent from '../ListComponent';
import BlogListItem from './BlogListItem';
import { Observable } from 'rxjs';

import style from './index.scss';

class BlogList extends Component
{
    loadList()
    {
        // const { matches: { tag } } = this.props;

        return (lazyFire()
            .pipe(
                switchMap(({app, database}) => {
                    return database
                        .listVal(
                            app.database().ref('/blog/list/'),
                        );
                }),
            )
        )  as Observable<Blog[]>;
    }

    render()
    {
        return (
            <ListComponent<Blog>
                listStyle={style.listStyle}
                loadList={this.loadList}
                renderListItem={BlogListItem}
            />
        );
    }
}

export default BlogList;
