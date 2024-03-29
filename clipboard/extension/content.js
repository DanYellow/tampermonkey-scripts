chrome.runtime.onMessage.addListener(async (request) => {
  switch (request.message) {
    case "copyURL":
      await navigator.clipboard.writeText(request.textToCopy);
      break;
  }
});

window.addEventListener("contextmenu", (event) => {
  if (event.button === 2) {
    const a = event.target.closest("a");
    let link = null;
    if (a != null) {
      link = a.href;
    }

    chrome.runtime.sendMessage({
      message: "URLFromRightClick",
      url: link,
    });
  }
});
