

function restoreOptions() {

  function setCurrentChoices(result) {
    document.querySelector("#auto-fullscreen").checked = result['autoFullscreen'] || null;
    document.querySelector("#url").value = result['url'] || null;
  }

  function onError(error) {
    document.querySelector("#error-content").innerHTML = "Could not save settings :("

  }

  var getting = browser.storage.sync.get(["autoFullscreen","url"]);
  getting.then(setCurrentChoices, onError);
}

function saveOptions(e) {
  e.preventDefault();
  console.log(document.querySelector('#auto-fullscreen').checked);
  browser.storage.sync.set({
    autoFullscreen: document.querySelector('#auto-fullscreen').checked,
    url: document.querySelector('#url').value
  });

  document.querySelector("#saved").innerHTML = "Saved!";
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
