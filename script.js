function loginStudent() {
    var name = document.getElementById("name").value;
    var regno = document.getElementById("regno").value;
    var email = document.getElementById("email").value;

    if (name === "" || regno === "" || email === "") {
        alert("Please fill all the fields");
        return false;
    }

    // Store user info in localStorage for dashboard
    var userInfo = {
        name: name,
        regno: regno,
        email: email,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Simple success message
    alert("Login successful! Welcome " + name);

    // Redirect to dashboard
   window.location.href = "dashboard.html";


    return false; // prevent form refresh
}





/* ===============================
   EVENT REGISTRATION JAVASCRIPT
   =============================== */

/* Toggle upcoming events section */
function toggleEvents() {
    var eventSection = document.getElementById("eventSection");
    var toggleHeader = document.getElementById("toggleHeader");

    if (eventSection.style.display === "none" || eventSection.style.display === "") {
        eventSection.style.display = "block";
        toggleHeader.innerHTML = "▼ Do you want to register for any upcoming event?";
    } else {
        eventSection.style.display = "none";
        toggleHeader.innerHTML = "▶ Do you want to register for any upcoming event?";
    }
}

/* Show registration form after selecting event */
function showForm() {
    var eventSelect = document.getElementById("eventSelect");
    var formSection = document.getElementById("formSection");
    var selectedEventInput = document.getElementById("selectedEvent");

    if (eventSelect.value !== "") {
        formSection.style.display = "block";
        selectedEventInput.value = eventSelect.value;
    } else {
        formSection.style.display = "none";
        selectedEventInput.value = "";
    }
}

/* Handle registration submission */
function registerEvent(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('reg_name');
    const regno = document.getElementById('reg_no');
    const email = document.getElementById('reg_email');
    const selectedEvent = document.getElementById('selectedEvent');
    const phone = document.getElementById('reg_phone');
    // basic HTML5 validity checks
    if (!name.checkValidity()) { name.focus(); return false; }
    if (!regno.checkValidity()) { regno.focus(); return false; }
    if (!email.checkValidity()) { email.focus(); return false; }
    if (!selectedEvent.value) { alert('Please choose an event.'); return false; }

    // build registration object
    const reg = {
        name: name.value.trim(),
        regno: regno.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        event: selectedEvent.value,
        course: document.getElementById('reg_course').value,
        teamSize: document.getElementById('reg_team').value || 1,
        notes: document.getElementById('reg_notes').value.trim(),
        submittedAt: new Date().toISOString()
    };

    // store in localStorage array
    const key = 'eventRegistrations';
    try {
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push(reg);
        localStorage.setItem(key, JSON.stringify(existing));
    } catch (err) {
        console.error('storage error', err);
    }

    // show success message
    const success = document.getElementById('regSuccess');
    success.style.display = 'block';
    // clear form after small delay
    setTimeout(() => {
        document.getElementById('eventRegForm').reset();
        success.style.display = 'none';
        // hide form and collapse section
        document.getElementById('formSection').style.display = 'none';
        document.getElementById('eventSection').style.display = 'none';
        document.getElementById('toggleHeader').innerHTML = '▶ Do you want to register for any upcoming event?';
    }, 1200);

    return false;
}



document.addEventListener("DOMContentLoaded", function() {
    // Event data
    const events = {
        acting: "Acting events include theater performances and short plays organized by students.",
        singing: "Singing competitions include solo and group performances, judged by experts.",
        drama: "Drama events allow students to showcase creativity through skits and plays.",
        dance: "Dance events include classical, contemporary, and fusion performances.",
        coding: "Technical events like coding contests and hackathons enhance problem-solving skills."
    };

    // Get references
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("eventSearch");
    const resultDiv = document.getElementById("searchResult");

    // Click event
    searchBtn.addEventListener("click", function() {
        const query = searchInput.value.trim().toLowerCase(); // trim spaces
        if(query === "") {
            resultDiv.style.display = "block";
            resultDiv.innerHTML = "Please enter an event to search.";
            return;
        }

        if(events[query]){
            resultDiv.style.display = "block";
            resultDiv.innerHTML = `<b>${query.charAt(0).toUpperCase() + query.slice(1)}:</b> ${events[query]}`;
        } else {
            resultDiv.style.display = "block";
            resultDiv.innerHTML = "No information found for this event.";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {

    fetch("events.xml")
    .then(response => response.text())
    .then(data => {

        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");

        const events = xml.getElementsByTagName("event");
        const table = document.getElementById("eventsTable");

        if (!table) return; // prevents error on other pages

        for (let i = 0; i < events.length; i++) {

            let row = table.insertRow();

            row.insertCell(0).innerHTML = events[i].getElementsByTagName("name")[0].textContent;
            row.insertCell(1).innerHTML = events[i].getElementsByTagName("date")[0].textContent;
            row.insertCell(2).innerHTML = events[i].getElementsByTagName("time")[0].textContent;
            row.insertCell(3).innerHTML = events[i].getElementsByTagName("venue")[0].textContent;
            row.insertCell(4).innerHTML = events[i].getElementsByTagName("organizer")[0].textContent;
            row.insertCell(5).innerHTML = events[i].getElementsByTagName("description")[0].textContent;

        }

    });

});