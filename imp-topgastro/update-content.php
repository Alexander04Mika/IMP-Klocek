<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

if (!isset($_SESSION["admin_logged_in"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit();
}

$conn = new mysqli("localhost", "db_user", "db_password", "db_name");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);
$content = $conn->real_escape_string($data["content"]);

$sql = "UPDATE site_content SET content = '$content' WHERE id = 1";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Content updated"]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating content"]);
}

$conn->close();
?>
