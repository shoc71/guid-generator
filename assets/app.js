const GUID = document.getElementById("GUID");

function uuidv4() {
    GUID.textContent = crypto.randomUUID();
    // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    // .replace(/[xy]/g, function(c) {
    //     const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15;
    //     const v = c === 'x' ? r : (r & 0x3) | 0x8;
    //     return v.toString(16);
    // });
}

console.log(uuidv4());