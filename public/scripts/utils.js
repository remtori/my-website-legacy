export function getUrlParams(search) {
    let hashes = search.slice(search.indexOf('?') + 1).split('&')
    let params = {}
    hashes.map(hash => {
        let [key, val] = hash.split('=')
        params[key] = decodeURIComponent(val)
    })

    return params
}

export function createElement(emmet, innerHTML) {
    const args = emmet.split(/(\.|#)/g);
    const element = document.createElement(args[0]);
    for (let i = 1; i < args.length; i++) {
        if (args[i] === ".") {
            i++;
            element.classList.add(args[i]);
        } else if (args[i] === "#") {
            i++;
            element.id = args[i];
        }
    }

    element.innerHTML = innerHTML;
    return element;
}

export function doLoading(ele) {
    ele.innerHTML = 
    `<div class="content-center">
        <img class="center-me" src="/assets/images/spinner.gif">
    </div>`;
}

export function doError(ele) {
    ele.innerHTML = 
    `<h2>Error: 404</h2>
    <h1>Không thể tìm thấy trang</h1>
    <p>Đường dẫn này không dẫn đi đâu cả!</p>`;
}

export function uncompress(base64data){    
    return String.fromCharCode.apply(null, 
        new Uint16Array(
            pako.inflate(
                new Uint8Array(
                    atob(base64data).split('')
                    .map(e => e.charCodeAt(0))
                )
            )
        )
    );
}

export function compress(str) {
    return u8Arr2Base64(pako.deflate(str));
}

export function u8Arr2Base64(u8Arr){
    const CHUNK_SIZE = 0x8000; //arbitrary number
    const length = u8Arr.length;
    let index = 0;    
    let result = '';
    let slice;
    while (index < length) {
        slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length)); 
        result += String.fromCharCode.apply(null, slice);
        index += CHUNK_SIZE;
    }
    return btoa(result);
}
