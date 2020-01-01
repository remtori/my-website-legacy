import * as express from 'express';
import * as admin from 'firebase-admin';
import { BAD_REQUEST, INVALID_EMAIL, SUCCESS } from '../responses';
import { isAdmin } from '../middleware/auth';

const route = express.Router();

route.post('/', isAdmin, async (req: express.Request, res: express.Response) =>
{
	const candidateEmail = req.body.candidateEmail;

	if (typeof candidateEmail !== "string")
	{
		res.json(BAD_REQUEST);
		return;
	}

	try
	{
        const candidate = await admin.auth().getUserByEmail(candidateEmail);
        await admin.auth().setCustomUserClaims(candidate.uid, {
            staff: req.body.staff === true
		});
	}
	catch (e)
	{
        res.json(INVALID_EMAIL);
		return;
    }

    res.json(SUCCESS);
});

export default route;
