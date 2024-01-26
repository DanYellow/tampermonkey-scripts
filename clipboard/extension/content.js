chrome.runtime.onMessage.addListener(async (request) => {
  switch (request.message) {
    case "copyURL":
      await navigator.clipboard.writeText(request.textToCopy);
      break;
  }
});

window.addEventListener("contextmenu", (event) => {
    if(event.button === 2) {
        chrome.runtime.sendMessage({
            message: "URLFromRightClick",
            url: "test"
        }, () => {})
        const a = event.target.closest("a");
        if(a != null) {
            console.log(a.href);
        }
  }
});
