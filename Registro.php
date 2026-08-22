<?php
/* =====================================================================
   registro.php
   =====================================================================
   Recibe los datos del formulario "Registrarme" (nombre, email,
   teléfono, si quiere recibir promos) y los guarda en un archivo CSV
   dentro de api/data/suscriptores.csv.

   No hace falta tocar este archivo para que funcione. Solo tiene que
   estar subido al hosting, dentro de la carpeta "api", dos niveles
   junto a index.html:

     public_html/
       ├── index.html
       ├── style.css
       ├── script.js
       ├── productos.js
       └── api/
             ├── registro.php   <-- este archivo
             ├── login.php
             └── data/
                   └── suscriptores.csv   (se crea solo)
   ===================================================================== */

header("Content-Type: application/json; charset=utf-8");

// Solo acepta pedidos POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "mensaje" => "Método no permitido."]);
    exit;
}

// Lee el JSON que mandó el formulario
$datos = json_decode(file_get_contents("php://input"), true);

$nombre   = trim($datos['nombre'] ?? '');
$email    = trim($datos['email'] ?? '');
$telefono = trim($datos['telefono'] ?? '');
$promos   = !empty($datos['promos']) ? "Sí" : "No";
$aceptaPrivacidad = !empty($datos['aceptaPrivacidad']);

// Validaciones básicas
if ($nombre === '' || $email === '') {
    echo json_encode(["success" => false, "mensaje" => "Faltan datos obligatorios."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "mensaje" => "El email no es válido."]);
    exit;
}

if (!$aceptaPrivacidad) {
    echo json_encode(["success" => false, "mensaje" => "Tenés que aceptar la Política de Privacidad para registrarte."]);
    exit;
}

$carpetaData = __DIR__ . '/data';
$archivoCsv  = $carpetaData . '/suscriptores.csv';

// Crea la carpeta "data" si no existe
if (!is_dir($carpetaData)) {
    mkdir($carpetaData, 0755, true);
}

// Si el archivo no existe todavía, lo crea con encabezados
$esArchivoNuevo = !file_exists($archivoCsv);

// Chequea si el email ya estaba registrado (evita duplicados)
if (!$esArchivoNuevo) {
    $filas = file($archivoCsv, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($filas as $i => $fila) {
        if ($i === 0) continue; // encabezado
        $columnas = str_getcsv($fila);
        if (isset($columnas[2]) && strtolower($columnas[2]) === strtolower($email)) {
            echo json_encode([
                "success" => true,
                "mensaje" => "Ese email ya estaba registrado. ¡Gracias igual!"
            ]);
            exit;
        }
    }
}

$handle = fopen($archivoCsv, 'a');

if ($handle === false) {
    echo json_encode([
        "success" => false,
        "mensaje" => "No se pudo guardar el registro. Avisá al administrador del sitio (puede ser un problema de permisos de la carpeta api/data)."
    ]);
    exit;
}

if ($esArchivoNuevo) {
    fputcsv($handle, ["Fecha", "Nombre", "Email", "Teléfono", "Quiere promos", "Aceptó política de privacidad"]);
}

fputcsv($handle, [date("Y-m-d H:i:s"), $nombre, $email, $telefono, $promos, $aceptaPrivacidad ? "Sí" : "No"]);
fclose($handle);

echo json_encode([
    "success" => true,
    "mensaje" => "¡Listo, $nombre! Te sumamos a la lista de promociones."
]);