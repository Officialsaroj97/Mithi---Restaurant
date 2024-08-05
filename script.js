document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileLinks = document.getElementById("mobile_links");

  menuToggle.addEventListener("click", function () {
    mobileLinks.style.display =
      mobileLinks.style.display === "flex" ? "none" : "flex";
  });
});

// menu-item page
function openMenuPage() {
  window.open("menu-item.html", "_blank"); // Replace with your actual page URL
}

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(event.target);
    var data = {};
    formData.forEach((value, key) => (data[key] = value));

    fetch(
      "https://script.google.com/macros/s/AKfycbwRHMHjqBBEePIFlXIddx9NQgnGwjszkZUbLVl71sM/dev",
      {
        method: "POST",
        body: new URLSearchParams(data),
      }
    )
      .then((response) => response.text())
      .then((responseText) => {
        var messageDiv = document.getElementById("message");
        messageDiv.innerText = responseText;
        messageDiv.style.display = "block";
        setTimeout(() => {
          messageDiv.style.display = "none";
        }, 3000); // Hide the message after 3 seconds
      })
      .catch((error) => {
        console.error("Error:", error);
        var messageDiv = document.getElementById("message");
        messageDiv.innerText = "An error occurred. Please try again.";
        messageDiv.style.display = "block";
        setTimeout(() => {
          messageDiv.style.display = "none";
        }, 3000); // Hide the message after 3 seconds
      });
  });
