async function loadStats() {

    const response =
        await fetch(
            "http://localhost:5000/api/leads/stats"
        );

    const data =
        await response.json();

    document.getElementById("total")
        .innerText = data.total || 0;

    document.getElementById("newLeads")
        .innerText = data.newLeads || 0;

    document.getElementById("contacted")
        .innerText = data.contacted || 0;

    document.getElementById("converted")
        .innerText = data.converted || 0;
}

async function loadLeads() {

    const response =
        await fetch(
            "http://localhost:5000/api/leads"
        );

    const leads =
        await response.json();

    const table =
        document.getElementById(
            "leadTable"
        );

    table.innerHTML = "";

    leads.forEach((lead) => {

        table.innerHTML += `
            <tr>
                <td>${lead.id}</td>
                <td>${lead.name}</td>
                <td>${lead.email}</td>
                <td>${lead.phone}</td>
                <td>${lead.source}</td>
                <td>${lead.status}</td>
            </tr>
        `;
    });
}

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href =
        "/login.html";
});

loadStats();
loadLeads();