chrome.contextMenus.create({
    title: "GitHub",
    contexts: ["browser_action"],
    onclick: function () {
        window.open('https://github.com/', '_blank').focus();
    }
});