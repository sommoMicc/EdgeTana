// get the buttons by id
let google = document.getElementById('google');
let ddg = document.getElementById('ddg');
let reset = document.getElementById('reset');

// use tabs.insertCSS to change header color on button click
browser.storage.sync.get("searchEngine",(newSearchEngine) => {
  if(newSearchEngine == null) {
    reset.className="";
    google.className="inactive";
    ddg.className="inactive";
  }
  else {
    reset.className="inactive";
    switch(newSearchEngine.searchEngine) {
      case "google":
        google.className="";
        ddg.className="inactive";
      break;
      default:
        ddg.className="";
        google.className="inactive";
      break;
    }
  }
});
// red
ddg.onclick = function(event) {
  changeSearchEngine("ddg");
};

// blue
google.onclick = function(event) {
  changeSearchEngine("google");
};

// back to original
reset.onclick = function(event) {
  changeSearchEngine(null);
};

function changeSearchEngine(newSearchEngine) {
  let messageContent = null;

  if(newSearchEngine == null) {
    messageContent = "Default search engine restored";

    browser.storage.sync.remove("searchEngine")
    showSuccess(messageContent);
    reset.className="";
    google.className="inactive";
    ddg.className="inactive";
  }
  else {
    reset.className="inactive";

    switch(newSearchEngine) {
      case "google":
        google.className="";
        ddg.className="inactive";
      break;
      default:
        ddg.className="";
        google.className="inactive";
      break;
    }
    messageContent = "New search engine saved successfully";

    browser.storage.sync.set({"searchEngine":newSearchEngine});
    showSuccess(messageContent);
  }

}

function showSuccess(messageContent) {
  //Clear any previous messages
  let elementsToRemove = document.getElementsByClassName("message");
  while(elementsToRemove[0]) {
    elementsToRemove[0].parentNode.removeChild(elementsToRemove[0]);
  }
  //Creation and display of new message
  var newSpan = document.createElement("span");
  newSpan.className = "message";
  newSpan.innerHTML = messageContent;

  document.body.appendChild(newSpan);
  setTimeout(function() {
    document.body.removeChild(newSpan);
  },4000);
}