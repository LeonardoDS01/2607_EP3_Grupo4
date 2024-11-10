document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  function showNotification(message, isSuccess) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = `fixed top-5 right-5 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
      isSuccess ? "bg-green-500" : "bg-red-500"
    } text-white`;

    // Show the notification
    setTimeout(() => {
      notification.classList.remove("opacity-0", "translate-y-[-100%]");
    }, 100);

    // Hide the notification after 3 seconds
    setTimeout(() => {
      notification.classList.add("opacity-0", "translate-y-[-100%]");
    }, 3000);
  }

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/v1/usuario/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        showNotification(data.message, true);
        registerForm.reset();
        closeModal("registerModal");
      } else {
        showNotification(`Error: ${data.message}`, false);
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("Ocurrió un error al registrar el usuario", false);
    }
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch("/api/v1/usuario/acceder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        showNotification(data.message, true);
        loginForm.reset();
        closeModal("loginModal");
      } else {
        showNotification(`Error: ${data.message}`, false);
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("Ocurrió un error al iniciar sesión", false);
    }
  });
});
