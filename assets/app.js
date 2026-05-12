const GUID = document.getElementById("GUID");
const copyBtn = document.getElementById("copy");
const delayInMilliSeconds = 1500;
const generateInputs = document.getElementById("request");
const display = document.getElementById("display");

const copyToClipboardText = GUID.innerText;
function guid() {
    GUID.textContent = crypto.randomUUID();
    return GUID.textContent
}

function copy() {
    navigator.clipboard.writeText(copyToClipboardText);
    copyBtn.innerText = "Copied!"
    setTimeout(function() {
        copyBtn.innerText = "Copy"
    }, delayInMilliSeconds)
}

function generateGuids() {
    display.innerHTML = '';

    if (generateInputs.value <= 0) {
        display.innerHTML = '';
        return;
    }

    const ul = document.createElement('ul');

    for (let i = 1; i <= generateInputs.value; i++){
        const li = document.createElement('li');
        li.textContent = guid() + i
        ul.appendChild(li);
    }
    // console.log(list)

    display.appendChild(ul);
}

// auto-generate when page is loaded
guid();