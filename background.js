function openHistoryTab() {
	browser.tabs.create({ url: browser.runtime.getURL("index.html")})
}

browser.commands.onCommand.addListener((command) => {
	if (command === "open-better-history") {
		openHistoryTab();
	}
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.command === 'getAllHistory') {
		// Fetch the most recent 1000 visited sites
		chrome.history.search({
			text: '',  // No filtering
			maxResults: 1000
		}, function(historyItems) {
			sendResponse(historyItems);
		});
		
		return true; // Asynchronous response
	}
});