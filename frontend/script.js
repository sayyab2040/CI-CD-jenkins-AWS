const form = document.getElementById("userForm");
const userList = document.getElementById("userList");

const API_URL = "http://localhost:5000/users";

async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();

    userList.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.name} - ${user.email}`;
      userList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    form.reset();
    fetchUsers();
  } catch (error) {
    console.error("Error adding user:", error);
  }
});

fetchUsers();