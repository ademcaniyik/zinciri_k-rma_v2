<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['habit_id'])) {
    $habit_id = $_POST['habit_id'];
    
    try {
        // Delete related logs first
        $stmt = $conn->prepare("DELETE FROM habit_logs WHERE habit_id = ?");
        $stmt->execute([$habit_id]);
        
        // Then delete the habit
        $stmt = $conn->prepare("DELETE FROM habits WHERE id = ?");
        $stmt->execute([$habit_id]);
        
        echo json_encode(['success' => true]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
}
?>
