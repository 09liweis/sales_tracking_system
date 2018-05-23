<?php

require '../models/Database.php';
require '../models/Transaction.php';

//require 'vendor/autoload.php';

$transactionRepo = new Transaction(Database::dbConnect());

header('Content-Type: application/json');

if ($_GET['action'] == 'getCustomers') {
    $options = $_GET['date'];
    $transactions = $transactionRepo->transactions($options);
    echo json_encode($transactions);
}

if ($_GET['action'] == 'getCustomer') {
    $transaction = $transactionRepo->transaction($_GET['id']);
    echo json_encode($transaction);
}

if ($_GET['action'] == 'upsertCustomer') {
    $transaction = $_POST;
    $transactionRepo->upsert($transaction);
    $result = array('msg' => 'Update', 'status' => 200);
    echo json_encode($result);
}

if ($_GET['action'] == 'delete') {
    $id = $_POST['id'];
    $transactionRepo->delete($id);
    echo json_encode(200);
}

if ($_GET['action'] == 'importCustomers') {
    $handle = fopen('../files/sales.txt', 'r');
    while (($line = fgets($handle)) !== false) {
        $array = explode(' ', $line);
        $sale = array(
            'date' => '2017-'.$array[0].'-'.$array[1],
            'location' => $array[2],
            'item_name' => '',
            'quantity' => $array[3],
            'payment' => $array[4],
            'cost' => $array[5],
            'shipping_fee' => $array[6],
            'packaging' => $array[7],
            'profit_or_loss' => $array[8],
            'status' => 0,
            'remarks' => ''
        );
        $transactionRepo->upsertCustomer($sale);
    }
}