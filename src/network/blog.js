import firebase from '../lib/firebase-init';
import 'firebase/database';
import { compressStr, uncompressStr } from '../utils';

const db = firebase.database();
const blogListRef = db.ref('/blog/list/');
const blogTagRef = db.ref('/blog/tag/');

const getDefaultBlog = _ => ({    
        key: "",
        timeAdded: new Date().getTime(),
        title: "Untitled!",
        previewImg: {
            url: "",
            width: 64,
            height: 64,
        },
        description: "No description available.",
        content: "",
        author: "Anon!",
        tags: "" 
});

export function addBlog(blog) {    

    blog = Object.assign(getDefaultBlog(), blog);
    const newPostKey  = blogListRef.push().key;
    blog.key = newPostKey;    

    blog.content = compressStr(blog.content);
    
    blog.tags.split(' ').forEach(tag => {
        if (tag.length > 0)
            blogTagsRef.child(`${tag}/${newPostKey}`).set(true);
    })
        
    const update = {};
    update[`${blogListPath}/${newPostKey}`] = blog;

    return database.ref().update(update);
}

export function updateBlog(blog) {    
    return new Promise((resolve, reject) => {
    
        try {
            blog = Object.assign(getDefaultBlog(), blog);
            const blogRef = database.ref(`${blogListPath}/${blog.key}`);
        
            blogRef.on('value', snap => {
                try {
                    const oldTags = snap.val().tags.split(' ');
                    const newTags = blog.tags.split(' ');
                    const addTags = newTags.filter(tag => oldTags.indexOf(tag) === -1);
                    const removeTags = oldTags.filter(tag => newTags.indexOf(tag) === -1);        
            
                    removeTags.forEach(tag => {
                        blogTagsRef.child(`${tag}/${blog.key}`).remove();
                    });
                    addTags.forEach(tag => {
                        blogTagsRef.child(`${tag}/${blog.key}`).set(true);
                    });
                    
                    blogRef.set(blog);
                    resolve(blog);

                } catch (err) {
                    reject(err);
                }
            })
        } catch (err)  {
            reject(err);
        }
    })    
}

export function fetchBlogs({ keyStamp, includeTags, excludeTags }) {
    return new Promise((resolve, reject) => {

        const blogsRef = 
            keyStamp == null 
                ? blogListRef.limitToFirst(10)
                : blogListRef.orderByKey().startAt(keyStamp).limitToFirst(11);

        blogsRef.once('value')
            .then(
                snap => snap.val(),
                error => reject(error)
            )
            .then(
                blogsByKey => {
                    const t = Object.values(blogsByKey);
                    t.forEach(blog => {
                        blog.content = uncompressStr(blog.content);
                    });

                    resolve(t);
                }
            );
    })
}

export function fetchBlogsWithTag(tag, keyStamp = null) {
    return new Promise((resolve, reject) => {

        let ref = blogTagRef.child(tag);
        ref = keyStamp == null 
            ? ref.limitToFirst(10)
            : ref.orderByKey().startAt(keyStamp).limitToFirst(11);

        ref.once('value')
            .then(
                snap => snap.val(),
                error => reject(error)
            )
            .then(
                blogKeys => Promise.all(
                    Object.keys(blogKeys)
                    .map(key => fetchBlogIfNeeded(key, false))
                )
            )
            .then(
                blogs => resolve(blogs),
                error => reject(error)
            );
    })
}

export function fetchBlogIfNeeded(id, dispatchLoadingState = true) {
    return new Promise((resolve, reject) => {

        const list = getState().blog.list;
        if (list.hasOwnProperty(id) && list[id].key === id)            
            return resolve(list[id]);

        blogListRef.child(id)
            .once('value')
            .then(
                snap => snap.val(),
                error => reject(error)
            )
            .then(
                blog => {
                    if (!blog)
                        reject("Unknown Blog ID");

                    blog.content = uncompressStr(blog.content);
                    resolve(blog);
                }
            );
    })
}