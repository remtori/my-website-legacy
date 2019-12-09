import user from "/scripts/apiWrapper/firebaseAuth.js"
import initTinyMCE from "/scripts/apiWrapper/tinymce/init.js"
import { loadBlogs, loadBlogById, addBlog, getDefaultBlog } from "/scripts/pages/blogs/blog.js"
import { getUrlParams, doLoading, doError } from "/scripts/utils.js"

window.addEventListener('DOMContentLoaded', () => {
    const editBlogsBtn = document.getElementById('editBlogs');
    const blogsContent = document.getElementById('blogsContent');
    
    editBlogsBtn.addEventListener('click', () => {        
        if (!user.isUserSignedIn()) {
            user.signIn();
            return;
        }            

        blogsContent.innerHTML = `        
            <textarea id="editor"></textarea>
            <div id="editableBlogItem" class="blog-listItem-wrapper">
                <a class="blog-listItem-imgWrapper" href="javascript:void(0)">
                    <img src="#">
                </a>
                <a class="blog-listItem-titleWrapper" href="javascript:void(0)">
                    <div><p editable>Untitled</p></div>
                </a>
            <div class="blog-listItem-timestamp">${new Date().toLocaleString()}</div>
            <div class="blog-listItem-description">
                <div><textarea placeholder="Description"></textarea></div>
            </div>
                <div class="blog-listItem-author" editable>Anon!</div> 
                <div class="blog-listItem-tags" editable></div>
            <div>
            <button id="postBlog" style="float:right;">Post</button>        
        `;        
        initTinyMCE();  
        document.getElementById('postBlog').addEventListener('click', () => {
            
        })
    })    
        
    doQuery(window.location.hash.substr(1));
    window.addBlog = addBlog;
})  

window.registerHashChangeHandler('/pages/blogs.html', doQuery)
function doQuery(url) {
    const params = getUrlParams(url);
    const blogsContent = document.getElementById('blogsContent');
    
    const ifErr = () => {
        if (blogsContent.innerHTML.length === 0)
            doError(blogsContent)
    };

    doLoading(blogsContent);
    if (params.tag) {
        
    } else if (params.blogId) {
        loadBlogById(params.blogId, ifErr);
    } else if (params.userId) {
        
    } else {        
        loadBlogs(null, ifErr);
    }
}