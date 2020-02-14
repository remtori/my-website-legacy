import * as express from 'express';
import * as admin from 'firebase-admin';
import updatePermWithChanges from '../../onPermUpdate/updatePermWithChanges';

const route = express.Router();

route.get('/', async (req: express.Request, res: express.Response) =>
{
	const r = await admin.firestore().collection('utils').doc('permissions').get();
	const data = r.data();
	await updatePermWithChanges({}, data);
	res.json(data);
	res.end();
});

export default route;
