<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$data = json_decode(file_get_contents('php://input'), true);

// // Connect to the database
$conn = mysqli_connect('localhost', 'root', '', 'voting_system');

if (mysqli_connect_errno()) {
    echo json_encode(array('success' => false, 'message' => 'Failed to connect to MySQL: ' . mysqli_connect_error()));
    exit();
}

// // Find the voter ID based on the registration number
$stmt = mysqli_prepare($conn, 'SELECT id FROM voter WHERE registration_number = ?');
mysqli_stmt_bind_param($stmt, 's', $data['registration_number']);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$row = mysqli_fetch_assoc($result);
$voterId = $row['id'];


// // Find the slate ID based on the slate code
$stmt = mysqli_prepare($conn, 'SELECT id FROM electoral_slate WHERE code = ?');
mysqli_stmt_bind_param($stmt, 's', $data['slate_code']);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$row = mysqli_fetch_assoc($result);
$slateId = $row['id'];


// // Insert the vote into the database
$stmt = mysqli_prepare($conn, 'INSERT INTO vote (voter_id, slate_id) VALUES (?, ?)');
mysqli_stmt_bind_param($stmt, 'ii', $voterId, $slateId);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(array('success' => true, 'message' => 'Vote registered successfully'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Failed to register vote: ' . mysqli_error($conn)));
}

mysqli_stmt_close($stmt);
mysqli_close($conn);