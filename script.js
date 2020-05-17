var comments = document.getElementsByClassName("_1YCqQVO-9r-Up6QPB9H6_4 _1YCqQVO-9r-Up6QPB9H6_4")[0].children;
//console.log(comments);

//for(i=0; i<comments.length; i++) {
for(i=15; i<20; i++) { //FIXME delete and uncomment past row
    var comment = comments[i].firstChild.firstChild;
    if (!comment.id.startsWith("moreComments")) {
        console.log(comment.id)
        requestURL = "https://api.pushshift.io/reddit/search/comment/?ids="+comment.id;
        // TESTING //
        function reqListener () {
          console.log(this.responseText);
        }
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", requestURL);
        oReq.send();
        // TESTING //
		// Issue: Receives API data out of order.
		// If I make this wait, a page with hella comments will take forever to load. No way.
		// Therefore, process all at once (LIKE IT IS CURRENTLY)
		//		and match them up as they come in? It may come in all at once.
		// Also fix the CORS issue...
    }
}