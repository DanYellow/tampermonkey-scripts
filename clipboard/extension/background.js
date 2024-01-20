function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.menus.create(
  {
    id: "url-modifier-discord",
    title: "Copier pour Discord",
    contexts: ["all"],
  }
);

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "url-modifier-discord":
        browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        let url = tabs[0].url;
        console.log("f", url)
        // use `url` here inside the callback because it's asynchronous!
      });
      break;
  }
});
