<?php

require '../models/Database.php';
require '../models/Item.php';

$itemRepo = new Item(Database::dbConnect());

header('Content-Type: application/json');

if ($_GET['action'] == 'getItems') {
    $items = $itemRepo->items();
    echo json_encode($items);
}

if ($_GET['action'] == 'getItem') {
    $item = $itemRepo->item($_GET['id']);
    echo json_encode($item);
}

if ($_GET['action'] == 'upsertItem') {
    $item = $_POST;
    $item = $itemRepo->upsertItem($item);
    $result = array('msg' => 'success', 'code' => 200, 'data' => $item);
    echo json_encode($result);
}

if ($_GET['action'] == 'updateItems') {
    $items = $itemRepo->items();
    foreach($items as $item) {
        $quantity = $item['quantity'];
        $cost = $item['cost'];
        $retail = $item['retail'] + 0.5;
        $item['retail'] = $retail;
        $item['total_cost'] = $cost * $quantity;
        $item['total_retail'] = $retail * $quantity;
        $itemRepo->upsertItem($item);
    }
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