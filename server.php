<?php
$_POST = json_decode(file_get_contents("php://input"), true); // Позволяет php-серверу работать с JSON форматом
echo var_dump($_POST);