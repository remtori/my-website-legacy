import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import apiHandler from './api';

const CONFIG = functions.config();
admin.initializeApp(CONFIG.firebase);
const ADMIN_UID = (CONFIG.admin && CONFIG.admin.uid) || "8MxXfpNCYYXXB6za0QVUqM1sKMz2";

// tslint:disable-next-line: no-floating-promises
admin.auth().setCustomUserClaims(ADMIN_UID, {
	admin: true,
	staff: true,
});

export const api = functions.https.onRequest(apiHandler);
