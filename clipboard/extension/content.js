chrome.runtime.onMessage.addListener(
  // this is the message listener
  async (request, sender, sendResponse) => {
    switch (request.message) {
        case "urlToCopy":
            await navigator.clipboard.writeText(request.textToCopy);
        break;
    }
  }
);
