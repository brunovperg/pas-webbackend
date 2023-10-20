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


$stmt = mysqli_prepare($conn, 'INSERT INTO electoral_slate (slate_name, code, president, president_registration_number, vice_president, vice_president_registration_number) VALUES (?, ?, ?, ?, ?, ?)');
mysqli_stmt_bind_param($stmt, 'ssssss', $data['slate_name'], $data['code'], $data['president'], $data["president_registration_number"], $data['vice_president'], $data["vice_president_registration_number"]);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(array('success' => true, 'message' => 'Slate registered successfully'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Failed to register slate: ' . mysqli_error($conn)));
}

mysqli_stmt_close($stmt);
mysqli_close($conn);