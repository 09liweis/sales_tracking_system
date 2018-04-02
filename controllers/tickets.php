<?php

require '../models/Database.php';
require '../models/Ticket.php';

$ticketRepo = new Item(Database::dbConnect());

header('Content-Type: application/json');

$action = $_GET['action'];