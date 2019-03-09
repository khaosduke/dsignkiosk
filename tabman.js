/* Tab Manager for Digital signs
Add-on for FireFox by Wilfredo Crespo
*/

var whitelistUrls = ["about:debugging",
                     "about:addons"];


var pulledOptions = {};

function setup() {
  console.log("Setting up...");
  let allTabsQuery = browser.tabs.query({});

  allTabsQuery.then( function(tabs) {
    //Save the first tab
    tabs.shift();
    //Check against our whitelist
    let tabsToKill = tabs.filter(tabObj=>!urlWhitelisted(tabObj));
    //Get all our non white listed tab ids
    let tabIdsToKill = tabsToKill.map(tabObj=>tabObj.id);
    //browser.tabs.remove(tabIdsToKill);

  },
  onError);
}

function getSettings() {
  return new Promise((resolve, reject)=>{
    function setOptions(result) {
      pulledOptions = result;
      //console.log(pulledOptions);
      resolve(true);
    }
    let getting = browser.storage.sync.get(["autoFullscreen"]);
    getting.then(setOptions, onError);
  });
}


function urlWhitelisted(tab) {
  for (var index in whitelistUrls) {
    if (tab.url.match(whitelistUrls[index])) {
      return true;
    }
  }
  return false;
}


function fullscreen() {
  //console.log(pulledOptions.autoFullscreen);
  if(pulledOptions.autoFullscreen) {
    console.log("where am i?");
    browser.windows.getAll().then((windowInfoArray) => {
    	for (currentWindow of windowInfoArray) {
    		browser.windows.update(currentWindow.id, {state: "fullscreen"});
    	}
    }, onError);
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function removeMe(tab) {
  browser.tabs.remove(tab.id);
}


getSettings().then((result)=> {
  fullscreen();
});
//setup();
//browser.tabs.onCreated.addListener(removeMe)
//fullscreen();
