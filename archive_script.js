  /////////
 // WIP //
/////////

comments = document.getElementsByClassName("_1YCqQVO-9r-Up6QPB9H6_4 _1YCqQVO-9r-Up6QPB9H6_4")[0].children

function get_deleted_content(undelete_button) {
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

function main(comments) {
    for(i=0; i<comments.length; i++) {
        var comment = comments[i].firstChild.firstChild.lastChild.lastChild.lastChild;
        try {
            if (comment.firstChild.innerHTML == "Comment deleted by user") {
                //console.log(comment.firstChild.innerHTML)
                //console.log(comment)
                my_HTML = '&nbsp;&nbsp;&nbsp;<button onclick="get_deleted_content(this)" class="_374Hkkigy4E4srsI2WktEd">ATTEMPT to Reveal Deleted Comment</button>'
                comment.innerHTML = comment.innerHTML + my_HTML
            } 
        } catch (e) {console.log('CATCH');}
		console.log('EXTENSION SORTA WORKING!');
    }
    return false
}

window.addEventListener("load", pageFullyLoaded, false);
function pageFullyLoaded(e) {
    main(comments)
}

// CURRENT ISSUE: the button is added briefly before Reddit finishes loading and "deletes" my changes. RIP. No solution direction known, do more research.