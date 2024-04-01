var comments_pane = document.getElementById("comments");

function renderComment(uuid) {
    
    var xhr = new XMLHttpRequest();
    var url = '/api/post-content/';
    var params = `uuid=${uuid}`;

    xhr.open('GET', `${url}?${params}`, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState==4 && xhr.status==200) {
            
            var commentJSON = JSON.parse(xhr.responseText);

            if (!localStorage.physcomSessID) {localStorage.physcomSessID=""}

            profileTag = `<img src="/api/userprofile?userid=${commentJSON['userid']}"/>`;
            
            HTMLbody = `
            <a href="/community/post/${uuid}?sessID=${localStorage.physcomSessID}" class="dontshowlikeurl">
                <div class="comment-space">
                    <div class="commentor-profile">${profileTag}</div>
                </div>
                <div class="comment-data">
                    <div class="comment-details">
                        <div class="commentor-username">${commentJSON['username']}</div>
                        <div class="commented-time">${commentJSON['naturaltime']}</div>
                    </div>
                    <div class="comment-content">
                        <div class="comment-media">${commentJSON['content_media_tag']}</div>
                        <div class="comment-text">${commentJSON['content_text']}</div>
                    </div>
                    <div class="comment-review">
                        <div class="comment-likescount">${commentJSON['likes_count']} ${unlikedSVG}</div>
                        <div class="comment-commentscount">${commentJSON['comments_count']} ${commentSVG}</div>
                    </div>
                </div>
            </a>
            `;
            
            comments_pane.innerHTML += HTMLbody;
        }
    }

    xhr.send();
    
}

for (uuid of comments_uuid_array ) {
    renderComment(uuid);
}

