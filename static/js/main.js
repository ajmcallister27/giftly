const API_BASE = "https://effective-train-qg6jjq4qqx529q9w-3000.app.github.dev"; // Replace with your server's base URL if deployed
const users = [
{
    fn: 'jo',
    ln: 'bobby',
    id: 0
},
{
    fn: 'mo',
    ln: 'bobby',
    id: 1
}]
const userList = document.getElementById('userLists');

function initUsers() {
    users.forEach(user => {
        userList.innerHTML += `<li><a href="/wantlist/${user.id}">${user.fn} ${user.ln}</a></li>`;
    });
};

initUsers();
// // Create a Wantlist
// document.getElementById("createWantlistForm").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const userId = document.getElementById("userId").value;
//     const title = document.getElementById("title").value;

//     const response = await fetch(`${API_BASE}/wantlist`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, title, items: [] }),
//     });

//     const result = await response.json();
//     if (result.success) {
//         alert(`Wantlist created with ID: ${result.id}`);
//     } else {
//         alert(`Error: ${result.error}`);
//     }
// });

// // View Wantlists
// document.getElementById("viewListsButton").addEventListener("click", async () => {
//     const userId = document.getElementById("viewUserId").value;

//     const response = await fetch(`${API_BASE}/wantlists/${userId}`);
//     const wantlists = await response.json();

//     const listElement = document.getElementById("wantlists");
//     listElement.innerHTML = "";

//     for (const [id, list] of Object.entries(wantlists)) {
//         const listItem = document.createElement("li");
//         listItem.textContent = `${list.title} (ID: ${id})`;
//         listElement.appendChild(listItem);
//     }
// });
