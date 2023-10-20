<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Replace with your own database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "voting_system";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(array('success' => false, 'message' => 'Failed to connect to MySQL: ' . $conn->connect_error));
    exit();
}

// Fetch slates from database
$sql = "SELECT * FROM electoral_slate";
$result = $conn->query($sql);

// Check if any slates were found
if ($result->num_rows > 0) {
    // Output data of each row as an array
    $slates = array();
    while ($row = $result->fetch_assoc()) {
        $slates[] = $row;
    }
    // Output slates as JSON
    header('Content-Type: application/json');
    echo json_encode($slates);
} else {
    echo json_encode(array('success' => false, 'message' => 'No slates found'));
}

$conn->close();
?>