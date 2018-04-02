<?php
class Ticket {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    
    public function tickets() {
        $sql = 'SELECT * FROM tickets ORDER BY id DESC';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $tickets = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $tickets;
    }
    
    public function ticket($id) {
        $sql = 'SELECT * FROM tickets WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
        $ticket = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $ticket;
    }
    
    public function upsert($ticket) {
        $id = $ticket['id'];
        if ($id) {
        } else {
            $ticket['created_at'] = date('Y-m-d H:i:s');
        }
        $name = $ticket['name'];
        $description = $ticket['description'];
        $status = $ticket['status'];
        $created_at = $ticket['created_at'];
        $sql = 'INSERT INTO tickets (id, name, description, status, created_at)
                VALUES (:id, :name, :description, :status, :created_at)
                ON DUPLICATE KEY UPDATE
                name = VALUES(`name`),
                description = VALUES(`description`),
                status = VALUES(`status`),
                created_at = VALUES(`created_at`)
                ';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->bindValue(':name', $name, PDO::PARAM_STR);
        $pdostmt->bindValue(':description', $description, PDO::PARAM_STR);
        $pdostmt->bindValue(':status', $status, PDO::PARAM_STR);
        $pdostmt->bindValue(':created_at', $created_at, PDO::PARAM_STR);
        $pdostmt->execute();
        return $ticket;
    }
}