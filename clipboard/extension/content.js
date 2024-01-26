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

    var port = chrome.runtime.connect({name: "knockknock"});
port.postMessage({joke: "Knock knock"});

    // (async () => {
    //     const response = await chrome.runtime.sendMessage({
    //         message: "URLFromRightClick",
    //         url: link,
    //       });
    //     // do something with response here, not outside the function
    //     console.log(response);
    //   })();
  }
});
