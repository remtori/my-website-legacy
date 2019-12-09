export function loadJson(url) {
    return fetch(url).then(
        v => v.json()
    );
}

export function loadPage(url) {
    return fetch(url).then(
        v => v.text()
    );
}