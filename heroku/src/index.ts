import * as admin from 'firebase-admin';
import apiHandler from './api';

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!serviceAccount)
{
	console.log("Error: Missing Critical Environment Variable \"GOOGLE_APPLICATION_CREDENTIALS\"")
	process.exit(1);
}

admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(serviceAccount)),
	databaseURL: 'https://remtori.firebaseio.com'
});

const ADMIN_UID = process.env.ADMIN_UID || "8MxXfpNCYYXXB6za0QVUqM1sKMz2";

// tslint:disable-next-line: no-floating-promises
admin.auth().setCustomUserClaims(ADMIN_UID, {
	admin: true,
	staff: true,
});

const PORT = process.env.PORT || 8001;
apiHandler.listen(PORT, () => console.log(`Express App is listening on port ${PORT}`));
