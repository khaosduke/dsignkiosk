/* Tab Manager for Digital signs
Add-on for FireFox by Wilfredo Crespo
*/

//// TODO: Create Browser action with parameters, Enable tab limits, URL to restrict to.


//Get all the current tabs

console.log("im here");
var allTabsQuery = browser.tabs.query({});
var allTabs;

function onQuerySuccess(tabs) {
  console.log(`Tabs: ${tabs.length}`);
  var removing = tabs.remove(1);
  removing.then(onRemoved, onError);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

allTabsQuery.then(onQuerySuccess,onError);

function onRemoved() {
  console.log(`Removed`);
}
