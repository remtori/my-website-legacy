import { getUrlParams, createElement, compress, uncompress } from "/scripts/utils.js"

export function getDefaultBlog() {
    return {
        key: "uninitialized",
        timeAdded: new Date().getTime(),
        title: "Untitled!",
        previewImgUrl: "/assets/images/spinner.gif",
        description: "No description available.",
        contentUrl: "",
        author: "Anon!",
        tags: ""
    }
}

function uploadContent(key, $html) {
    firebase.storage().ref(`/blogContent/${key}.pako`)
        .put(new Blob(
            [ compress($html) ], 
            { type: 'text/plain' }
        ))
        .catch(err => console.error("Error while upload content.", err))
}

function getDownloadURL(key) {
    return new Promise(resolve => {
        firebase.storage().ref(`/blogContent/${key}.pako`).getDownloadURL()
            .then(url => resolve(url))
            .catch(err => reject(err))
    })
}

export function addBlog(blog, $html) {

    blog = Object.assign(getDefaultBlog(), blog);
    const newPostKey  = firebase.database().ref('/blogs/').push().key;
    blog.key = newPostKey;    

    blog.tags.split(' ').forEach(tag => {
        firebase.database().ref(`/blogTag/${tag}/${newPostKey}`).set(true);
    })
    
    const update = {};
    update['/blogs/' + newPostKey] = blog;
    uploadContent(newPostKey, $html);
    return firebase.database().ref().update(update);
}

export function updateBlog(blog, $html) {
    blog = Object.assign(getDefaultBlog(), blog);
    const blogRef = firebase.database().ref(`/blogs/${blog.key}`);
    blogRef.on('value', snap => {
        const oldTags = snap.val().tags.split(' ');
        const newTags = blog.tags.split(' ');
        const addTags = newTags.filter(tag => oldTags.indexOf(tag) === -1);
        const removeTags = oldTags.filter(tag => newTags.indexOf(tag) === -1);        

        removeTags.forEach(tag => {
            firebase.database().ref(`/blogTag/${tag}/${blog.key}`).remove();
        })
        addTags.forEach(tag => {
            firebase.database().ref(`/blogTag/${tag}/${blog.key}`).set(true);
        })
        blogRef.set(blog);
        uploadContent(blog.key, $html);
    })    
}

const blogsContent = document.getElementById('blogsContent');
export function loadBlogs(timestamp = null, callback = ()=>{}) {
    const defaultBlogFormat = getDefaultBlog();
    let blogRef = firebase.database().ref('/blogs/').limitToLast(10)
    if (timestamp != null) {
        blogRef = blogs.orderByValue('timeAdded').endAt(timestamp).limitToLast(10);
    } 

    blogRef.once('value').then(snap => {                    
        const blogs = snap.val();
        blogsContent.innerHTML = "";
        for (let key in blogs) {
            if (blogs.hasOwnProperty(key)) {                 
                appendToBlogList(Object.assign(defaultBlogFormat, blogs[key]));                        
            }
        }            
        callback();
    })    
}

export function loadBlogById(id, callback = ()=>{}) {
    firebase.database().ref('/blogs/').child(id).once('value', snap => {
        let flag = false;
        const blogs = snap.val();
        blogsContent.innerHTML = "";
        for (let key in blogs) {
            if (snaps.hasOwnProperty(key)) {              
                flag = true;
                const blog = Object.assign(defaultBlogFormat, blogs[key]);
                getDownloadURL(key).then(url => {
                    blog.contentUrl = url;
                    displayBlog(blog);
                    callback();
                }).catch(err => {
                    console.error(err);
                    callback();
                })  
            }
        }                           
        if (!flag)
            callback();
    }).catch(err => {
        displayBlog({html: `
            <h2>Error: 404</h2>
            <h1>Không thể tìm thấy blog này</h1>
            <p>Đường dẫn này không dẫn đi đâu cả!</p>
        `});
        console.error("Error when loading blog.", err);
        callback(err);
    })
}

function displayBlog(blog) {    

}

export function appendToBlogList(blog, parent = blogsContent) {
    
    const blogListItem = createElement('div.blog-listItem-wrapper', `        
        <a class="blog-listItem-imgWrapper" href="#/pages/blogs.html?blogId=${blog.key}">
            <img src=${blog.previewImgUrl}>
        </a>
        <a class="blog-listItem-titleWrapper" href="#/pages/blogs.html?blogId=${blog.key}">
            <div>${blog.title}</div>
        </a>
        <div class="blog-listItem-timestamp">${new Date(blog.timeAdded).toLocaleString()}</div>
        <div class="blog-listItem-description">
            <div>${blog.description}</div>
        </div>
        <div class="blog-listItem-author">${blog.author}</div> 
        <div class="blog-listItem-tags">${genTagList(blog.tags)}</div>
    `);    

    parent.appendChild(blogListItem);
}

function genTagList(tags) {
    return tags.split(/\s/g).map(tag => 
        `<a href="#/pages/blogs.html?tag=${tag}">${tag}</a>`
    ).join('');
}