import { makeQuery } from '~/utils/dbQuery';

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
			return makeQuery({
				startAfter: list.length > 0 ? list[list.length - 1].key : undefined,
				tag: blogTag,
			}).then(l =>
			{
				l.length === 0
				? hasMore = false
				: list.push(...l);

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
