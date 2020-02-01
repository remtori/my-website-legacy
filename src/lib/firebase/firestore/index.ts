import { makeQuery, getBlog, FSQuery } from './dbQuery';

const CACHE: { [key: string]: Blog } = {};

function updateContent(newBlogs: Blog[]) {
	newBlogs.forEach(blog => CACHE[blog.key] = blog);
}

export function getData(id: string): Promise<Blog> {

	const cached = CACHE[id];
	if (cached) return Promise.resolve(cached);

	return getBlog(id).then(blog => {
		updateContent([ blog ]);
		return blog;
	});
}

export interface Resource {
	getNextData(): Promise<Blog[]>;
	reset(tag?: string): void;
	hasMore(): boolean;
}

export function createResources(tag?: string): Resource {
	let list: Blog[] = [];
	let blogTag: string | undefined = tag;
	let hasMore = true;

	return {
		hasMore: () => hasMore,
		getNextData() {
			const startAfter = list.length > 0 ? list[list.length - 1].timestamp : undefined;
			const query = {
				startAfter,
				tag: blogTag
			};

			const res = makeOfflineQuery(query);
			if (res.length >= 10 || !navigator.onLine) {
				list.push(...res);
				return Promise.resolve(list);
			}

			return makeQuery(query).then(l => {
				updateContent(l);
				l.length === 0 ? hasMore = false : list.push(...l);
				return list;
			});
		},
		reset(newTag?: string) {
			list = [];
			blogTag = newTag;
		}
	};
}

function makeOfflineQuery({ startAfter, tag }: FSQuery) {

	const stamp = startAfter ? startAfter : new Date().toISOString;

	const result = [];
	for (const key in CACHE) {
		if (tag == null || CACHE[key].tags.indexOf(tag) >= 0) {
			result.push(CACHE[key]);
		}
	}

	result.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
	for (let i = 0; i < result.length; i++) {
		if (stamp > result[i].timestamp) return result.slice(i);
	}

	return [];
}
