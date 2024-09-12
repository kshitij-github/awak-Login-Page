document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Clear previous error messages
    document.getElementById("emailError").style.display = "none";
    document.getElementById("passwordError").style.display = "none";
    document.getElementById("apiMessage").innerHTML = "";

    // Get form values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate email
    if (!validateEmail(email)) {
        document.getElementById("emailError").innerText = "Please enter a valid email.";
        document.getElementById("emailError").style.display = "block";
        return;
    }

    // Validate password
    if (password.length < 6) {
        document.getElementById("passwordError").innerText = "Password must be at least 6 characters.";
        document.getElementById("passwordError").style.display = "block";
        return;
    }

    // API Call
    const payload = {
        username: email,
        password: password
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("apiMessage").innerHTML = "<p style='color:green;'>Login successful!</p>";
    })
    .catch(error => {
        document.getElementById("apiMessage").innerHTML = "<p style='color:red;'>Login failed. Please try again.</p>";
    });
});

// Helper function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
