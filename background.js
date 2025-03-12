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
		// Fetch all history data (up to a max limit of 1000 results)
		chrome.history.search({
			text: '',  // Empty string means no filtering
			maxResults: 1000  // Limit the number of items fetched (adjust as necessary)
		}, function(historyItems) {
			sendResponse(historyItems);
		});
		
		return true; // Asynchronous response
	}
});