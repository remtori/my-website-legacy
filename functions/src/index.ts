import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import apiHandler from './api';
import onPermUpdate from './onPermUpdate';

if (process.env.NODE_ENV === 'development')
{
	process.env.GOOGLE_APPLICATION_CREDENTIALS = __SERVICE_ACCOUNT_PATH__;
}

admin.initializeApp(functions.config().firebase);

export const api = functions.https.onRequest(apiHandler);

export const permission = functions.firestore.document('utils/permissions').onWrite(onPermUpdate);
