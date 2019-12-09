export function uploadImg(blob) {
    return new Promise((resolve, reject) => {        
     
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'https://api.imgur.com/3/image', true);
        xhttp.setRequestHeader('Authorization', 'Client-ID a7388afed218e76');
        xhttp.setRequestHeader('Accept', 'application/json');
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                resolve(JSON.parse(xhttp.response));
            }
        }

        xhttp.onerror = reject;

        const data = new FormData();
        data.append('image', blob);
        data.append('type', 'file');
        // data.append('title', 'No Title');
        // data.append('description', 'Upload from remtori.tk');

        xhttp.send(data);
    });    
}