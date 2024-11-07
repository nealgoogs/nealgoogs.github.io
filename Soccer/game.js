// game.js

// Function to fetch match data from the backend
async function fetchMatches() {
    try {
        const response = await fetch('https://gobackend-2b8d.onrender.com/api/matches'); // Ensure this URL is correct  ('https://gobackend-2b8d.onrender.com/api/epl-matches');  'http://localhost:8080/api/epl-matches'
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const matches = await response.json();
        displayMatches(matches);
    } catch (error) {
        console.error('Error fetching matches:', error);
        document.getElementById('matches-container').innerText = 'Failed to load matches.';
    }
}

// Function to display matches in the container
function displayMatches(matches) {
    const container = document.getElementById('matches-container');
    container.innerHTML = ''; // Clear previous content

    for (const time in matches) {
        const matchList = matches[time];
        const timeHeader = document.createElement('h3');
        timeHeader.innerText = time; // Display match time
        container.appendChild(timeHeader);

        const list = document.createElement('ul');
        matchList.forEach(match => {
            const listItem = document.createElement('li');
            listItem.innerText = `${match.team1} vs ${match.team2}`; // Access team1 and team2 properties
            list.appendChild(listItem);
        });
        container.appendChild(list);
    }
}

// Fetch matches when the page loads
window.onload = fetchMatches;