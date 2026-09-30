<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_POST['eventTitle'])) {
    // Database credentials
    $server = "localhost";
    $username = "root";
    $password = "";
    $dbname = "events_db"; // Change this to your actual database name

    // Establish connection
    $con = mysqli_connect($server, $username, $password, $dbname);

    // Check connection
    if (!$con) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Get form data (sanitize inputs to prevent SQL injection)
    $eventTitle = mysqli_real_escape_string($con, $_POST['eventTitle']);
    $eventDescription = mysqli_real_escape_string($con, $_POST['eventDescription']);
    $organizerName = mysqli_real_escape_string($con, $_POST['organizerName']);
    $contactEmail = mysqli_real_escape_string($con, $_POST['contactEmail']);
    $phone = mysqli_real_escape_string($con, $_POST['phone']);
    $eventType = mysqli_real_escape_string($con, $_POST['eventType']);
    $groupRange = isset($_POST['groupRange']) ? mysqli_real_escape_string($con, $_POST['groupRange']) : NULL;
    $eventDate = mysqli_real_escape_string($con, $_POST['eventDate']);
    $endDate = mysqli_real_escape_string($con, $_POST['endDate']);
    $eventTime = mysqli_real_escape_string($con, $_POST['eventTime']);
    $eventCapacity = mysqli_real_escape_string($con, $_POST['eventCapacity']);

    // Insert query
    $sql = "INSERT INTO `events` (`event_title`, `event_description`, `organizer_name`, `contact_email`, `phone`, 
            `event_type`, `group_range`, `event_date`, `end_date`, `event_time`, `event_capacity`, `created_at`)
            VALUES ('$eventTitle', '$eventDescription', '$organizerName', '$contactEmail', '$phone', 
                    '$eventType', '$groupRange', '$eventDate', '$endDate', '$eventTime', '$eventCapacity', CURRENT_TIMESTAMP())";

    // Execute query
    if (mysqli_query($con, $sql)) {
        // Redirect to a specific webpage after success
        header("Location: /event-success.html"); // Change this to your desired page
        exit();
    } else {
        echo "Error: " . mysqli_error($con);
    }

    // Close connection
    mysqli_close($con);
} else {
    echo "No data received!";
    print_r($_POST);
}
?>
