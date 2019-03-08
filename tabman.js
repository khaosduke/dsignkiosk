/* Tab Manager for Digital signs
Add-on for FireFox by Wilfredo Crespo
*/

//// TODO: Create Browser action with parameters, Enable tab limits, URL to restrict to.


//Get all the current tabs

//TODO: Add whitelist function
var whitelistUrls = ["about:debugging"];

function urlWhiteListed(tab) {
  console.log(tab.url.match(whitelistUrls[0]));

  for (var i = 0; i<whitelistUrls.length-1;i++) {
    if (tab.url.match(whiteListUrls[i])) {
      console.log(tab.url);
      return true;
    }
  }
  console.log("returning false");
  return false;
}

function setup() {
  let allTabsQuery = browser.tabs.query({});

  allTabsQuery.then( function(tabs){
    let tabIds = tabs.map(tabObj=>tabObj.id);
    //Remove the first tab id, we will leave that one alone for now;
    tabIds.shift();
    //browser.tabs.remove(tabIds);

    //browser.tabs.onCreated.addListener(removeMe)

    //Check against whiteList
    let whiteListedTabs = tabs.filter(tabObj=>!urlWhiteListed(tabObj));
    //Tab urls
    let urls = whiteListedTabs.map(tabObj=>tabObj.url);
    console.log(urls);
  },
  onError);
}


function onError(error) {
  console.log(`Error: ${error}`);
}

function removeMe(tab) {
  console.log("go away");
  browser.tabs.remove(tab.id);
}
setup();
//browser.tabs.onCreated.addListener(removeMe)
