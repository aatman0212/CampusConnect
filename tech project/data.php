<?php
/**
 * CampusConnect - Backend Event Persistence API
 * Supports MySQL / MariaDB (e.g. XAMPP/WAMP) with Prepared Statements
 */

header('Content-Type: application/json; charset=utf-8');

// Configuration
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "events_db";

// Handle Database & Table Auto-Creation
try {
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Auto-create database if not exists
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    $pdo->exec("USE `$dbname`;");
    
    // Auto-create events table if not exists
    $createTableQuery = "CREATE TABLE IF NOT EXISTS `events` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `event_title` VARCHAR(255) NOT NULL,
        `event_category` VARCHAR(50) DEFAULT 'tech',
        `event_description` TEXT NOT NULL,
        `organizer_name` VARCHAR(150) NOT NULL,
        `contact_email` VARCHAR(150) NOT NULL,
        `phone` VARCHAR(20) NOT NULL,
        `event_type` ENUM('Solo', 'Group') DEFAULT 'Solo',
        `group_range` VARCHAR(20) DEFAULT '1-1',
        `start_date` DATE NOT NULL,
        `end_date` DATE NOT NULL,
        `event_time` VARCHAR(30) NOT NULL,
        `venue` VARCHAR(255) DEFAULT 'Campus Auditorium',
        `event_capacity` INT NOT NULL DEFAULT 30,
        `spots_left` INT NOT NULL DEFAULT 30,
        `status` ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;";
    $pdo->exec($createTableQuery);

} catch (PDOException $e) {
    // If MySQL server is offline or credentials differ, return graceful message
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $e->getMessage(),
        'note' => 'CampusConnect works completely client-side in localStorage if PHP/MySQL is not running.'
    ]);
    exit();
}

// Handle POST request to pitch/create an event
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = !empty($_POST) ? $_POST : json_decode(file_get_contents('php://input'), true);

    if (empty($input['eventTitle']) || empty($input['eventDescription'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
        exit();
    }

    $title = trim($input['eventTitle']);
    $desc = trim($input['eventDescription']);
    $category = $input['category'] ?? 'tech';
    $organizer = trim($input['organizerName'] ?? 'Student Society');
    $email = trim($input['contactEmail'] ?? 'student@campus.edu');
    $phone = trim($input['phone'] ?? '');
    $type = $input['eventType'] ?? 'Solo';
    $groupRange = $input['groupRange'] ?? ($type === 'Group' ? '2-4' : '1-1');
    $startDate = $input['eventDate'] ?? $input['startDate'] ?? date('Y-m-d');
    $endDate = $input['endDate'] ?? $startDate;
    $time = $input['eventTime'] ?? '10:00 AM';
    $venue = $input['venue'] ?? 'Campus Main Hall';
    $capacity = (int)($input['eventCapacity'] ?? 40);

    try {
        $stmt = $pdo->prepare("INSERT INTO `events` 
            (`event_title`, `event_category`, `event_description`, `organizer_name`, `contact_email`, `phone`, `event_type`, `group_range`, `start_date`, `end_date`, `event_time`, `venue`, `event_capacity`, `spots_left`, `status`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
        
        $stmt->execute([
            $title, $category, $desc, $organizer, $email, $phone,
            $type, $groupRange, $startDate, $endDate, $time, $venue,
            $capacity, $capacity
        ]);

        $eventId = $pdo->lastInsertId();

        echo json_encode([
            'success' => true,
            'message' => 'Event pitch saved to database successfully!',
            'eventId' => $eventId
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Insert error: ' . $e->getMessage()]);
    }
} else {
    // GET request - return approved events
    try {
        $stmt = $pdo->query("SELECT * FROM `events` WHERE `status` = 'approved' ORDER BY `start_date` ASC");
        $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'events' => $events]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}
?>
