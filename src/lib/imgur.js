export function uploadImg(blob) {

    const data = new FormData();
    data.append('image', blob);
    data.append('type', 'file');

    return fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Client-ID a7388afed218e76',
        },
        body: data
    }).then(
        res => res.json()
    );    
}