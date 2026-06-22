const GUID = document.getElementById("GUID");
const copyBtn = document.getElementById("copy");
const generateInputs = document.getElementById("request");
const display = document.getElementById("display");
const delayInMilliSeconds = 1500;
const replaceBox = document.getElementById("replace-box");

function guid() {
    return crypto.randomUUID();
}

function createGUID() {
    GUID.textContent = guid();
}

function copy() {
    const copyToClipboardText = GUID.innerText;
    navigator.clipboard.writeText(copyToClipboardText)
    
    // async Promise
    .then(() => {
        copyBtn.innerHTML = `
        Copied!
        <img src="./assets/images/copy-checked.png" alt="copy png" style="width: 16px; height: 16px;">
        `;
        
        setTimeout(function() {
            copyBtn.innerHTML = `
            Copy
            <img src="./assets/images/copy.png" alt="copy png">
            `;
        }, delayInMilliSeconds);
    })
    .catch(err => {
        console.error("Failed to copy: ", err);
    })
}

function generateGuids() {
    const insertText = document.getElementById("insert-text").value;
    display.innerHTML = '';
    
    if (generateInputs.value <= 0) {
        display.innerHTML = '';
        return;
    }
    
    if (generateInputs.value > 100) {
        display.innerText = "Please select below 100";
        setTimeout(() => {
            display.innerHTML = '';
            generateInputs.value = '';
        }, delayInMilliSeconds);
        return;
    }

    const ul = document.createElement('ul');
    ul.classList.add('list-unstyled', 'text-center');
    ul.style.paddingLeft = "0";
    ul.style.marginLeft = "0";

    for (let i = 1; i <= generateInputs.value; i++){
        const li = document.createElement('li');
        const text = guid();
        console.log("length; " + insertText.length + " string: "+ insertText.value)
        li.textContent = replaceIgnoringDashes(text, 0, insertText.length, insertText)
        ul.appendChild(li);
    }
    // console.log(list)

    display.appendChild(ul);

    return display;
}

function replaceIgnoringDashes(str, start, end, replacement) {
    
    let chars = str.split('');
    let count = 0;

    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === '-') continue;

        if (count >= start && count < end) {
            chars[i] = replacement[count - start];
        }
        count++;
    }

    return chars.join('');
}

// create a temp link, click download for user, and remove it immediately
function downloadToLocal() {
    const blob = new Blob([display.innerText], {type: "text/plain"});

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "output.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

// auto-generate when page is loaded
createGUID();