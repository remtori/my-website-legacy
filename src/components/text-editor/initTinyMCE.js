import "../../lib/tinymce/tinymce.min.js";
import "./plugins/stickytoolbar.js";
import { uploadImg } from "../../lib/imgur.js";

export default function initTinyMCE() {
    tinymce.init({
        selector: "#editor",
        init_instance_callback() {
            let e = document.getElementsByClassName('mce-edit-area')[0];
            const stop = document.getElementById('blogsContent');
            while (e != stop) {
                e.style.background = "transparent";
                e = e.parentElement;
            }        
            
            document.getElementsByClassName('mce-menubar')[0].style.backgroundColor = "#404952";
        }    ,
        plugins: "hr media link image code textcolor colorpicker, autoresize autosave lists advlist table stickytoolbar",
        menubar: "file edit insert view format tools table",
        toolbar: "undo redo | styleselect bold italic underline forecolor backcolor | numlist bullist | alignleft aligncenter alignright outdent indent | image table code",
        skin: 'charcoal',
        sticky_offset: 0,
        image_caption: true,
        image_advtab: true,
        statusbar: false,
        min_height: 200,
        branding: false,
        default_link_target: "_blank",
        link_context_toolbar: true,
        autosave_interval: 20,
        autosave_prefix: "autosave-{path}{query}-{id}-",
        images_upload_handler(blobInfo, success, failure) { 
            uploadImg(blobInfo.blob()).then(res => {                
                success(res.data.link);
            }).catch(err => failure(err));                
        },
        content_style: `
            body { 
                background-color: transparent;
                font-size: 16px;
                color: white;
            }
        `,    
    });    
}