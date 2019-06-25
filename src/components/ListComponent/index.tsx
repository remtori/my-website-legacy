import { h, Component } from 'preact';
import { Observable } from 'rxjs';

import LoadingAnimation from '../LoadingAnimation';

interface IListProps<T> {
    renderListItem: (item: T) => JSX.Element;
    loadList: () => Observable<T[]>;
    listStyle?: string;
}

interface IListState<T> {
    list: T[];
}

class ListComponent<T> extends Component<IListProps<T>, IListState<T>>
{
    componentWillMount()
    {
        const { loadList } = this.props;

        loadList().subscribe(list => {
            this.setState({ list });
        });
    }

    render()
    {
        const { list } = this.state;
        const { renderListItem, listStyle } = this.props;

        if (list == null)
        {
            return <LoadingAnimation />;
        }
        else if (list.length === 0)
        {
            return <div>Wow, such empty</div>;
        }

        return (
            <div class={listStyle}>
                {list.map((item: T) => renderListItem(item))}
            </div>
        );
    }
}

export default ListComponent;
