<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $habitName = $_POST['name'];
    
    try {
        $stmt = $conn->prepare("INSERT INTO habits (name) VALUES (?)");
        $stmt->execute([$habitName]);
        
        echo json_encode(['success' => true, 'id' => $conn->lastInsertId()]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}
