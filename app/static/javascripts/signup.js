var userid_div = document.getElementById("userid");
var idexists = document.getElementById("idexists");
idexists.style.color = 'red';

userid_div.addEventListener('input', function(){
    var value = userid_div.value;
    var xhr = new XMLHttpRequest();
    params = `id=${value}`;
    url = `/api/hasUserID?${params}`;
    xhr.open('GET', url, true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState==4 && xhr.status==200) {
            var resp = xhr.responseText;
            if (resp=='1') {
                idexists.innerHTML = `UserID '${value}' already exists!`
            }
            else {
                idexists.innerHTML = '';
            }
        }
    }
    xhr.send();
});