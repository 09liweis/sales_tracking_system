<?php
class Item {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    
    public function items() {
        $sql = 'SELECT * FROM items ORDER BY id DESC';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->execute();
        $items = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $items;
    }
    
    public function item($id) {
        $sql = 'SELECT * FROM items WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
        $item = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $item;
    }
    
    public function upsertItem($item) {
        $id = $item['id'];
        if ($id) {
        } else {
            $item['created_at'] = date('Y-m-d H:i:s');
        }
        $name = $item['name'];
        $description = $item['description'];
        $cost = $item['cost'];
        $retail = $item['retail'];
        $quantity = $item['quantity'];
        $total_cost = $item['total_cost'];
        $total_retail = $item['total_retail'];
        $created_at = $item['created_at'];
        $sql = 'INSERT INTO items (id, name, description, cost, retail, quantity, total_cost, total_retail, created_at)
                VALUES (:id, :name, :description, :cost, :retail, :quantity, :total_cost, :total_retail, :created_at)
                ON DUPLICATE KEY UPDATE
                name = VALUES(`name`),
                description = VALUES(`description`),
                retail = VALUES(`retail`),
                cost = VALUES(`cost`),
                quantity = VALUES(`quantity`),
                total_cost = VALUES(`total_cost`),
                total_retail = VALUES(`total_retail`);
                created_at = VALUES(`created_at`),
                ';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->bindValue(':name', $name, PDO::PARAM_STR);
        $pdostmt->bindValue(':description', $description, PDO::PARAM_STR);
        $pdostmt->bindValue(':retail', $retail, PDO::PARAM_STR);
        $pdostmt->bindValue(':quantity', $quantity, PDO::PARAM_STR);
        $pdostmt->bindValue(':cost', $cost, PDO::PARAM_STR);
        $pdostmt->bindValue(':total_cost', $total_cost, PDO::PARAM_STR);
        $pdostmt->bindValue(':total_retail', $total_retail, PDO::PARAM_STR);
        $pdostmt->bindValue(':created_at', $created_at, PDO::PARAM_STR);
        $pdostmt->execute();
        return $item;
    }
    
    public function delete($id) {
        $sql = 'DELETE FROM items WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
}