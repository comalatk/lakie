const API_URL = "https://script.google.com/macros/s/AKfycbzrJKwZEmYmbZwE8rx-I7-AaGMcFO_5LL2Ut4HiU_LXk6khgMg2xlD-Db1Te7maMsn4/exec";

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  const url = `${API_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "success") {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = `${data.role}.html`;
    } else {
      errorMsg.textContent = data.message || "Login gagal.";
    }
  } catch (error) {
    errorMsg.textContent = "Terjadi kesalahan saat menghubungi server.";
  }
}

function checkAuth(role) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== role) {
    alert("Akses ditolak. Silakan login kembali.");
    window.location.href = "index.html";
  }
}

function renderUserName(role) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === role) {
    document.getElementById("user-name").textContent = user.nama;
  }
}