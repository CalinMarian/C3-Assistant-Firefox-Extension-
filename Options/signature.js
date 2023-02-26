function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  let signature = "none";
  if (item.signature) {
    signature = item.signature;
  }
}

const getting = browser.storage.sync.get("signature");
getting.then(onGot, onError);