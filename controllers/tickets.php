<?php

require '../models/Database.php';
require '../models/Ticket.php';

$ticketRepo = new Ticket(Database::dbConnect());

header('Content-Type: application/json');

$action = $_GET['action'];

switch ($action) {
    case 'getAll':
        $tickets = $ticketRepo->tickets();
        echo json_encode($tickets);
        break;
    case 'upsert':
        $ticket = $ticketRepo->upsert($_POST);
        echo json_encode($ticket);
    default:
        // code...
        break;
}