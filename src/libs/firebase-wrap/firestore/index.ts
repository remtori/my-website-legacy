import { app, firebase } from '../app';
import 'firebase/firestore';

const collection = 'blogs';
export const db = app.firestore();

export function genDocumentKey(): string
{
	return db.collection(collection).doc().id;
}

export function getBaseDocument(): Blog
{
	return {
		key: genDocumentKey(),
		title: 'Untitled',
		public: false,
		previewImg: {
			url: '',
			width: 300,
			height: 240,
		},
		description: 'No description~',
		author: 'Anon',
		tags: [],
		// @ts-ignore
		timestamp: firebase.firestore.FieldValue.serverTimestamp(),
	};
}

export function setDocument(doc: Partial<Blog>): Promise<void>
{
	const $doc = {
		...getBaseDocument(),
		...doc,
	};

	return db.collection(collection).doc($doc.key).set($doc);
}

export function deleteDocument(key: string): void
{
	db.collection(collection).doc(key).delete();
}
