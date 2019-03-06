/* Tab Manager for Digital signs
Add-on for FireFox by Wilfredo Crespo
*/

//// TODO: Create Browser action with parameters, Enable tab limits, URL to restrict to.


//Get all the current tabs

//TODO: Setup, get all tabs, remove all but one
//Close every but the active window
//Setup listener for any new open Tabs
//Close them as they open

function setup() {
  let allTabsQuery = browser.tabs.query({});

  allTabsQuery.then( function(tabs){
    let tabIds = tabs.map(tabObj=>tabObj.id);
    console.log(tabIds);
    //Remove the first tab id, we will leave that one alone for now;
    tabIds.shift();
    console.log(tabIds);
  },
  onError);
}

console.log("im here");

var allTabs;



function onError(error) {
  console.log(`Error: ${error}`);
}

//allTabsQuery.then(onQuerySuccess,onError);

function onRemoved() {
  console.log(`Removed`);
}

function onQuerySuccess(tabs) {
  console.log(`Tabs: ${tabs.length}`);
  console.log(tabs);
  //var removing = browser.tabs.remove(14);
  //removing.then(onRemoved, onError);
}

function removeMe(tab) {
  console.log("go away");
  browser.tabs.remove(tab.id);
}
setup();
//browser.tabs.onCreated.addListener(removeMe)
