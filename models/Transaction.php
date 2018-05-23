<?php
class Transaction {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    
    public function transactions($options) {
        $startDate = $options['start'];
        $endDate = $options['end'];
        $sql = 'SELECT * FROM customers WHERE 1';
        if ($startDate) {
            $sql .= ' AND date >= :start';
        }
        if ($endDate) {
            $sql .= ' AND date <= :end';
        }
        $sql .= ' ORDER BY created_at DESC, date DESC';

        $pdostmt = $this->db->prepare($sql);
        if ($startDate) {
            $pdostmt->bindValue(':start', $startDate, PDO::PARAM_STR);   
        }
        if ($endDate) {
            $pdostmt->bindValue(':end', $endDate, PDO::PARAM_STR);
        }
        $pdostmt->execute();
        $transactions = $pdostmt->fetchAll(PDO::FETCH_ASSOC);
        return $transactions;
    }
    
    public function transaction($id) {
        $sql = 'SELECT * FROM customers WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
        $transaction = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $transaction;
    }
    public function upsert($transaction) {
        $id = $transaction['id'];
        if ($id == '0') {
            $createdAt = date('Y-m-d H:i:s');
        }
        $date = $transaction['date'];
        $location = $transaction['location'];
        $item_name = $transaction['item_name'];
        $quantity = $transaction['quantity'];
        $payment = $transaction['payment'];
        $other_fee = $transaction['other_fee'];
        $cost = $transaction['cost'];
        $shipping_fee = $transaction['shipping_fee'];
        $packaging = $transaction['packaging'];
        $profit_or_loss = $transaction['profit_or_loss'];
        $status = $transaction['status'];
        $remarks = $transaction['remarks'];
        $sql = 'INSERT INTO customers (id, date, location, item_name, quantity, payment, other_fee, cost, shipping_fee, packaging, profit_or_loss, status, remarks, created_at)
                VALUES (:id, :date, :location, :item_name, :quantity, :payment, :other_fee, :cost, :shipping_fee, :packaging, :profit_or_loss, :status, :remarks, :created_at)
                ON DUPLICATE KEY UPDATE
                date = VALUES(`date`),
                location = VALUES(`location`),
                item_name = VALUES(`item_name`),
                quantity = VALUES(`quantity`),
                payment = VALUES(`payment`),
                other_fee = VALUES(`other_fee`),
                cost = VALUES(`cost`),
                shipping_fee = VALUES(`shipping_fee`),
                packaging = VALUES(`packaging`),
                profit_or_loss = VALUES(`profit_or_loss`),
                status = VALUES(`status`),
                remarks = VALUES(`remarks`);
                ';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->bindValue(':date', $date, PDO::PARAM_STR);
        $pdostmt->bindValue(':location', $location, PDO::PARAM_STR);
        $pdostmt->bindValue(':item_name', $item_name, PDO::PARAM_STR);
        $pdostmt->bindValue(':quantity', $quantity, PDO::PARAM_STR);
        $pdostmt->bindValue(':payment', $payment, PDO::PARAM_STR);
        $pdostmt->bindValue(':other_fee', $other_fee, PDO::PARAM_STR);
        $pdostmt->bindValue(':cost', $cost, PDO::PARAM_STR);
        $pdostmt->bindValue(':shipping_fee', $shipping_fee, PDO::PARAM_STR);
        $pdostmt->bindValue(':packaging', $packaging, PDO::PARAM_STR);
        $pdostmt->bindValue(':profit_or_loss', $profit_or_loss, PDO::PARAM_STR);
        $pdostmt->bindValue(':status', $status, PDO::PARAM_STR);
        $pdostmt->bindValue(':remarks', $remarks, PDO::PARAM_STR);
        $pdostmt->bindValue(':created_at', $createdAt, PDO::PARAM_STR);
        $pdostmt->execute();
    }
    
    public function delete($id) {
        $sql = 'DELETE FROM customers WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_INT);
        $pdostmt->execute();
    }
}