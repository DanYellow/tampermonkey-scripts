const updateURLForDiscord = (currentURL) => {
    switch (true) {
        case currentURL.includes("twitter"):
            modifiedURL = currentURL.replace(/^(https?:\/\/)(www\.)?([^\/]+)/i, "$1fxtwitter.com");
        break;
        case currentURL.includes("instagram"):
            modifiedURL = currentURL.replace(/^(https?:\/\/)(www\.)?([^\/]+)/i, "$1ddinstagram.com");
        break;
        case currentURL.includes("tiktok"):
            modifiedURL = currentURL.replace(/^(https?:\/\/)(www\.)?([^\/]+)/i, "$1vxtiktok.com");
        break;
        default:
            modifiedURL = currentURL.replace(/^(https?:\/\/)(www\.)?([^\/]+)/i, "$1fxtwitter.com");
        break;
    }

    return modifiedURL;
}

const listAuthorizedSites = [
    "https://*.twitter.com/*/status/*",
    "https://*.instagram.com/*",
    "https://*.tiktok.com/@*",
]

browser.menus.create(
  {
    id: "url-modifier-discord",
    title: "Copier pour Discord",
    contexts: ["all"],
    type: "normal",
    documentUrlPatterns: listAuthorizedSites
  }
);

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "url-modifier-discord":
        browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            const modifiedURL = updateURLForDiscord(currentTab.url);
            browser.tabs.sendMessage(currentTab.id, {
                message: "copyURL",
                textToCopy: modifiedURL
            }, (res) => {
                console.log("ff" + res);
            })
        });
    break;
  }
});
