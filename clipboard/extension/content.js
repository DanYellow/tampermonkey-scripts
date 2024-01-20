chrome.runtime.onMessage.addListener(async (request) => {
  switch (request.message) {
    case "copyURL":
      await navigator.clipboard.writeText(request.textToCopy);
      break;
  }
});
