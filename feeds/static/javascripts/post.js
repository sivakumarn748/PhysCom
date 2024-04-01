var comment_btn = document.getElementById("comment-post");
var comment_window = document.getElementById("comment-window");
var like_btn = document.getElementById("like-post");
var postBtn = document.getElementById("new-post-button");
var postWindow = document.getElementById("new-post-window");
var postCloseBtn = document.querySelector("#new-post-close > label");
var chooseFileBtn = document.querySelector("#new-post-form > div:nth-child(3) > label:nth-child(1)");
var chooseFile = document.getElementById("new-post-input-image");
var imgPreviewBtn = document.querySelector("#new-post-close > button:nth-child(1)");
var imgPreview = document.getElementById("imgPreview");
var imgClearBtn = document.querySelector("#new-post-close > button:nth-child(2)");
var form = document.getElementById("new-post-form");

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

comment_btn.innerHTML = `${commentscount} ${commentSVG}`;

if (liked==true) {
    like_btn.innerHTML = `${likescount} ${likedSVG}`;
}
else {
    like_btn.innerHTML = `${likescount} ${unlikedSVG}`;
}

function toggleLikeBtn(resp) {
    if (resp=="Liked") {
        likescount = likescount + 1;
        like_btn.innerHTML = `${likescount} ${likedSVG}`;
    }
    else if (resp=="Unliked") {
        likescount = likescount - 1;
        like_btn.innerHTML = `${likescount} ${unlikedSVG}`;
    }
}

like_btn.addEventListener('click', function(event) {

    function sessID() {
        if (localStorage.physcomsessID) return localStorage.physcomsessID;
        else return null;
    }

    if (!sessID()){
        alert('Login to like');
        return;
    }

    var xhr = new XMLHttpRequest();
    var url = '/api/like/';
    var json = JSON.stringify({
        'sessID': sessID(),
        'postID': postid
    });

    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            liked = !liked;
            toggleLikeBtn(xhr.responseText);
        }
    }
    xhr.send(json);
});


postBtn.addEventListener('click', function(event) {
    if (!localStorage.physcomsessID){
        alert("Login to comment!");
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
    document.getElementById("commented_to").value = postid;
})