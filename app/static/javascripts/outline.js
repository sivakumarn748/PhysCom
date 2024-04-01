var user_icon = document.getElementById("user-icon");
var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menu-button");
var menuBtnSVG = document.querySelector("#menu-button>label");

var menuopen = false;

var menuOpenSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>
`;

var menuCloseSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>
`;

if (localStorage.userid) {
    user_icon.innerHTML = `<img src="/api/userprofile?userid=${localStorage.userid}"/>`;
    user_icon.addEventListener('click', function(event){
        location.href = `/app/settings/${physcomsessID}`;
    });
}

menuBtn.addEventListener('click', function(event){
    if (!menuopen){
        menu.classList.remove('menuclose');
        menu.classList.add('menuopen');
        menuBtnSVG.innerHTML = menuCloseSVG;
    }
    else {        
        menu.classList.remove('menuopen');
        menu.classList.add('menuclose');
        menuBtnSVG.innerHTML = menuOpenSVG;
    }
    menuopen = !menuopen;
});