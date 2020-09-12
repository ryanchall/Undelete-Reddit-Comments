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
        try {
            if (!comment.innerHTML.includes('&nbsp;&nbsp;&nbsp;<button class="get-original-content _374Hkkigy4E4srsI2WktEd">Reveal Original Comment</button>')) {
                var my_HTML = '&nbsp;&nbsp;&nbsp;<button class="get-original-content _374Hkkigy4E4srsI2WktEd">Reveal Original Comment</button>'
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
            comments_to_revert =  document.getElementsByClassName('get-original-content')
            for (var i = 0; i < comments_to_revert.length; i++) {
                comments_to_revert[i].onclick = function() {
                    console.log("BUTTON PRESSED");
                    get_deleted_content(this, 5000);
                }
            }
        } catch (e) {}
    }, 1000);
}


function get_deleted_content(undelete_button, timeout) {
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
                alert('To copy the text, open the console\nDeleted comment:\n\n' + response.data[0].body);
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
    req.timeout = timeout;
    req.ontimeout = function(e) {
        console.log('API to retrieve content timed out (default 5 seconds). Sorry pal. No amount of optimization on my end will make a difference—this is from the Pushshift servers (which are amazing! most of the time)');
        if (confirm('API to retrieve content timed out (default 5 seconds). To try again with a 15 second timeout, click "OK". To cancel, click "Cancel."\n\nIf a 15 second timeout fails, there is likely an issue with the Pushshift servers from which this content is retrieved. Try again later.')) {
            get_deleted_content(undelete_button, 15000)
        }
    }
    req.send();
}


// CURRENT ISSUE(S)

// None known! Although I need to add support for old reddit.
