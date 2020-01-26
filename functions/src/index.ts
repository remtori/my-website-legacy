import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import apiHandler from './api';

if (process.env.NODE_ENV === 'development')
{
	process.env.GOOGLE_APPLICATION_CREDENTIALS = __SERVICE_ACCOUNT_PATH__;
}

const CONFIG = functions.config();
admin.initializeApp(CONFIG.firebase);

// tslint:disable-next-line: no-floating-promises
// admin.auth().setCustomUserClaims(ADMIN_UID, {
// 	admin: true,
// 	staff: true,
// });

export const api = functions.https.onRequest(apiHandler);
