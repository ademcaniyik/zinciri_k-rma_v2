CREATE TABLE habits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE habit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    habit_id INT,
    log_date DATE NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (habit_id) REFERENCES habits(id),
    UNIQUE KEY unique_habit_date (habit_id, log_date)
);
