export const UPDATE_CONTENT = 'UPDATE_CONTENT';

export interface BlogState
{
	[key: string]: Blog;
}

export interface BlogAction
{
	type: typeof UPDATE_CONTENT;
	blogs: Blog[];
}

export default function reducers(
	state: BlogState = {},
	action: BlogAction,
): BlogState
{
	switch (action.type)
	{
		case UPDATE_CONTENT:
		{
			const s = Object.assign({}, state);
			action.blogs.forEach(blog => s[blog.key] = blog);
			return s;
		}

		default:
			return state;
	}
}
