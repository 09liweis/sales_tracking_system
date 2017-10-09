<?php

class Database {
    private static $host = 'localhost';
    private static $dbname = 'c9';
    private static $username = 'a09liweis';
    private static $password = '';
    private static $db;
    
    public function __construct() {

    }
    
    public static function dbConnect() {
        $dsn = "mysql:host=" . self::$host . ";dbname=" . self::$dbname;
        if (!isset(self::$db)) {
            try {
                self::$db = new PDO($dsn, self::$username, self::$password);
                self::$db->exec('SET CHARACTER SET utf8');
                self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$db->setAttribute(PDO::FETCH_ASSOC, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
        }
        return self::$db;
    }

}