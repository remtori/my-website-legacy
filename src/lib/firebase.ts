import * as firebase from 'firebase/app';
import 'firebase/auth';

export { firebase };
export const CONFIG = JSON.parse(`{
	"apiKey": "AIzaSyDZpNEsHUILTJSJixyoGzaB04K8Kcp6CPU",
	"authDomain": "remtori.firebaseapp.com",
	"databaseURL": "https://remtori.firebaseio.com",
	"projectId": "remtori",
	"storageBucket": "remtori.appspot.com",
	"messagingSenderId": "65013389724",
	"appId": "1:65013389724:web:bf3e07dfb003f314"
}`);

export const getStorageURLFromPath = (path: string) =>
	`https://storage.googleapis.com/${CONFIG.storageBucket}/${path}`;

export const app = firebase.initializeApp(CONFIG);
(window as any).firebase = app;

export const auth = app.auth();

const githubProvider = new firebase.auth.GithubAuthProvider();
export const signIn = () => auth.signInWithRedirect(githubProvider);
export const signOut = () => auth.signOut();

type Handler = (user: User | null) => void;
export function onAuthStateChanged(handler: Handler) {
	auth.onAuthStateChanged(
		user => {
			if (!user) return handler(null);

			Promise.all([
				auth.getRedirectResult(), user.getIdTokenResult()
			])
			.then(([ redirectResult, tokenResult ]) => redirectResult.user && handler({
				displayName: user.displayName,
				photoURL: user.photoURL,
				email: user.email,
				uid: user.uid,
				isStaff: tokenResult?.claims.staff || tokenResult?.claims.admin || false,
				isAdmin: tokenResult?.claims.admin || false,
				credential: {
					accessToken: (redirectResult.credential as any).accessToken
				}
			} as User));
		}
	);
}
