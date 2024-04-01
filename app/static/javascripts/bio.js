var followBtn = document.getElementById("followBtn");

followBtn.addEventListener('click', function(event) {
    sessionID=localStorage.getItem('physcomsessID');
    if (sessionID) {
        var xhr = new XMLHttpRequest();
        alert("follow");
    }
    else {
        res = confirm("Login to follow user");
        if (res) {
            location.href = `/app/login?next=${location.href}`;
        }
    }
})