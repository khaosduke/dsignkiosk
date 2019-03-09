/* Tab Manager for Digital signs
Add-on for FireFox by Wilfredo Crespo
*/

var whitelistUrls = ["about:debugging",
                     "about:addons"];


var pulledOptions = {};

function setup() {
  console.log("Setting up...");
  return new Promise((resolve, reject)=>{
    let allTabsQuery = browser.tabs.query({});

    allTabsQuery.then( function(tabs) {
      //Save the first tab
      tabs.shift();
      //Check against our whitelist
      let tabsToKill = tabs.filter(tabObj=>!urlWhitelisted(tabObj));
      //Get all our non white listed tab ids
      let tabIdsToKill = tabsToKill.map(tabObj=>tabObj.id);
      //browser.tabs.remove(tabIdsToKill);
      console.log(`Removing ${tabIdsToKill.length} tabs`);
      resolve(true);
    },
    onError);
  });
}

function getSettings() {
  console.log("Getting settings...");
  return new Promise((resolve, reject)=>{
    function setOptions(result) {
      pulledOptions = result.autoFullscreen;
      whitelistUrls.push(result.url);
      resolve(true);
    }
    let getting = browser.storage.sync.get(["autoFullscreen","url"]);
    getting.then(setOptions, onError);
  });
}


function urlWhitelisted(tab) {
  console.log("Checking against white listed URLs");
  for (url of whitelistUrls) {
    if (tab.url.match(url)) {
      return true;
    }
  }
  return false;
}


function fullscreen() {
  console.log("Going to full screen mode");
  return new Promise((resolve,reject)=> {
    if(pulledOptions.autoFullscreen) {
      browser.windows.getAll().then((windowInfoArray) => {
      	for (currentWindow of windowInfoArray) {
      		browser.windows.update(currentWindow.id, {state: "fullscreen"});
      	}
      }, onError);
    }
    resolve(true);
  });
}

function onError(error) {
  //General error function for all rejected promises
  console.log(`Error: ${error}`);
}

function removeMe(tab) {
  console.log("Tab opened, closing it");
  //browser.tabs.remove(tab.id);
}

//Make sure settings are pulled then proceed to setup and implementing the options
getSettings().then((result)=> {
  setup();
}).then((result)=> {
  fullscreen();
  //Setup listener
  browser.tabs.onCreated.addListener(removeMe);
});

//
