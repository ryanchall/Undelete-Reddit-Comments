  /////////
 // WIP //
/////////   

comments = document.getElementsByClassName("_1YCqQVO-9r-Up6QPB9H6_4 _1YCqQVO-9r-Up6QPB9H6_4")[0].children;

function main(comments) {
    return_var = false;
    for(i=0; i<comments.length; i++) {
        var comment = comments[i].firstChild.firstChild.lastChild.lastChild.lastChild;
        try {
            if (comment.firstChild.innerHTML == "Comment deleted by user" && !comment.innerHTML.includes('&nbsp;&nbsp;&nbsp;<button id="get-deleted-content" class="_374Hkkigy4E4srsI2WktEd">ATTEMPT to Reveal Deleted Comment</button>')) {
                //console.log(comment.firstChild.innerHTML)
                //console.log(comment)
                my_HTML = '&nbsp;&nbsp;&nbsp;<button id="get-deleted-content" class="_374Hkkigy4E4srsI2WktEd">ATTEMPT to Reveal Deleted Comment</button>'
                comment.innerHTML = comment.innerHTML + my_HTML
                return_var = true
            }
        } catch (e) {console.log('CATCH');}
        //console.log('EXTENSION SORTA WORKING!');
    }
    return return_var;
}

window.addEventListener('load', pageFullyLoaded, false);
function pageFullyLoaded(e) {
    window.setInterval(function(){
        main(comments);
        document.getElementById('get-deleted-content').onclick = function() {
            get_deleted_content(this);
        }
    }, 3000);
}

window.onload = function(){
    try {
        document.getElementById('get-deleted-content').onclick = function() {
            get_deleted_content(this);
        }
    } catch (e) {}
}

function get_deleted_content(undelete_button) {
    console.log('running get_deleted_content...');
    clearInterval();
    id = undelete_button.parentElement.parentElement.parentElement.parentElement.id;
    requestURL = "https://api.pushshift.io/reddit/search/comment/?ids="+id;
    function reqListener () {
        response = this.response;
        console.log(response.data[0].body);
        alert(response.data[0].body);
    }
    var req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.responseType = 'json';
    req.open("GET", requestURL);
    req.send();
    return false
}

// CURRENT ISSUE: "Uncaught ReferenceError: get_deleted_content is not defined at HTMLButtonElement.onclick ((index):1)"