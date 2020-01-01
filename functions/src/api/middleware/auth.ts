import * as express from 'express';
import * as admin from 'firebase-admin';
import { PERMISSION_DENIED } from '../responses';

export default async function auth(req: express.Request, res: express.Response, next: () => void)
{
	req.isAdmin = false;
	req.isStaff = false;

	if (typeof req.body === "object" &&
		typeof req.body.idToken !== "string"
	)
	{
		try
		{
			const claims = await admin.auth().verifyIdToken(req.body.idToken);
			req.isAdmin = claims.admin === true;
			req.isStaff = claims.staff === true;
		}
		catch (e) {}
	}

	next();
}

function genIsKey(key: string)
{
	return function(req: express.Request, res: express.Response, next: () => void)
	{
		if ((req as any)[key] === true)
		{
			next();
		}
		else
		{
			res.json(PERMISSION_DENIED);
			res.end();
		}
	}
}

export const isAdmin = [ auth, genIsKey('isAdmin') ];
export const isStaff = [ auth, genIsKey('isStaff') ];

