  ///////////////
 // Ryan Hall //
///////////////

try {
    var comments = document.getElementsByClassName("_1YCqQVO-9r-Up6QPB9H6_4 _1YCqQVO-9r-Up6QPB9H6_4")[0].children;
} catch (e) {
    console.log("NO COMMENTS FOUND AT ALL");
}

function main(comments) {
    comments = document.getElementsByClassName("_1YCqQVO-9r-Up6QPB9H6_4 _1YCqQVO-9r-Up6QPB9H6_4")[0].children;
    var return_var = false;
    for(i=0; i<comments.length; i++) {
        var comment = comments[i].firstChild.firstChild.firstChild.lastChild.lastChild;
        comment = comment.getElementsByClassName("_1S45SPAIb30fsXtEcKPSdt _3ezOJqKdLbgkHsXcfvS5SA")[0];
        //console.log(comment);
        try {
            //if ((comment.firstChild.innerHTML == "Comment deleted by user" || comment.firstChild.innerHTML == "Comment removed by moderator") && !comment.innerHTML.includes('&nbsp;&nbsp;&nbsp;<button id="get-original-content" class="_374Hkkigy4E4srsI2WktEd">Reveal Original Comment</button>')) {
            if (!comment.innerHTML.includes('&nbsp;&nbsp;&nbsp;<button id="get-original-content" class="_374Hkkigy4E4srsI2WktEd">Reveal Original Comment</button>')) {
                var my_HTML = '&nbsp;&nbsp;&nbsp;<button id="get-original-content" class="_374Hkkigy4E4srsI2WktEd">Reveal Original Comment</button>'
                comment.innerHTML = comment.innerHTML + my_HTML
                return_var = true
            }
        } catch (e) {
            //console.log('CATCH');
        }
    }
    return return_var;
}

window.addEventListener('load', pageFullyLoaded, false);
function pageFullyLoaded(e) {
    window.setInterval(function(){
        try {
            comments = document.getElementsByClassName("_1YCqQVO-9r-Up6QPB9H6_4 _1YCqQVO-9r-Up6QPB9H6_4")[0].children;
            main(comments);
            document.getElementById('get-original-content').onclick = function() {
                console.log("BUTTON PRESSED");
                get_deleted_content(this);
            }
        } catch (e) {}
    }, 1000);
}

/* window.onload = function(){} */

function get_deleted_content(undelete_button) {
    //console.log('running get_deleted_content...');
    var id = undelete_button.parentElement.parentElement.parentElement.parentElement.id;
    console.log('Finding deleted content from comment with ID ' + id);
    requestURL = "https://api.pushshift.io/reddit/search/comment/?ids="+id;
    function reqListener () {
        response = this.response;
        try {
            if (response.data[0].body == '[deleted]') {
                console.log("DELETED TOO QUICKLY");
                alert("DELETED TOO QUICKLY");
            } else if (response.data[0].body == '[removed]') {
                console.log("REMOVED TOO QUICKLY");
                alert("REMOVED TOO QUICKLY");
            } else {
                console.log('Deleted comment:\n\n' + response.data[0].body);
                alert('Deleted comment:\n\n' + response.data[0].body);
            }
        } catch (e) {
            console.log("DELETED OR REMOVED TOO QUICKLY");
            alert("DELETED OR REMOVED TOO QUICKLY");
        }
    }
    var req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.responseType = 'json';
    req.open("GET", requestURL);
    req.timeout = 5000;
    req.ontimeout = function(e) {
        console.log('API to retrieve content timed out (5 seconds). This is a Pushshift server issue; there is nothing I can do. Sorry chaps.');
    }
    req.send();
}


// CURRENT ISSUE(S)

// Children comments might not get undeleted?
