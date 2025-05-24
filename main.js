
// main.js

const API_URL = "https://script.google.com/macros/s/AKfycbzrJKwZEmYmbZwE8rx-I7-AaGMcFO_5LL2Ut4HiU_LXk6khgMg2xlD-Db1Te7maMsn4/exec";

async function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('error-msg');

  const formData = new URLSearchParams();
  formData.append("action", "login");
  formData.append("email", email);
  formData.append("password", password);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData
    });
    const data = await res.json();

    if (data.status === "success") {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = `${data.role}.html`;
    } else {
      errorMsg.textContent = data.message || "Login gagal.";
    }
  } catch (err) {
    errorMsg.textContent = "Gagal menghubungi server.";
  }
}

function checkAuth(expectedRole) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== expectedRole) {
    alert("Akses ditolak. Silakan login sesuai peran Anda.");
    window.location.href = "login.html";
  }
}

async function loadData(sheetName, callback) {
  try {
    const res = await fetch(`${API_URL}?sheet=${sheetName}`);
    const data = await res.json();
    callback(data);
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
}
