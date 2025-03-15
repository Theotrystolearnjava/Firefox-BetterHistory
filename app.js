document.addEventListener('DOMContentLoaded', function() {
	// Fetch history and display it in a table
	chrome.runtime.sendMessage({ command: "getAllHistory" }, function (historyItems) {
		const historyTable = document.getElementById("historyTable");
		const tbody = historyTable.querySelector("tbody");
		tbody.innerHTML = ""; // Clear previous entries
		
		historyItems.forEach((item) => {
			const row = document.createElement("tr");
			
			// Format the timestamp
			const time = new Date(item.lastVisitTime).toLocaleString();
			const timeCell = document.createElement("td");
			timeCell.classList.add("time");
			timeCell.textContent = time;
			
			// Create content cell
			const contentCell = document.createElement("td");
			contentCell.classList.add("content");
			
			// Create title span (if available)
			if (item.title) {
				const titleSpan = document.createElement("span");
				titleSpan.textContent = item.title + " - ";
				contentCell.appendChild(titleSpan);
			}
			
			// Create clickable link
			const link = document.createElement("a");
			link.classList.add("url");
			link.textContent = item.url;
			link.href = item.url;
			link.target = "_blank"; // Open in new tab
			
			// Append link after the title
			contentCell.appendChild(link);
			row.appendChild(timeCell);
			row.appendChild(contentCell);
			tbody.appendChild(row);
		});
	});
	
	// Dynamically change Search Bar width
	const searchBar = document.querySelector(".search-bar");
	
	const defaultWidth = searchBar.offsetWidth;
	const maxWidth = window.innerWidth * 0.35; // width: 35%;
	
	searchBar.addEventListener("input", function () {
		// Create a temporary span to measure text width
		const tempSpan = document.createElement("span");
		tempSpan.style.visibility = "hidden";
		tempSpan.style.whiteSpace = "nowrap";
		tempSpan.style.position = "absolute";
		tempSpan.style.font = window.getComputedStyle(searchBar).font;
		tempSpan.textContent = searchBar.value || " "; // Ensure at least one space for measuring
		
		document.body.appendChild(tempSpan);
		const textWidth = tempSpan.offsetWidth + 20; // Add padding buffer
		document.body.removeChild(tempSpan);
		
		// Adjust width but keep within limits
		this.style.width = Math.min(Math.max(defaultWidth, textWidth), maxWidth) + "px";
	});
});