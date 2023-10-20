<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$data = json_decode(file_get_contents('php://input'), true);

$conn = mysqli_connect('localhost', 'root', '', 'voting_system');

if (mysqli_connect_errno()) {
    echo json_encode(array('success' => false, 'message' => 'Failed to connect to MySQL: ' . mysqli_connect_error()));
    exit();
}

$stmt = mysqli_prepare($conn, 'INSERT INTO voter (name, registration_number) VALUES (?, ?)');
mysqli_stmt_bind_param($stmt, 'ss', $data['name'], $data['registration_number']);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(array('success' => true, 'message' => 'Voter registered successfully'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Failed to register voter: ' . mysqli_error($conn)));
}

mysqli_stmt_close($stmt);
mysqli_close($conn);