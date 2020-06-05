  ///////////////
 // Ryan Hall //
///////////////

try {
    var comments = document.getElementsByClassName("_1YCqQVO-9r-Up6QPB9H6_4 _1YCqQVO-9r-Up6QPB9H6_4")[0].children;
} catch (e) {console.log("NO COMMENTS FOUND AT ALL");}

function main(comments) {
    comments = document.getElementsByClassName("_1YCqQVO-9r-Up6QPB9H6_4 _1YCqQVO-9r-Up6QPB9H6_4")[0].children;
    var return_var = false;
    for(i=0; i<comments.length; i++) {
        var comment = comments[i].firstChild.firstChild.lastChild.lastChild.lastChild;
        try {
            if ((comment.firstChild.innerHTML == "Comment deleted by user" || comment.firstChild.innerHTML == "Comment removed by moderator") && !comment.innerHTML.includes('&nbsp;&nbsp;&nbsp;<button id="get-deleted-content" class="_374Hkkigy4E4srsI2WktEd">Reveal Deleted Comment</button>')) {
                var my_HTML = '&nbsp;&nbsp;&nbsp;<button id="get-deleted-content" class="_374Hkkigy4E4srsI2WktEd">Reveal Deleted Comment</button>'
                comment.innerHTML = comment.innerHTML + my_HTML
                return_var = true
            }
        } catch (e) {console.log('CATCH');}
    }
    if (return_var == false) {
        console.log('No comments to undelete??');
    } else {
        console.log('At least one button added??');
    }
    return return_var;
}

window.addEventListener('load', pageFullyLoaded, false);
function pageFullyLoaded(e) {
    window.setInterval(function(){
        try {
            comments = document.getElementsByClassName("_1YCqQVO-9r-Up6QPB9H6_4 _1YCqQVO-9r-Up6QPB9H6_4")[0].children;
            main(comments);
            document.getElementById('get-deleted-content').onclick = function() {
                get_deleted_content(this);
            }
        } catch (e) {}
    }, 1000);
}

/* window.onload = function(){} */

function get_deleted_content(undelete_button) {
    //console.log('running get_deleted_content...');
    var id = undelete_button.parentElement.parentElement.parentElement.parentElement.id;
    requestURL = "https://api.pushshift.io/reddit/search/comment/?ids="+id;
    function reqListener () {
        response = this.response;
        try {
            console.log('Deleted comment:\n\n' + response.data[0].body);
            alert('Deleted comment:\n\n' + response.data[0].body);
        } catch (e) {
            console.log("DELETED TOO QUICKLY");
            alert("DELETED TOO QUICKLY");
        }
    }
    var req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.responseType = 'json';
    req.open("GET", requestURL);
    req.send();
}

// CURRENT ISSUE: button does not always appear. Sometimes takes a page refresh to appear. Solution unknown atm.