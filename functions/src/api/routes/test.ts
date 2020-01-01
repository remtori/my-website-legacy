import * as express from 'express';
import { INVALID_PATH, SUCCESS } from '../responses';

const route = express.Router();
let storage: any = {};

route.get([ '/', '/*?' ], (req, res) =>
{
	if (typeof req.params[0] === "string")
	{
		let t = storage;
		const keys = req.params[0].split('/').filter(s => s.length > 0);
		for (const key of keys)
		{
			if (!t.hasOwnProperty(key))
			{
				res.json(INVALID_PATH);
				return;
			}
			else
				t = t[key];
		}

		res.json(t);
	}
	else
		res.json(storage);
});

route.post([ '/', '/*?' ], (req, res) => {

	let t = storage;
	if (typeof req.params[0] === "string")
	{
		const keys = req.params[0].split('/').filter(s => s.length > 0);
		for (let i = 0; i < keys.length - 1; i++)
		{
			if (!t.hasOwnProperty(keys[i]))
				t[keys[i]] = {};

			t = t[keys[i]];
		}

		t[keys[keys.length - 1]] = req.body;
	}
	else
		storage = req.body;

	res.json(SUCCESS);
});

export default route;
