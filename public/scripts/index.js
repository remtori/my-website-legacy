import { loadJson, loadPage } from "/scripts/loaders.js"
import runScripts from "/scripts/runScripts.js"
import Space2DScene from "/scripts/Space2DScene.js"
import { getUrlParams, doLoading, doError } from "/scripts/utils.js"

window.globalVar = {};
window.addEventListener('DOMContentLoaded', async () => {
       
    const pages = await loadJson("/pages.json");
    document.getElementById("navGames").appendChild(
        loadNavigator(
            document.createElement('ul'), 
            pages.games
        )
    );
    document.getElementById("navOthers").appendChild(
        loadNavigator(
            document.createElement('ul'), 
            pages.others
        )
    );

    loadContent(window.location.hash.substr(1));

    const scene = new Space2DScene(
        document.getElementById('backgroundCanvas'),
        cvs => {
            cvs.width = document.body.scrollWidth;
            cvs.height = document.body.scrollHeight;
        }
    );    
    scene.startWatch();    
    window.globalVar.scene = scene;    
});

const hashChangeHandlers = new Map();
window.registerHashChangeHandler = function(page, callback) {
    hashChangeHandlers.set(page, callback);
}

window.addEventListener('hashchange', () => {
    const url = window.location.hash.substr(1);
    for (let key of hashChangeHandlers.keys()) 
        if (url.startsWith(key)) {
            hashChangeHandlers.get(key)(url);
            return;
        }

    doLoading(
        document.getElementById('content')
    );
    loadContent(url);
});

async function loadContent(url) {
    if (url.length < 1)
        return;

    const params = getUrlParams(url);
    url = url.split('?')[0];
    
    const content = document.getElementById('content');
    
    if (params["iframe"] === "true") {
        content.innerHTML = `
            <iframe src="${url}" class="iframe"></iframe>
        `;

        return;
    }

    try {        
        const page = await loadPage(url);    
        content.innerHTML = page;
    } catch(e) {
        doError(content);
        console.error("Error while trying to load page", e);
    }

    runScripts(content);     
}

function loadNavigator(parent, items) {
   
    for (let i = 0; i < items.length; i++) {
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        
        anchor.href = "#";
        anchor.href += items[i].url || "";
        anchor.innerText = items[i].name;

        if (items[i].iframe) 
            anchor.href += "?iframe=true";

        li.appendChild(anchor);        
        parent.appendChild(li);
    }

    return parent;
}
