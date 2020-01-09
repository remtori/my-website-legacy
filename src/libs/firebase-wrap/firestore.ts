import app from './app';
import 'firebase/firestore';

export const db = app.firestore();

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
			url: '/assets/images/empty.svg',
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

export function getDocument(collection: 'blogs', key: string): Promise<Blog>;
export function getDocument(collection: 'projects', key: string): Promise<Project>;
export function getDocument(collection: DBCollections, key: string): Promise<IDocument>
{
	return db.collection(collection).doc(key).get().then(snap => snap.data()) as Promise<IDocument>;
}

export function deleteDocument(collection: DBCollections, key: string): void
{
	db.collection(collection).doc(key).delete();
}

export function getDocumentList(collection: 'blogs', tag?: string): Promise<Blog[]>;
export function getDocumentList(collection: 'projects', tag?: string): Promise<Project[]>;
export function getDocumentList(collection: DBCollections, tag?: string): Promise<IDocument[]>
{
	let docs: firebase.firestore.Query = db.collection(collection);

	docs = docs.where('public', '==', true);
	if (typeof tag === 'string') docs = docs.where('tags', 'array-contains', tag);

	return docs.get()
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
