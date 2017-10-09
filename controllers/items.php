<?php

require '../models/Database.php';
require '../models/Item.php';

$itemRepo = new Item(Database::dbConnect());

header('Content-Type: application/json');

if ($_GET['action'] == 'getItems') {
    $items = $itemRepo->items();
    echo json_encode($items);
}

if ($_GET['action'] == 'upsertItem') {
    $item = $_POST;
    $itemRepo->upsertItem($item);
    $result = array('msg' => 'success', 'code' => 200);
    echo json_encode($result);
}

if ($_GET['action'] == 'importItems') {
    $handle = fopen('../files/prices.txt', 'r');
    while (($line = fgets($handle)) !== false) {
        $array = explode(' ', $line);
        $item = array(
            'name' => $array[0],
            'description' => $array[1],
            'cost' => $array[2],
            'retail' => $array[3],
            'quantity' => $array[4],
            'total_cost' => $array[5],
            'total_retail' => $array[6]
        );
        $itemRepo->upsertItem($item);
    }
}