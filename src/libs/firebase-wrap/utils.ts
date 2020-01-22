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
