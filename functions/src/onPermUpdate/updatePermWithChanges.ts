import * as admin from 'firebase-admin';

interface PermLevel {
	[email: string]: number;
}

interface PermObj
{
	level?: PermLevel;
}

export default async function updatePermWithChanges(before: PermObj = {}, after: PermObj = {}): Promise<void>
{
	const auth = admin.auth();
	const needUpdate = diff(before.level, after.level);
	const levelMap = after.level || {};

	for (const email of needUpdate)
	{
		try
		{
			const level = levelMap[email] || 0;
			const user = await auth.getUserByEmail(email);
			await auth.setCustomUserClaims(user.uid, { level });
			console.log(`${email} with uid "${user.uid}" is now level: ${level}`);
		}
		catch(e)
		{
			console.log(e);
		}
	}
}

function diff(before: PermLevel = {}, after: PermLevel = {}): string[]
{
	const needUpdate: string[] = [];

	const kBefore = Object.keys(before);
	const kAfter = Object.keys(after);

	needUpdate.push(...kBefore.filter(k => kAfter.indexOf(k) === -1));
	needUpdate.push(
		...kAfter.filter(
			k => kBefore.indexOf(k) === -1 || before[k] !== after[k]
		)
	);

	return needUpdate;
}
