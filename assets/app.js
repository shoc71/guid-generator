const GUID = document.getElementById("GUID");
const copyBtn = document.getElementById("copy");
const generateInputs = document.getElementById("request");
const display = document.getElementById("display");
const delayInMilliSeconds = 1500;

function guid() {
    GUID.textContent = crypto.randomUUID();
    return GUID.textContent
}

function copy() {
    const copyToClipboardText = GUID.innerText;
    navigator.clipboard.writeText(copyToClipboardText)

    // async Promise
    .then(() => {
        copyBtn.innerText = "Copied!";

        setTimeout(function() {
            copyBtn.innerText = "Copy";
        }, delayInMilliSeconds);
    })
    .catch(err => {
        console.error("Failed to copy: ", err);
    })
}

function generateGuids() {
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

    for (let i = 1; i <= generateInputs.value; i++){
        const li = document.createElement('li');
        li.textContent = guid() + i
        ul.appendChild(li);
    }
    // console.log(list)

    display.appendChild(ul);

    return display;
}

// create a temp link, click download for user, and remove it immediately
function downloadToLocal() {
    const blob = new Blob([display.innerText], {type: "text/plain"});

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "output.txt";

    // Trigger Download
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

// auto-generate when page is loaded
guid();