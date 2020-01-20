import { FSQuery } from './dbQuery';
import store from '~/ducks';

export default function runQuery({ startAfter, tag }: FSQuery)
{
	const list = store.getState().blogs;
	const stamp = startAfter ? startAfter : new Date().toISOString;

	const result = [];
	for (const key in list)
	{
		if (tag == null || list[key].tags.indexOf(tag) >= 0)
		{
			result.push(list[key]);
		}
	}

	result.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
	for (let i = 0; i < result.length; i++)
	{
		if (stamp > result[i].timestamp) return result.slice(i);
	}

	return [];
}
