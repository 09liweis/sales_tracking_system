<?php
class Customer {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    
    public function customers() {
        $sql = 'SELECT * FROM customers';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $customers = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $customers;
    }
}