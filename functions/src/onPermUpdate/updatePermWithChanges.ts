import * as admin from 'firebase-admin';

type PermObj = { admin?: string[]; staff?: string[] };

export default async function updatePermWithChanges(before: PermObj = {}, after: PermObj = {}): Promise<void>
{
	const auth = admin.auth();

	for (const role of [ 'admin', 'staff' ] as Array<keyof PermObj>)
	{
		const diffs = diff(before[role], after[role]);

		for (const method of [ 'add', 'remove' ] as Array<keyof DiffResult>)
		{
			for (const email of diffs[method])
			{
				try
				{
					const user = await auth.getUserByEmail(email);
					await auth.setCustomUserClaims(user.uid, { [role]: method === 'add' });
					if (method === 'add')
					{
						console.log(`${email} with uid "${user.uid}" is now a(n) ${role}`);
					}
					else
					{
						console.log(`${email} with uid "${user.uid}" is no longer a(n) ${role}`);
					}
				}
				catch(e)
				{
					console.log(e);
				}
			}
		}
	}
}

type DiffResult = { add: string[]; remove: string[] };
function diff(before: string[] = [], after: string[] = []): DiffResult
{
	const add = after.filter(i => before.indexOf(i) === -1);
	const remove = before.filter(i => after.indexOf(i) === -1);
	return { add, remove };
}
