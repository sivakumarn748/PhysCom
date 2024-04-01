var feeds_pane = document.getElementById("feeds-pane");
var postBtn = document.getElementById("new-post-button");
var postWindow = document.getElementById("new-post-window");
var postCloseBtn = document.querySelector("#new-post-close > label");
var chooseFileBtn = document.querySelector("#new-post-form > div:nth-child(3) > label:nth-child(1)");
var chooseFile = document.getElementById("new-post-input-image");
var imgPreviewBtn = document.querySelector("#new-post-close > button:nth-child(1)");
var imgPreview = document.getElementById("imgPreview");
var imgClearBtn = document.querySelector("#new-post-close > button:nth-child(2)");
var form = document.getElementById("new-post-form");

form.reset(); 

var likedSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
</svg>
`;
var unlikedSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="red" class="bi bi-heart" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>
`;
var commentSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="blue" class="bi bi-chat-text" viewBox="0 0 16 16">
    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
    <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8m0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
</svg>
`;

function getImgData() {
    const files = chooseFile.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        imgPreview.style.display = "block";
        imgPreview.innerHTML = '<img src="' + this.result + '" />';
        });    
    }
}
  

function renderPost(uuid) {
    
    var xhr = new XMLHttpRequest();
    var url = '/api/post-content/';
    var params = `uuid=${uuid}`
    if (localStorage.physcomsessID) {params += `&sessID=${localStorage.physcomsessID}`;}
    else {params+="&ssessID=";}

    xhr.open('GET', `${url}?${params}`, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState==4 && xhr.status==200) {
            
            var postJSON = JSON.parse(xhr.responseText);

            profileTag = `<img src="/api/userprofile?userid=${postJSON['userid']}"/>`;

            function sessID() {
                if (localStorage.physcomsessID) return localStorage.physcomsessID;
                else return "";
            }
            
            HTMLbody = `
            <a href="/community/post/${uuid}?sessID=${sessID()}" class="dontshowlikeurl">
                <div class="post-space">
                    <div class="author-profile">${profileTag}</div>
                </div>
                <div class="post-data">
                    <div class="post-details">
                        <div class="author-username">${postJSON['username']}</div>
                        <div class="posted-time">${postJSON['naturaltime']}</div>
                    </div>
                    <div class="post-content">
                        <div class="post-media">${postJSON['content_media_tag']}</div>
                        <div class="post-text">${postJSON['content_text']}</div>
                    </div>
                    <div class="post-review">
                        <div class="post-likescount">${postJSON['likes_count']} ${unlikedSVG}</div>
                        <div class="post-commentscount">${postJSON['comments_count']} ${commentSVG}</div>
                    </div>
                </div>
            </a>
            `;
            
            feeds_pane.innerHTML += HTMLbody;
        }
    }

    xhr.send();
    
}

for (ID of UUIDs) {
    renderPost(ID);
}

postBtn.addEventListener('click', function(event) {
    if (!localStorage.physcomsessID){
        alert("Login to post content!");
        return;
    }
    postWindow.classList.remove("post-window-animation-rev");
    postWindow.classList.add("post-window-animation");
});

imgPreviewBtn.addEventListener('click', function(event) {
    imgPreviewWindow.classList.remove("post-window-animation-rev");
    imgPreviewWindow.classList.add("post-window-animation");
});

postCloseBtn.addEventListener('click', function(event){
    postWindow.classList.remove("post-window-animation");
    postWindow.classList.add("post-window-animation-rev");
});


previewCloseBtn.addEventListener('click', function(event){
    imgPreviewWindow.classList.remove("post-window-animation");
    imgPreviewWindow.classList.add("post-window-animation-rev");
});

chooseFileBtn.addEventListener("click", function () {
    
});

imgPreviewBtn.addEventListener("click", function(){
    getImgData();
});

chooseFile.addEventListener("change", function(){
    if (chooseFile.files) {
        imgClearBtn.disabled=false;
        imgPreviewBtn.disabled=false;
    }
});
  
imgClearBtn.addEventListener("click", function(){
    chooseFile.files = null;
    imgClearBtn.disabled = true;
    imgPreviewBtn.disabled = true;
    imgPreview.style.display = 'none';
});

form.addEventListener("submit", function(event){
    document.getElementById("form-sessID").value = localStorage.physcomsessID;
})