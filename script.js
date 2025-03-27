// Authentication function
function authenticate() {
    const code = document.getElementById('authCode').value;

    if (code === '1432') {
        document.getElementById('authentication').style.animation = 'fadeOut 1s forwards';
        
        setTimeout(() => {
            document.getElementById('authentication').style.display = 'none';  
            document.getElementById('dashboard').style.display = 'block';  
            fetchResumeUsers();  
            fetchGuests();  
        }, 1000);  
    } else {
        alert('Incorrect Code. Please try again!');
    }
}

// Fetch Resume Users from API and update the table
function fetchResumeUsers() {
    fetch("https://dashboard-be-qtaj.onrender.com/resumeusers") // Render backend URL
        .then(response => response.json())
        .then(data => {
            let userCountElement = document.getElementById("resumeusersCount");
            let userTable = document.getElementById("resumeusersTable");

            userCountElement.innerText = `Resume Users: ${data.totalCount}`;

            if (data.users.length === 0) {
                userTable.innerHTML += `<tr><td colspan="3">No users found</td></tr>`;
                return;
            }

            data.users.forEach(user => {
                let row = userTable.insertRow();
                row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.email}</td>`;
            });
        })
        .catch(error => console.error("Error fetching resume users:", error));
}

// Fetch Guests from API and update the table
function fetchGuests() {
    fetch("https://dashboard-be-qtaj.onrender.com/guests") // Render backend URL
        .then(response => response.json())
        .then(data => {
            let guestCountElement = document.getElementById("guestCount");
            let guestTable = document.getElementById("guestTable");

            guestCountElement.innerText = `Guests: ${data.totalCount}`;

            if (data.guests.length === 0) {
                guestTable.innerHTML += `<tr><td colspan="3">No guests found</td></tr>`;
                return;
            }

            data.guests.forEach(guest => {
                let row = guestTable.insertRow();
                row.innerHTML = `<td>${guest.id}</td><td>${guest.name}</td><td>${guest.access_time}</td>`;
            });
        })
        .catch(error => console.error("Error fetching guests:", error));
}

// Initialize the page and prompt for authentication
document.addEventListener("DOMContentLoaded", function () {
    // You can add any extra initialization code if needed here
});
