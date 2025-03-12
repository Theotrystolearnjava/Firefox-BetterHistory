document.addEventListener('DOMContentLoaded', function() {
	chrome.runtime.sendMessage({ command: 'getAllHistory' }, function(historyItems) {
		const historyList = document.getElementById('historyList');
		historyList.innerHTML = ''; // Clear the list before populating
		
		historyItems.forEach(item => {
			const listItem = document.createElement('li');
			
			// Format the timestamp
			const time = new Date(item.lastVisitTime);
			const formattedTime = time.toLocaleString();
			
			// Create time element
			const timeElement = document.createElement('span');
			timeElement.classList.add('time');
			timeElement.textContent = formattedTime + " - ";
			
			// Create title element (or URL if title is missing)
			const titleElement = document.createElement('span');
			titleElement.classList.add('title');
			titleElement.textContent = item.title ? item.title + " - " : "";
			
			// Create URL element
			const urlElement = document.createElement('a');
			urlElement.classList.add('url');
			urlElement.textContent = item.url;
			urlElement.href = item.url;
			urlElement.target = "_blank"; // Open in new tab
			
			// Append elements
			listItem.appendChild(timeElement);
			listItem.appendChild(titleElement);
			listItem.appendChild(urlElement);
			historyList.appendChild(listItem);
		});
	});
});