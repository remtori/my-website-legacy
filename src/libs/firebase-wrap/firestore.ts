import app from './app';
import 'firebase/firestore';

export const db = app.firestore();
export const blogs = db.collection('blogs');
/*
export function genDocumentKey(collection: DBCollections): string
{
	return db.collection(collection).doc().id;
}

export function getBaseDocument(collection: DBCollections): IDocument
{
	return {
		type: collection,
		key: genDocumentKey(collection),
		timeAdded: new Date().getTime(),
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
	};
}

export function setDocument(collection: DBCollections, doc: any): Promise<void>
{
	const $doc = {
		...getBaseDocument(collection),
		...doc,
	};

	return db.collection(collection).doc($doc.key).set($doc);
}

export function getDocument(collection: DBCollections, key: string): Promise<IDocument>
{
	return db.collection(collection).doc(key).get().then(snap => snap.data()) as Promise<IDocument>;
}

export function deleteDocument(collection: DBCollections, key: string): void
{
	db.collection(collection).doc(key).delete();
}

export function getDocumentList(collection: DBCollections, page: number = 0, tags?: string[]): Promise<IDocument[]>
{
	let docs = db.collection(collection).orderBy('key', 'desc').where('public', '==', true);
	if (tags && tags.length)
	{
		docs = docs.where('tags', 'array-contains-any', tags);
	}

	return docs.limit(25).get()
		.then(querySnapshot =>
		{
			const listDoc: IDocument[] = [];
			querySnapshot.forEach(doc =>
			{
				listDoc.push(doc.data() as IDocument);
			});
			return listDoc;
		});
}
*/
