<?php
require_once 'config.php';

try {
    $stmt = $conn->query("SELECT * FROM habits ORDER BY created_at DESC");
    $habits = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Her alışkanlık için logları al
    foreach ($habits as &$habit) {
        $stmt = $conn->prepare("SELECT log_date FROM habit_logs WHERE habit_id = ?");
        $stmt->execute([$habit['id']]);
        $habit['logs'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
    
    echo json_encode(['success' => true, 'habits' => $habits]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
