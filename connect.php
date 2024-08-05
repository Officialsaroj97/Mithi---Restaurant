<?php
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fullName = $_POST['fullName'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Database connection
    $servername = "localhost";
    $username = "root";
    $password = "";  // replace with your database password
    $dbname = "contact_form";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die('Connection Failed: ' . $conn->connect_error);
    } else {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO messages (fullName, email, subject, message) VALUES (?, ?, ?, ?)");
        if ($stmt === false) {
            die('Prepare failed: ' . htmlspecialchars($conn->error));
        }

        $bind = $stmt->bind_param("ssss", $fullName, $email, $subject, $message);
        if ($bind === false) {
            die('Bind failed: ' . htmlspecialchars($stmt->error));
        }

        // Execute the statement
        $exec = $stmt->execute();
        if ($exec === false) {
            die('Execute failed: ' . htmlspecialchars($stmt->error));
        } else {
            echo "Message Sent Successfully...";
        }

        // Close statement and connection
        $stmt->close();
        $conn->close();
    }
} else {
    // If the request method is not POST, return an error
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
