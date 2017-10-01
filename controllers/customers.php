<?php

require '../models/Database.php';
require '../models/Customer.php';

$customerRepo = new Customer(Database::dbConnect());

header('Content-Type: application/json');

if ($_GET['action'] == 'getCustomers') {
    $customers = $customerRepo->customers();
    echo json_encode($customers);
}

if ($_GET['action'] == 'upsertCustomer') {
    $customer = $_POST;
    $customerRepo->upsertCustomer($customer);
}