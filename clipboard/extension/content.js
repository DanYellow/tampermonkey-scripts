chrome.runtime.onMessage.addListener(async (request) => {
  switch (request.message) {
    case "copyURL":
      await navigator.clipboard.writeText(request.textToCopy);
      break;
  }
});

function handleResponse(res) {
    console.log("res", res);
//   await navigator.clipboard.writeText(res);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

window.addEventListener("contextmenu", (event) => {
  if (event.button === 2) {
    const a = event.target.closest("a");
    if (a != null) {
      const message = chrome.runtime.sendMessage({
        message: "URLFromRightClick",
        url: a.href,
      });

      message.then((response) => {
        console.log("res", response.url);
      }, handleError);
    }
  }
});
