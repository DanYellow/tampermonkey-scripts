// ==UserScript==
// @name         URL modifier for Discord
// @namespace    http://tampermonkey.net/
// @version      2024-01-20
// @description  try to take over the world!
// @author       You
// @match        https://*.twitter.com/*
// @match        https://*.instagram.com/*
// @match        https://*.tiktok.com/*
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
    
    // Add a click event listener to the document
    document.addEventListener('click', handleClick);
})();