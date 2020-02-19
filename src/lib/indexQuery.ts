import FlexSearch, { SearchOptions } from 'flexsearch';
import indexPath from '../../site-content/generated/index.json';

const CACHE: { data?: PageContent[] } = {};
const flexIndex = FlexSearch.create<PageContent>({
	async: true,
	doc: {
		id: 'id',
		field: [
			'title',
			'description',
			'tags'
		]
	}
});

(window as any).db = { CACHE, index: flexIndex };

export default function query(props: QueryProps): Promise<PageContent[]> {

	if (CACHE.data) return internalQuery(props);

	return fetch(indexPath)
		.then(r => r.json())
		.then(r => {
			CACHE.data = r;
			flexIndex.add(r.documents);
			return internalQuery(props);
		});
}

interface QueryProps {
	tag?: string;
	search?: SearchOptions & { query: string };
}

function internalQuery(props: QueryProps): Promise<PageContent[]> {

	if (props.tag) {
		return flexIndex.search({
			query: props.tag,
			field: 'tags'
		});
	}

	if (props.search) {
		return flexIndex.search(props.search);
	}

	return Promise.resolve(CACHE?.data || []);
}
