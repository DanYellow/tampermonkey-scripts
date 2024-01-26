const urlRegex = /^(https?:\/\/)(www\.)?([^\/]+)/i

const listPostRegexes = [
    /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)\/status\/([a-zA-Z0-9_]+)/gi,
    /http(?:s)?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)\/(p|reel)\/([a-zA-Z0-9_]+)/gi,
    /http(?:s)?:\/\/(?:www\.)?tiktok\.com\/@([a-zA-Z0-9_.]+)\/video\/([0-9_]+)/gi,
    /http(?:s)?:\/\/(?:www\.)?reddit\.com\/r\/([a-zA-Z0-9_.]+)\/comments\/([a-zA-Z0-9]+)/gi,
    /http(?:s)?:\/\/(?:www\.)?nitter\.net\/([a-zA-Z0-9_]+)\/status\/([a-zA-Z0-9_]+)/gi,
]

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
        default:
            modifiedURL = null;
        break;
    }

    return modifiedURL;
}

const listAuthorizedSites = [
    "https://*.twitter.com/*",
    "https://*.instagram.com/*",
    "https://*.tiktok.com/*",
    "https://*.reddit.com/*",
    "https://*.nitter.net/*",
]
let URLFromATag = null; 

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "url-modifier-discord",
        title: "Copier pour Discord",
        contexts: ["all"],
        type: "normal",
        documentUrlPatterns: listAuthorizedSites
    });
});

const setURLToActiveTab = () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const matchPostURL = listPostRegexes.some((regex) => regex.test(currentTab.url))
        
        if(!matchPostURL && URLFromATag === null) {
            return;
        }

        const modifiedURL = updateURLForDiscord(currentTab.url);
        const resUrl = URLFromATag ? URLFromATag : modifiedURL;

        chrome.tabs.sendMessage(currentTab.id, {
            message: "copyURL",
            textToCopy: resUrl
        })
    });
}

chrome.contextMenus.onClicked.addListener((info) => {
  switch (info.menuItemId) {
    case "url-modifier-discord":
        setURLToActiveTab();
    break;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.message) {
        case "URLFromRightClick":
            if(request.url !== null && listPostRegexes.some((regex) => regex.test(request.url))) {
                URLFromATag = updateURLForDiscord(request.url);
            } else {
                URLFromATag = null;
            }
        break;
    }
});

// chrome.commands.onCommand.addListener(function (command) {
//     switch (command) {
//         case 'duplicate_tab':
//             setURLToActiveTab();
//         break;
        
//         default:
//             console.log(`Command ${command} not found`);
//         break;
//     }
// });
