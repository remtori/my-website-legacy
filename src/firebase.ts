import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const CONFIG = {
    apiKey: "AIzaSyCd5Qk52bILan7wbdp8Fx9MLAcEemMq7Ys",
    authDomain: "remtori.firebaseapp.com",
    databaseURL: "https://remtori.firebaseio.com",
    projectId: "remtori",
    storageBucket: "remtori.appspot.com",
    messagingSenderId: "65013389724",
    appId: "1:65013389724:web:bf3e07dfb003f314"
};

const app = firebase.initializeApp(CONFIG);
export const auth = app.auth();
export const db = app.firestore();
export const storageRef = app.storage();

export default app;
window.firebase = app;

export function signIn(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password).then(userCre => userCre.user);
}

const googleProvider = new firebase.auth.GoogleAuthProvider();
export function signInWithGoogle() {
    return auth.signInWithPopup(googleProvider);
}

export function signOut() {
    return auth.signOut();
}

export function getStorageURLFromPath(path: string) {
    return `https://storage.googleapis.com/${CONFIG.storageBucket}/${path}`;
}

interface FireStoreDoc {    
    key?: string;
    timeAdded?: number;
    title?: string;
    previewImg?: {
        url: string;
        width: number;
        height: number;
    };
    description?: string;
    contentUrl: string;
    author?: string;
    tags?: string[];
}

export function genDocumentKey(collection: string) {
    return db.collection(collection).doc().id;
}

export function getBaseDocument(collection: string): Blog {
    return {
        key: genDocumentKey(collection),
        timeAdded: new Date().getTime(),
        title: 'Untitled',
        previewImg: {
            url: '/assets/images/empty.jpg',
            width: 300,
            height: 240,
        },
        description: 'No description~',
        author: 'Anon',
        contentStoragePath: 'empty.md',
        tags: []
    };
}

export function setDocument(collection: string, doc: FireStoreDoc) {

    const baseDoc = getBaseDocument(collection);

    const $doc = {
        ...baseDoc,
        ...doc
    };
    
    return db.collection(collection).doc($doc.key).set($doc);
}

export function getDocument(collection: string, key: string) {
    return db.collection(collection).doc(key).get();
}

export function deleteDocument(collection: string, key: string) {
    db.collection(collection).doc(key).delete();
}

export function getDocumentList<T>(collection: string, tag?: string): Promise<T[]> {

    let docs: firebase.firestore.Query = db.collection(collection);

    if (typeof tag === "string") {
        docs = docs.where('tags', 'array-contains', tag);
    }

    return docs.get()
        .then(querySnapshot => {
            const listDoc: T[] = [];
            querySnapshot.forEach(doc => {
                listDoc.push(doc.data() as T);
            });
            return listDoc;
        });
}

interface UploadFileData {
    data: Blob | string,
    metadata?: firebase.storage.UploadMetadata
};

export function uploadFile(
    filePath: string,
    { data, metadata }: UploadFileData,
    onProgress?: (percent: number) => any
) {

    let $data = typeof data === "string"
        ? new Blob([data], { type: 'text/plain' })
        : data;

    return new Promise((resolve, reject) => {
        const uploadTask = storageRef.ref(filePath).put($data, metadata);
        uploadTask.on('state_changed', snapshot => {
            if (onProgress) {
                onProgress(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            }
        }, err => {
            reject(err);
        }, () => {
            //uploadTask.snapshot.ref.getDownloadURL().then(url => resolve(url));
            resolve(filePath);
        });
    });
}

export async function getHtmlFromUrl(url: string) {
    try {
        const response = await fetch(url);
        return await response.text();
    } catch (e) {
        return `<div class="bg-danger">Failed to load ${url}</div>`
    }
}

export async function getIframeSrcFromProject(project: Project) {

    let $html;

    try {
        const response = await fetch(
            getStorageURLFromPath(project.contentStoragePath)
        );
        $html = await response.blob();
    } catch (e) {
        $html = `
            <div class="bg-danger">
                Failed to load ${project.contentStoragePath}
                <blockquote class="blockquote">${e}</blockquote>                
            </div>
        `;
    }

    const blob = new Blob([$html], { type: 'text/html' });
    return URL.createObjectURL(blob);
}