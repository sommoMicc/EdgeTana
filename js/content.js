// get the URL of the page
let url = document.location.href;
const searchParameter = "search?q=";
//if you're visiting bing and you've set an override rule

browser.storage.sync.get("searchEngine",(newSearchEngine) => {
    if (url.indexOf("//www.bing") != -1 && newSearchEngine != null) {
        let urlPieces = url.split("/");
        let i = 0;
        for(i=0; i<urlPieces.length; i++) {
            //Look for the right part of the url that contains the parameters
            if(urlPieces[i].indexOf(searchParameter) != -1) {
                break;
            }
        }
        //if search parameter was found
        if(i != urlPieces.length) {
            let parameters = urlPieces[urlPieces.length-1].split("&");
            for(let j=0; j<urlPieces.length; j++) {
                //Look for the right parameter
                if(urlPieces[i].indexOf(searchParameter) != -1) {
                    switch(newSearchEngine.searchEngine) {
                        case "google":
                            document.location.href = "https://www.google.com/" + 
                                urlPieces[i];
                        break;
                        case "ddg":
                            document.location.href = "https://duckduckgo.com?q=" + 
                                urlPieces[i].replace(searchParameter,"");
                        break;
                    }
                    return;
                }
            }
        }
    }
});