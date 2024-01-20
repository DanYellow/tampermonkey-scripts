// ==UserScript==
// @name         URL modifier for Discord
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  try to take over the world!
// @author       You
// @match        https://*.twitter.com/*/status/*
// @match        https://*.instagram.com/*
// @match        https://*.tiktok.com/@
// @exclude      https://*.twitter.com/i/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mozilla.org
// @grant        none
// ==/UserScript==
(function() {
    // Create notification
    const notificationContainer = document.createElement("p");
    notificationContainer.style.position = "absolute";
    notificationContainer.style.top = "-100%";
    notificationContainer.style.left = "50%";
    notificationContainer.style.transform = "translateX(-50%)";
    notificationContainer.style.zIndex = "9999";
    notificationContainer.style.padding = "0.5rem";
    notificationContainer.style.borderRadius = "0.5rem";
    notificationContainer.style.fontFamily = "sans-serif";
    notificationContainer.style.color = "white";

    document.body.prepend(notificationContainer)

    // Function to handle the document click event
    const handleClick = () => {
        // Get the current URL
        const currentURL = window.location.href;
        let modifiedURL = null;

        // Modifies the URL to use
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

        // Copy the modified URL to the clipboard
        navigator.clipboard.writeText(modifiedURL)
        .then(() => {
            notificationContainer.style.backgroundColor = "darkgreen";
            notificationContainer.textContent = "URL copiée et modifiée !";
            console.log('Modified URL copied to clipboard:', modifiedURL);
        })
        .catch((error) => {
            notificationContainer.textContent = "Quelque chose s'est mal passé";
            console.error('Failed to copy the modified URL:', error);
        }).finally(() => {
            notificationContainer.style.top = "0";
            setTimeout(() => {
                notificationContainer.style.top = "-100%";
            }, 4500)
        });
    }

    // Create notification
    const urlModifierButton = document.createElement("button");
    urlModifierButton.textContent = "Copier l'URL pour Discord";
    urlModifierButton.style.position = "absolute";
    urlModifierButton.style.left = "50%";
    urlModifierButton.style.transform = "translateX(-50%)";
    urlModifierButton.style.zIndex = "9999";
    urlModifierButton.style.padding = "0.5rem";
    urlModifierButton.style.borderRadius = "0.5rem";
    urlModifierButton.style.fontFamily = "sans-serif";
    urlModifierButton.style.appearance = "button";
    // urlModifierButton.style.color = "black";
    // urlModifierButton.style.backgroundColor = "white";
    urlModifierButton.type = "button";
    urlModifierButton.onclick = handleClick;
    document.body.prepend(urlModifierButton)
    
    // // Add a click event listener to the document
    // document.addEventListener('click', handleClick);
})();