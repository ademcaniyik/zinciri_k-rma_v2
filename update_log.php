<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $date = $_POST['date'];
    $habitId = $_POST['habit_id'];
    
    try {
        // Önce log var mı kontrol et
        $stmt = $conn->prepare("SELECT * FROM habit_logs WHERE habit_id = ? AND log_date = ?");
        $stmt->execute([$habitId, $date]);
        
        if ($stmt->rowCount() > 0) {
            // Log varsa sil
            $stmt = $conn->prepare("DELETE FROM habit_logs WHERE habit_id = ? AND log_date = ?");
            $stmt->execute([$habitId, $date]);
        } else {
            // Log yoksa ekle
            $stmt = $conn->prepare("INSERT INTO habit_logs (habit_id, log_date) VALUES (?, ?)");
            $stmt->execute([$habitId, $date]);
        }
        
        echo json_encode(['success' => true]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}
