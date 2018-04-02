<?php

require '../models/Database.php';
require '../models/Ticket.php';

$ticketRepo = new Item(Database::dbConnect());

header('Content-Type: application/json');

$action = $_GET['action'];

switch ($action) {
    case 'getAll':
        $tickets = $ticketRepo->tickets();
        echo json_encode($tickets);
        break;
    case 'upsertTicket':
        $ticket = $ticketRepo->updateTicket($_POST);
        echo json_encode($ticket);
    default:
        // code...
        break;
}