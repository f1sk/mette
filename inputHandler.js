function clickHandler() {
    canCreate();
    let fname = document.getElementById('fname').value.trim().replace(/\s\s+/g, ' ');
    let lname = document.getElementById('lname').value.trim().replace(/\s\s+/g, ' ');
    let cprSix = document.getElementById('cprSix').value;
    let cprFour = document.getElementById('cprFour').value;
    const rawhour = Math.floor((Math.random() * 8) + 8).toString();
    const rawminute = Math.floor((Math.random() * 60)).toString();
    const readableminute = rawminute.length === 1 ? '0' + rawminute : rawminute;
    const readablehour = rawhour.length === 1 ? '0' + rawhour : rawhour;
    const time = readablehour + '.' + readableminute;
    const date = new Date(new Date().getTime() - 86400000).toISOString().slice(0, 10);
    const datetime = date + ' kl. ' + time;
    const polno = Math.floor(Math.random() * 699999999 + 300000000).toString();
    const reqno = '10' + Math.floor(Math.random() * 28 + 51).toString() + Math.floor(10000000 + Math.random() * 90000000).toString()
    createPDF(fname, lname, cprSix, cprFour, datetime, polno, reqno);
}

function validateNumber(evt, string) {
    var theEvent = evt || window.event;
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    } else {
        moveFocus(string);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function canCreate() {
    await sleep(50);
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const cprSix = document.getElementById('cprSix').value;
    const cprFour = document.getElementById('cprFour').value;
    const generate = document.getElementById("generate");
    localStorage["fname"] = fname;
    localStorage["lname"] = lname;
    localStorage["cprSix"] = cprSix;
    if (cprSix == null || cprSix.trim() === '' || cprSix.length !== 6 || lname == null || lname.trim() === '' || fname == null || fname.trim() === '' || cprFour == null || cprFour.trim() === '' || cprFour.length !== 4) {
        generate.disabled = true
        generate.innerHTML = "Udfyld alle felter";
        return false
    } else {
        document.getElementById("generate").disabled = false
        generate.innerHTML = "Opret";
        return true
    }
}

async function moveFocus(string) {
    await sleep(200);
    const currentElem = document.getElementById(string);
    if (currentElem.id === 'cprSix' && currentElem.value.length === 6) {
        document.getElementById('cprFour').focus();
        document.getElementById('cprFour').select();
    } else if (currentElem.id === 'cprFour' && currentElem.value.length === 4) {
        document.getElementById('generate').focus();
    }
}
