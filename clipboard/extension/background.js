const urlRegex = /^(https?:\/\/)(www\.)?([^\/]+)/i
const updateURLForDiscord = (currentURL) => {
    let modifiedURL = "";
    switch (true) {
        case currentURL.includes("twitter"):
        case currentURL.includes("nitter"):
            modifiedURL = currentURL.replace(urlRegex, "$1fxtwitter.com");
        break;
        case currentURL.includes("instagram"):
            modifiedURL = currentURL.replace(urlRegex, "$1ddinstagram.com");
        break;
        case currentURL.includes("tiktok"):
            modifiedURL = currentURL.replace(urlRegex, "$1vxtiktok.com");
        break;
        case currentURL.includes("reddit"):
            modifiedURL = currentURL.replace(urlRegex, "$1vxreddit.com");
        break;
    }

    return modifiedURL;
}

const listAuthorizedSites = [
    "https://*.twitter.com/*/status/*",
    "https://*.instagram.com/*",
    "https://*.tiktok.com/@*",
    "https://*.reddit.com/r/*",
    "https://*.nitter.net/*/status/*",
]

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create(
    {
        id: "url-modifier-discord",
        title: "Copier pour Discord (Alt+Shift+X)",
        contexts: ["all"],
        type: "normal",
        documentUrlPatterns: listAuthorizedSites
    }
    );
});

const setURLToActiveTab = () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const modifiedURL = updateURLForDiscord(currentTab.url);
        chrome.tabs.sendMessage(currentTab.id, {
            message: "copyURL",
            textToCopy: modifiedURL
        }, () => {})
    });
}

chrome.contextMenus.onClicked.addListener((info) => {
  switch (info.menuItemId) {
    case "url-modifier-discord":
        setURLToActiveTab();
    break;
  }
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    switch (request.message) {
        case "URLFromRightClick":
            // chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            //     const currentTab = tabs[0];
            //     const modifiedURL = updateURLForDiscord(request.url);
            //     chrome.tabs.sendMessage(currentTab.id, {
            //         message: "copyURL",
            //         textToCopy: modifiedURL
            //     }, () => {})
            // });
        break;
    }
});

chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'duplicate_tab':
            setURLToActiveTab();
        break;
        
        default:
            console.log(`Command ${command} not found`);
        break;
    }
});
