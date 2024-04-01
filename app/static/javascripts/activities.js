function renderNextN(userid, field, s, n) {
    var url = `/api/${userid}/${field}?s=${s}&n=${n}`;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    
    xhr.onreadystatechange = function(event) {
        resp = xhr.responseText;
        alert(resp);
    }

    xhr.send();
}