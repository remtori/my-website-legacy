import { compressStr, uncompressStr } from "../../utils"
import firebase from "../../lib/firebase-init";

const loadedBlog = new Map();
const blogListPath = "/blog/list";
const blogTagsPath = "/blog/tags";
const database = firebase.database();
const blogListRef = database.ref(blogListPath);
const blogTagsRef = database.ref(blogTagsPath);

if (true) {
    window.blogs = loadedBlog;
    Object.assign(window, {
        compressStr, uncompressStr,
        addBlog, updateBlog
    })
}

export function getDefaultBlog() {
    return {
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
    }
}

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
    blog = Object.assign(getDefaultBlog(), blog);
    const blogRef = database.ref(`${blogListPath}/${blog.key}`);
    blogRef.on('value', snap => {
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
    })    
}

export function loadBlogs(keyStamp = null) {

    const blogRef = 
        keyStamp == null 
            ? blogListRef.limitToFirst(10)
            : blogListRef.orderByKey().startAt(keyStamp).limitToFirst(11);

    return blogRef.once('value')
        .then(snap => snap.val())
        .then(blogs => {
            const t = Object.values(blogs)
                .map(blog => Object.assign(getDefaultBlog(), blog));

            t.forEach(b => {
                !loadedBlog.has(b.key) && loadedBlog.set(b.key, b);
                loadedBlog.get(b.key).content = uncompressStr(b.content);
            });

            return Array.from(loadedBlog.values());
        });
}

export function loadBlogsByTag(tag, keyStamp = null) {
    const blogRef = 
        keyStamp == null
            ? blogTagsRef.child(tag).limitToLast(10)
            : blogTagsRef.child(tag).orderByKey().startAt(keyStamp).limitToFirst(11);
    
    return blogRef.once('value')
        .then(snap => snap.val())
        .then(keys => Promise.all(
            Object.keys(keys).map(key => loadBlogById(key, false))
        ));
}

export function loadBlogById(key) {

    return Promise.resolve()
        .then(_ => loadedBlog.has(key) 
            ? loadedBlog.get(key)
            : blogListRef
                .child(key).once('value')
                .then(snap => snap.val())
                .then(blog => {
                    blog.content = uncompressStr(blog.content);
                    blog = Object.assign(getDefaultBlog(), blog);
                    loadedBlog.set(blog.key, blog);
                    return blog;
                })
        );
}