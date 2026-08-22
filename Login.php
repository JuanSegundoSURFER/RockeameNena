<?php
/* =====================================================================
   login.php
   =====================================================================
   Recibe un email desde el formulario "Ya estoy registrado" y busca
   si ya existe en api/data/suscriptores.csv. No es un login con
   contraseña: solo confirma si ese email ya está en la lista de
   promociones.
   ===================================================================== */

header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["encontrado" => false, "mensaje" => "Método no permitido."]);
    exit;
}

$datos = json_decode(file_get_contents("php://input"), true);
$email = trim($datos['email'] ?? '');

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["encontrado" => false, "mensaje" => "Email no válido."]);
    exit;
}

$archivoCsv = __DIR__ . '/data/suscriptores.csv';

if (!file_exists($archivoCsv)) {
    echo json_encode(["encontrado" => false]);
    exit;
}

$filas = file($archivoCsv, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

foreach ($filas as $i => $fila) {
    if ($i === 0) continue; // encabezado
    $columnas = str_getcsv($fila);
    // columnas: [Fecha, Nombre, Email, Teléfono, Quiere promos]
    if (isset($columnas[2]) && strtolower($columnas[2]) === strtolower($email)) {
        echo json_encode([
            "encontrado" => true,
            "nombre" => $columnas[1] ?? "",
        ]);
        exit;
    }
}

echo json_encode(["encontrado" => false]);