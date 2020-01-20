import { makeQuery, getBlog } from './dbQuery';
import { UPDATE_CONTENT } from '~/ducks/blogs';
import runQuery from './offlineQuery';
import store from '~/ducks';

export function getData(id: string)
{
	const cached = store.getState().blogs[id];
	if (cached) return cached;

	return getBlog(id).then(blog =>
	{
		store.dispatch({ type: UPDATE_CONTENT, blogs: [ blog ] });
		return blog;
	});
}

export interface Resource
{
	getNextData(): Promise<Blog[]>;
	reset(tag?: string): void;
	hasMore(): boolean;
}

export function createDataGetter(tag?: string): Resource
{
	let list: Blog[] = [];
	let blogTag: string | undefined = tag;
	let hasMore = true;

	return {
		hasMore: () => hasMore,
		getNextData()
		{
			const startAfter = list.length > 0 ? list[list.length - 1].timestamp : undefined;
			const query = {
				startAfter,
				tag: blogTag,
			};

			const res = runQuery(query);
			if (res.length >= 10 || !navigator.onLine)
			{
				list.push(...res);
				return Promise.resolve(list);
			}

			return makeQuery(query).then(l =>
			{
				store.dispatch({ type: UPDATE_CONTENT, blogs: l });

				l.length === 0 ? hasMore = false : list.push(...l);
				return list;
			});
		},
		reset(newTag?: string)
		{
			list = [];
			blogTag = newTag;
		},
	};
}
