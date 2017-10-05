<?php

require '../models/Database.php';
require '../models/Customer.php';

//require 'vendor/autoload.php';

$customerRepo = new Customer(Database::dbConnect());

header('Content-Type: application/json');

if ($_GET['action'] == 'getCustomers') {
    $customers = $customerRepo->customers();
    echo json_encode($customers);
}

if ($_GET['action'] == 'upsertCustomer') {
    $customer = $_POST;
    $customerRepo->upsertCustomer($customer);
    $result = array('msg' => 'Update', 'status' => 200);
    echo json_encode($result);
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
        $customerRepo->upsertCustomer($sale);
    }
}