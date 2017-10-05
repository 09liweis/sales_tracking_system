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
    
    public function upsertCustomer($customer) {
        $id = $customer['id'];
        $date = $customer['date'];
        $location = $customer['location'];
        $item_name = $customer['item_name'];
        $quantity = $customer['quantity'];
        $payment = $customer['payment'];
        $cost = $customer['cost'];
        $shipping_fee = $customer['shipping_fee'];
        $packaging = $customer['packaging'];
        $profit_or_loss = $customer['profit_or_loss'];
        $status = $customer['status'];
        $remarks = $customer['remarks'];
        $sql = 'INSERT INTO customers (id, date, location, item_name, quantity, payment, cost, shipping_fee, packaging, profit_or_loss, status, remarks)
                VALUES (:id, :date, :location, :item_name, :quantity, :payment, :cost, :shipping_fee, :packaging, :profit_or_loss, :status, :remarks)
                ON DUPLICATE KEY UPDATE
                date = VALUES(`date`),
                location = VALUES(`location`),
                item_name = VALUES(`item_name`),
                quantity = VALUES(`quantity`),
                payment = VALUES(`payment`),
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
        $pdostmt->bindValue(':cost', $cost, PDO::PARAM_STR);
        $pdostmt->bindValue(':shipping_fee', $shipping_fee, PDO::PARAM_STR);
        $pdostmt->bindValue(':packaging', $packaging, PDO::PARAM_STR);
        $pdostmt->bindValue(':profit_or_loss', $profit_or_loss, PDO::PARAM_STR);
        $pdostmt->bindValue(':status', $status, PDO::PARAM_STR);
        $pdostmt->bindValue(':remarks', $remarks, PDO::PARAM_STR);
        $pdostmt->execute();
    }
}