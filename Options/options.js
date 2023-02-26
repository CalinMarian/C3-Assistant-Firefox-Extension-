function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    signature: document.querySelector("#signature").value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#signature").value = result.signature || "none";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("signature");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);