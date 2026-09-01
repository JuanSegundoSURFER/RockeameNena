/* =====================================================================
   ROCKEAME NENA ACCESORIOS - productos.js
   =====================================================================
   Catálogo completo de productos. Este archivo se carga ANTES que
   script.js (fijate el orden en index.html).

   Cada producto tiene:
   - id              -> identificador único interno (no lo repitas)
   - nombre          -> nombre visible del producto
   - categoria       -> tiene que coincidir EXACTO con el texto de
                        data-categoria de la tarjeta de categoría en
                        index.html (mayúsculas/espacios incluidos)
   - precio          -> precio minorista (número, sin puntos ni $)
   - precioMayorista -> precio por mayor (o null si no tiene)
   - codigo          -> código/SKU interno del producto (se muestra en
                        la tarjeta). Los productos que antes tenían
                        variantes (A, B, C...) ahora son productos
                        separados, y su código incluye "Código A",
                        "Código B", etc. para diferenciarlos.
   - variantes       -> ya no se usa (queda [] en todos). Se deja el
                        campo para no romper nada, pero cada variante
                        ahora es su propio producto en el array.
   - emoji           -> ícono que se muestra mientras no haya foto
   - imagen          -> nombre del archivo de imagen (ej: "prod-001.jpg").
                        Dejalo en null hasta que subas la foto: el
                        sitio va a mostrar el emoji como respaldo.
                        La CARPETA donde se busca esa imagen depende
                        de la categoría del producto (ver más abajo
                        CARPETA_POR_CATEGORIA) y el tutorial al final
                        de este archivo.

                        IMPORTANTE: los productos que se separaron a
                        partir de uno con variantes (ej: prod-001-A,
                        prod-001-B, prod-001-C...) todos apuntan por
                        ahora al mismo archivo de imagen que tenía el
                        producto original. Cuando tengas la foto de
                        cada variante en particular, cambiá el campo
                        "imagen" de cada uno para que apunte a su foto
                        específica.

   PARA AGREGAR UN PRODUCTO NUEVO: copiá un bloque { ... } y pegalo
   dentro del array, con un id que no se repita.

   PARA BORRAR UN PRODUCTO: borrá su bloque completo.
   ===================================================================== */

/* =====================================================================
   CARPETA DE IMÁGENES
   =====================================================================
   Todas las fotos viven dentro de la carpeta "imagenes R.N". Adentro
   hay 4 carpetas grandes por RUBRO, y solo "ACCESORIOS MODA" tiene
   subcarpetas por categoría (las demás se van a usar más adelante).
   Este objeto le dice al sitio en qué subcarpeta buscar la foto de
   cada producto, según su categoría.

   Estructura de carpetas esperada:

     imagenes R.N/
       ├── ACCESORIOS MODA/
       │     ├── COLGANTES/    (categoría "Colgantes y cadenas de acero")
       │     ├── ANILLOS/      (categoría "Anillos de acero")
       │     ├── AROS/         (categoría "Aros de acero")
       │     ├── CUERO/        (categoría "Cuero")
       │     ├── PULSERAS/     (categoría "Pulseras")
       │     └── REMERAS/      (categoría "Remeras")
       ├── ACCESORIOS INDUMENTARIA/   (todavía sin productos cargados)
       ├── ACCESORIOS RIDE ON/        (todavía sin productos cargados)
       └── ACCESORIOS HOME ROCK/      (todavía sin productos cargados)

   Si querés cambiar el nombre de alguna subcarpeta, cambialo acá a
   la derecha de los ":" (no hace falta tocar nada más).
   ===================================================================== */

const CARPETA_IMAGENES = "Imagenes R.N";

const CARPETA_POR_CATEGORIA = {
  "Colgantes y cadenas de acero": "ACCESORIOS MODA/COLGANTES",
  "Anillos de acero": "ACCESORIOS MODA/ANILLOS",
  "Aros de acero": "ACCESORIOS MODA/AROS",
  "Cuero": "ACCESORIOS MODA/CUERO",
  "Pulseras": "ACCESORIOS MODA/PULSERAS",
  "Remera personalizada": "ACCESORIOS INDUMENTARIA/REMERAS PERSONALIZADAS",
  "Remeras Mujer": "ACCESORIOS INDUMENTARIA/REMERAS",
  "Remeras Corte Clásico Unisex": "ACCESORIOS INDUMENTARIA/REMERAS",
};

const PRODUCTOS = [
  { id: "prod-001-A", nombre: "Muñequera Góticas Finas", categoria: "Cuero", precio: 5996, precioMayorista: null, codigo: "Rn604 - Código A", variantes: [], emoji: "🧤", imagen: "rn604-a.jpg" },
  { id: "prod-001-B", nombre: "Muñequera Góticas Finas", categoria: "Cuero", precio: 5996, precioMayorista: null, codigo: "Rn604 - Código B", variantes: [], emoji: "🧤", imagen: "rn604-b.jpg" },
  { id: "prod-001-C", nombre: "Muñequera Góticas Finas", categoria: "Cuero", precio: 5996, precioMayorista: null, codigo: "Rn604 - Código C", variantes: [], emoji: "🧤", imagen: "rn604-c.jpg" },
  { id: "prod-001-D", nombre: "Muñequera Góticas Finas", categoria: "Cuero", precio: 5996, precioMayorista: null, codigo: "Rn604 - Código D", variantes: [], emoji: "🧤", imagen: "rn604-d.jpg" },
  { id: "prod-001-E", nombre: "Muñequera Góticas Finas", categoria: "Cuero", precio: 5996, precioMayorista: null, codigo: "Rn604 - Código E", variantes: [], emoji: "🧤", imagen: "rn604-e.jpg" },
  { id: "prod-001-F", nombre: "Muñequera Góticas Finas", categoria: "Cuero", precio: 5996, precioMayorista: null, codigo: "Rn604 - Código F", variantes: [], emoji: "🧤", imagen: "rn604-f.jpg" },
  { id: "prod-002-A", nombre: "Muñequera de Cuero Bandas", categoria: "Cuero", precio: 13549, precioMayorista: null, codigo: "Rn603 - Código A", variantes: [], emoji: "🧤", imagen: "rn603-a.jpg" },
  { id: "prod-002-C", nombre: "Muñequera de Cuero Bandas", categoria: "Cuero", precio: 13549, precioMayorista: null, codigo: "Rn603 - Código C", variantes: [], emoji: "🧤", imagen: "rn603-c.jpg" },
  { id: "prod-002-D", nombre: "Muñequera de Cuero Bandas", categoria: "Cuero", precio: 13549, precioMayorista: null, codigo: "Rn603 - Código D", variantes: [], emoji: "🧤", imagen: "rn603-d.jpg" },
  { id: "prod-003-A", nombre: "Muñequera de Cuero Rocks", categoria: "Cuero", precio: 8593, precioMayorista: null, codigo: "Rn606 - Código A", variantes: [], emoji: "🧤", imagen: "rn606-a.jpg" },
  { id: "prod-003-B", nombre: "Muñequera de Cuero Rocks", categoria: "Cuero", precio: 8593, precioMayorista: null, codigo: "Rn606 - Código B", variantes: [], emoji: "🧤", imagen: "rn606-b.jpg" },
  { id: "prod-003-C", nombre: "Muñequera de Cuero Rocks", categoria: "Cuero", precio: 8593, precioMayorista: null, codigo: "Rn606 - Código C", variantes: [], emoji: "🧤", imagen: "rn606-c.jpg" },
  { id: "prod-003-D", nombre: "Muñequera de Cuero Rocks", categoria: "Cuero", precio: 8593, precioMayorista: null, codigo: "Rn606 - Código D", variantes: [], emoji: "🧤", imagen: "rn606-d.jpg" },
  { id: "prod-004-A", nombre: "Muñequera Góticas Gruesas", categoria: "Cuero", precio: 7890, precioMayorista: null, codigo: "Rn614 - Código A", variantes: [], emoji: "🧤", imagen: "rn614-a.jpg" },
  { id: "prod-004-B", nombre: "Muñequera Góticas Gruesas", categoria: "Cuero", precio: 7890, precioMayorista: null, codigo: "Rn614 - Código B", variantes: [], emoji: "🧤", imagen: "rn614-b.jpg" },
  { id: "prod-004-C", nombre: "Muñequera Góticas Gruesas", categoria: "Cuero", precio: 7890, precioMayorista: null, codigo: "Rn614 - Código C", variantes: [], emoji: "🧤", imagen: "rn614-c.jpg" },
  { id: "prod-004-D", nombre: "Muñequera Góticas Gruesas", categoria: "Cuero", precio: 7890, precioMayorista: null, codigo: "Rn614 - Código D", variantes: [], emoji: "🧤", imagen: "rn614-d.jpg" },
  { id: "prod-004-E", nombre: "Muñequera Góticas Gruesas", categoria: "Cuero", precio: 7890, precioMayorista: null, codigo: "Rn614 - Código E", variantes: [], emoji: "🧤", imagen: "rn614-e.jpg" },
  { id: "prod-004-G", nombre: "Muñequera Góticas Gruesas", categoria: "Cuero", precio: 7890, precioMayorista: null, codigo: "Rn614 - Código G", variantes: [], emoji: "🧤", imagen: "rn614-g.jpg" },
  { id: "prod-004-H", nombre: "Muñequera Góticas Gruesas", categoria: "Cuero", precio: 7890, precioMayorista: null, codigo: "Rn614 - Código H", variantes: [], emoji: "🧤", imagen: "rn614-h.jpg" },
  { id: "prod-004-I", nombre: "Muñequera Góticas Gruesas", categoria: "Cuero", precio: 7890, precioMayorista: null, codigo: "Rn614 - Código I", variantes: [], emoji: "🧤", imagen: "rn614-i.jpg" },
  { id: "prod-004-J", nombre: "Muñequera Góticas Gruesas", categoria: "Cuero", precio: 7890, precioMayorista: null, codigo: "Rn614 - Código J", variantes: [], emoji: "🧤", imagen: "rn614-j.jpg" },
  { id: "prod-004-K", nombre: "Muñequera Góticas Gruesas", categoria: "Cuero", precio: 7890, precioMayorista: null, codigo: "Rn614 - Código K", variantes: [], emoji: "🧤", imagen: "rn614-k.jpg" },
  { id: "prod-005-A", nombre: "Muñequeras TachasPunk", categoria: "Cuero", precio: 8550, precioMayorista: null, codigo: "Rn605 - Código A", variantes: [], emoji: "🧤", imagen: "rn605-a.jpg" },
  { id: "prod-005-B", nombre: "Muñequeras TachasPunk", categoria: "Cuero", precio: 8550, precioMayorista: null, codigo: "Rn605 - Código B", variantes: [], emoji: "🧤", imagen: "rn605-b.jpg" },
  { id: "prod-005-C", nombre: "Muñequeras TachasPunk", categoria: "Cuero", precio: 8550, precioMayorista: null, codigo: "Rn605 - Código C", variantes: [], emoji: "🧤", imagen: "rn605-c.jpg" },
  { id: "prod-005-D", nombre: "Muñequeras TachasPunk", categoria: "Cuero", precio: 8550, precioMayorista: null, codigo: "Rn605 - Código D", variantes: [], emoji: "🧤", imagen: "rn605-d.jpg" },
  { id: "prod-006-A", nombre: "Muñequera Medias Vintage", categoria: "Cuero", precio: 7349, precioMayorista: null, codigo: "Rn615 - Código A", variantes: [], emoji: "🧤", imagen: "rn615-a.jpg" },
  { id: "prod-006-B", nombre: "Muñequera Medias Vintage", categoria: "Cuero", precio: 7349, precioMayorista: null, codigo: "Rn615 - Código B", variantes: [], emoji: "🧤", imagen: "rn615-b.jpg" },
  { id: "prod-006-C", nombre: "Muñequera Medias Vintage", categoria: "Cuero", precio: 7349, precioMayorista: null, codigo: "Rn615 - Código C", variantes: [], emoji: "🧤", imagen: "rn615-c.jpg" },
  { id: "prod-006-E", nombre: "Muñequera Medias Vintage", categoria: "Cuero", precio: 7349, precioMayorista: null, codigo: "Rn615 - Código E", variantes: [], emoji: "🧤", imagen: "rn615-e.jpg" },
  { id: "prod-006-F", nombre: "Muñequera Medias Vintage", categoria: "Cuero", precio: 7349, precioMayorista: null, codigo: "Rn615 - Código F", variantes: [], emoji: "🧤", imagen: "rn615-f.jpg" },
  { id: "prod-011", nombre: "Pulseras CierreMagnetico", categoria: "Cuero", precio: 9987, precioMayorista: null, codigo: "Rn609", variantes: ["A", "B", "C", "C1", "D", "E", "F", "G", "H", "I", "J"], emoji: "🧤", imagen: "rn609-a.jpg", imagenesPorVariante: { "A": "rn609-a.jpg", "B": "rn609-b.jpg", "C": "rn609-c.jpg", "C1": "rn609-c1.jpg", "D": "rn609-d.jpg", "E": "rn609-e.jpg", "F": "rn609-f.jpg", "G": "rn609-g.jpg", "H": "rn609-h.jpg", "I": "rn609-i.jpg", "J": "rn609-j.jpg" } },
  { id: "prod-611", nombre: "Chokers Rock", categoria: "Cuero", precio: 10098, precioMayorista: null, codigo: "Rn611", variantes: ["A", "D", "G", "H", "J", "K", "L", "M", "Q", "R", "T", "V", "W", "X", "Z"], emoji: "🧤", imagen: "rn611-a.jpg", imagenesPorVariante: { "A": "rn611-a.jpg", "D": "rn611-d.jpg", "G": "rn611-g.jpg", "H": "rn611-h.jpg", "J": "rn611-j.jpg", "K": "rn611-k.jpg", "L": "rn611-l.jpg", "M": "rn611-m.jpg", "Q": "rn611-q.jpg", "R": "rn611-r.jpg", "T": "rn611-t.jpg", "V": "rn611-v.jpg", "W": "rn611-w.jpg", "X": "rn611-x.jpg", "Z": "rn611-z.jpg" } },
  { id: "prod-203", nombre: "Pulsera Dorada acero", categoria: "Pulseras", precio: 6589, precioMayorista: null, codigo: "rn203", variantes: ["A", "B", "C", "D", "E", "F", "G"], emoji: "🔗", imagen: "rn203.jpg", imagenesPorVariante: { "A": "rn203.jpg", "B": "rn203.jpg", "C": "rn203.jpg", "D": "rn203.jpg", "E": "rn203.jpg", "F": "rn203.jpg", "G": "rn203.jpg" } },
  { id: "prod-206a", nombre: "Pulsera Gruesas cadenas acero", categoria: "Pulseras", precio: 6589, precioMayorista: null, codigo: "rn206-b", variantes: ["A", "B", "C", "D", "E", "F"], emoji: "🔗", imagen: "rn206-a.jpg", imagenesPorVariante: { "A": "rn206-a.jpg", "B": "rn206-a.jpg", "C": "rn206-a.jpg", "D": "rn206-a.jpg", "E": "rn206-a.jpg", "F": "rn206-a.jpg" } },
  { id: "prod-206b", nombre: "Pulsera Gruesas cadenas acero", categoria: "Pulseras", precio: 6589, precioMayorista: null, codigo: "rn206-a", variantes: ["G", "H", "I", "J", "K", "L"], emoji: "🔗", imagen: "rn206-b.jpg", imagenesPorVariante: { "G": "rn206-b.jpg", "H": "rn206-b.jpg", "I": "rn206-b.jpg", "J": "rn206-b.jpg", "K": "rn206-b.jpg", "L": "rn206-b.jpg" } },
  { id: "prod-210", nombre: "Pulsera eslavon grande", categoria: "Pulseras", precio: 9959, precioMayorista: null, codigo: "rn210", variantes: ["A", "B", "C", "D"], emoji: "🔗", imagen: "rn210.jpg", imagenesPorVariante: { "A": "rn210.jpg", "B": "rn210.jpg", "C": "rn210.jpg", "D": "rn210.jpg" } },
  { id: "prod-211", nombre: "Pulsera Cadenas brazalete vikingo", categoria: "Pulseras", precio: 25569, precioMayorista: null, codigo: "rn211", variantes: ["A", "B", "C"], emoji: "🔗", imagen: "rn211.jpg", imagenesPorVariante: { "A": "rn211.jpg", "B": "rn211.jpg", "C": "rn211.jpg" } },
  { id: "prod-212", nombre: "Pulsera Brazalete x3 plateado", categoria: "Pulseras", precio: 16500, precioMayorista: null, codigo: "rn212", variantes: [], emoji: "🔗", imagen: "rn212.jpg" },
  { id: "prod-213", nombre: "Pulsera Brazalete ancho plateado", categoria: "Pulseras", precio: 11002, precioMayorista: null, codigo: "rn213", variantes: [], emoji: "🔗", imagen: "rn213.jpg" },
  { id: "prod-214", nombre: "Pulsera Brazalete fino plateado", categoria: "Pulseras", precio: 10109, precioMayorista: null, codigo: "rn214", variantes: [], emoji: "🔗", imagen: "rn214.jpg" },
  { id: "prod-215", nombre: "Pulsera Brazalete dorado", categoria: "Pulseras", precio: 13104, precioMayorista: null, codigo: "rn215", variantes: [], emoji: "🔗", imagen: "rn215.jpg" },
  { id: "prod-216", nombre: "Pulsera Brazalete resort fino plateado", categoria: "Pulseras", precio: 15872, precioMayorista: null, codigo: "rn216", variantes: [], emoji: "🔗", imagen: "rn216.jpg" },
  { id: "prod-217", nombre: "Pulsera Brazalete resort ancho plateado", categoria: "Pulseras", precio: 20502, precioMayorista: null, codigo: "rn217", variantes: [], emoji: "🔗", imagen: "rn217.jpg" },
  { id: "prod-218", nombre: "Pulsera Brazalete resort fino dorado", categoria: "Pulseras", precio: 16689, precioMayorista: null, codigo: "rn218", variantes: [], emoji: "🔗", imagen: "rn218.jpg" },
  { id: "prod-219", nombre: "Pulsera Brazalete resort fino dorado", categoria: "Pulseras", precio: 13549, precioMayorista: null, codigo: "rn219", variantes: [], emoji: "🔗", imagen: "rn219.jpg" },
  { id: "prod-220", nombre: "Pulsera Acero cierre magnetico", categoria: "Pulseras", precio: 14900, precioMayorista: null, codigo: "rn220", variantes: ["A", "B"], emoji: "🔗", imagen: "rn220.jpg", imagenesPorVariante: { "A": "rn220.jpg", "B": "rn220.jpg" } },
  { id: "prod-222", nombre: "Pulsera Dorada acero gruesa", categoria: "Pulseras", precio: 7598, precioMayorista: null, codigo: "rn222", variantes: ["A", "B", "C", "D"], emoji: "🔗", imagen: "rn222.jpg", imagenesPorVariante: { "A": "rn222.jpg", "B": "rn222.jpg", "C": "rn222.jpg", "D": "rn222.jpg" } },
  { id: "prod-223", nombre: "Pulsera Negra acero gruesa", categoria: "Pulseras", precio: 7598, precioMayorista: null, codigo: "rn223", variantes: ["A", "B", "C", "D", "E"], emoji: "🔗", imagen: "rn223.jpg", imagenesPorVariante: { "A": "rn223.jpg", "B": "rn223.jpg", "C": "rn223.jpg", "D": "rn223.jpg", "E": "rn223.jpg" } },
  { id: "prod-202", nombre: "Pulsera Brazalete serpiente brillo", categoria: "Pulseras", precio: 9359, precioMayorista: null, codigo: "rn202", variantes: [], emoji: "🔗", imagen: "rn202.jpg" },
  { id: "prod-613", nombre: "Chokers Rocks Elegant", categoria: "Cuero", precio: 18500, precioMayorista: null, codigo: "rn613", variantes: ["A", "B"], emoji: "🔗", imagen: "rn613-b.jpg", imagenesPorVariante: { "A": "rn613-b.jpg", "B": "rn613-b.jpg" } },
  { id: "prod-610", nombre: "Chokers Lunaspa", categoria: "Cuero", precio: 4359, precioMayorista: null, codigo: "rn610", variantes: ["A", "B"], emoji: "🔗", imagen: "rn610-b.jpg", imagenesPorVariante: { "A": "rn610-b.jpg", "B": "rn610-b.jpg" } },
  { id: "prod-139", nombre: "Chokers cadenas candado", categoria: "Colgantes y cadenas de acero", precio: 9172, precioMayorista: null, codigo: "rn139", variantes: [], emoji: "⛓️", imagen: "rn139-a.jpg" },
  { id: "prod-105-A", nombre: "Corbatero cuero y aleacion (A)", categoria: "Colgantes y cadenas de acero", precio: 7890, precioMayorista: null, codigo: "rn105 - Código A", variantes: [], emoji: "⛓️", imagen: "rn105-a.jpg" },
  { id: "prod-105-B", nombre: "Corbatero cuero y aleacion (B)", categoria: "Colgantes y cadenas de acero", precio: 7890, precioMayorista: null, codigo: "rn105 - Código B", variantes: [], emoji: "⛓️", imagen: "rn105-b.jpg" },
  { id: "prod-105-C", nombre: "Corbatero cuero y aleacion (C)", categoria: "Colgantes y cadenas de acero", precio: 7890, precioMayorista: null, codigo: "rn105 - Código C", variantes: [], emoji: "⛓️", imagen: "rn105-c.jpg" },
  { id: "prod-1050", nombre: "Corbarero serpiente dorada cuero y aleacion", categoria: "Colgantes y cadenas de acero", precio: 7890, precioMayorista: null, codigo: "rn1050", variantes: [], emoji: "⛓️", imagen: "rn1050-a.jpg" },
  { id: "prod-133-A", nombre: "Colgantes Mistic (A)", categoria: "Colgantes y cadenas de acero", precio: 5998, precioMayorista: null, codigo: "rn133 - Código A", variantes: [], emoji: "⛓️", imagen: "rn133-a.jpg" },
  { id: "prod-133-B", nombre: "Colgantes Mistic (B)", categoria: "Colgantes y cadenas de acero", precio: 5998, precioMayorista: null, codigo: "rn133 - Código B", variantes: [], emoji: "⛓️", imagen: "rn133-b.jpg" },
  { id: "prod-134", nombre: "Colgantes Chokers dorado", categoria: "Colgantes y cadenas de acero", precio: 9996, precioMayorista: null, codigo: "rn134", variantes: [], emoji: "⛓️", imagen: "rn134-a.jpg" },
  { id: "prod-136", nombre: "Colgantes Bolas negras", categoria: "Colgantes y cadenas de acero", precio: 4590, precioMayorista: null, codigo: "rn136", variantes: [], emoji: "⛓️", imagen: "rn136-a.jpg" },
  { id: "prod-138-A", nombre: "Colgante Cola raton cruz (A)", categoria: "Colgantes y cadenas de acero", precio: 4998, precioMayorista: null, codigo: "rn138 - Código A", variantes: [], emoji: "⛓️", imagen: "rn138-a.jpg" },
  { id: "prod-138-B", nombre: "Colgante Cola raton cruz (B)", categoria: "Colgantes y cadenas de acero", precio: 4998, precioMayorista: null, codigo: "rn138 - Código B", variantes: [], emoji: "⛓️", imagen: "rn138-b.jpg" },
  { id: "prod-138-C", nombre: "Colgante Cola raton cruz (C)", categoria: "Colgantes y cadenas de acero", precio: 4998, precioMayorista: null, codigo: "rn138 - Código C", variantes: [], emoji: "⛓️", imagen: "rn138-c.jpg" },
  { id: "prod-138-D", nombre: "Colgante Cola raton cruz (D)", categoria: "Colgantes y cadenas de acero", precio: 4998, precioMayorista: null, codigo: "rn138 - Código D", variantes: [], emoji: "⛓️", imagen: "rn138-d.jpg" },
  { id: "prod-141", nombre: "Colgante Luna sol", categoria: "Colgantes y cadenas de acero", precio: 8990, precioMayorista: null, codigo: "rn141", variantes: [], emoji: "⛓️", imagen: "rn141.jpg" },
  { id: "prod-140-A", nombre: "Colgante Tipo bronce serpiente (A)", categoria: "Colgantes y cadenas de acero", precio: 5821, precioMayorista: null, codigo: "rn140 - Código A", variantes: [], emoji: "⛓️", imagen: "rn140-a.jpg" },
  { id: "prod-140-B", nombre: "Colgante Tipo bronce serpiente (B)", categoria: "Colgantes y cadenas de acero", precio: 5821, precioMayorista: null, codigo: "rn140 - Código B", variantes: [], emoji: "⛓️", imagen: "rn140-b.jpg" },
  { id: "prod-137-A", nombre: "Colgante Serpiente grande (A)", categoria: "Colgantes y cadenas de acero", precio: 4998, precioMayorista: null, codigo: "rn137 - Código A", variantes: [], emoji: "⛓️", imagen: "rn137-a.jpg" },
  { id: "prod-142-A", nombre: "Colgantes Dark bolitas negras (A)", categoria: "Colgantes y cadenas de acero", precio: 2500, precioMayorista: null, codigo: "rn142 - Código A", variantes: [], emoji: "⛓️", imagen: "rn142-a.jpg" },
  { id: "prod-142-B", nombre: "Colgantes Dark bolitas negras (B)", categoria: "Colgantes y cadenas de acero", precio: 2500, precioMayorista: null, codigo: "rn142 - Código B", variantes: [], emoji: "⛓️", imagen: "rn142-b.jpg" },
  { id: "prod-142-C", nombre: "Colgantes Dark bolitas negras (C)", categoria: "Colgantes y cadenas de acero", precio: 2500, precioMayorista: null, codigo: "rn142 - Código C", variantes: [], emoji: "⛓️", imagen: "rn142-c.jpg" },
  { id: "prod-142-D", nombre: "Colgantes Dark bolitas negras (D)", categoria: "Colgantes y cadenas de acero", precio: 2500, precioMayorista: null, codigo: "rn142 - Código D", variantes: [], emoji: "⛓️", imagen: "rn142-d.jpg" },
  { id: "prod-131-A", nombre: "Colgantes Acero cruz (A)", categoria: "Colgantes y cadenas de acero", precio: 7989, precioMayorista: null, codigo: "rn131 - Código A", variantes: [], emoji: "⛓️", imagen: "rn131A.jpg" },
  { id: "prod-131-C", nombre: "Colgantes Acero cruz (C)", categoria: "Colgantes y cadenas de acero", precio: 7989, precioMayorista: null, codigo: "rn131 - Código C", variantes: [], emoji: "⛓️", imagen: "rn131C.jpg" },
  { id: "prod-131-D", nombre: "Colgantes Acero cruz (D)", categoria: "Colgantes y cadenas de acero", precio: 7989, precioMayorista: null, codigo: "rn131 - Código D", variantes: [], emoji: "⛓️", imagen: "rn131D.jpg" },
  { id: "prod-131-F", nombre: "Colgantes Acero cruz (F)", categoria: "Colgantes y cadenas de acero", precio: 7989, precioMayorista: null, codigo: "rn131 - Código F", variantes: [], emoji: "⛓️", imagen: "rn131F.jpg" },
  { id: "prod-131-G", nombre: "Colgantes Acero cruz (G)", categoria: "Colgantes y cadenas de acero", precio: 7989, precioMayorista: null, codigo: "rn131 - Código G", variantes: [], emoji: "⛓️", imagen: "rn131-g.jpg" },
  { id: "prod-131-H", nombre: "Colgantes Acero cruz (H)", categoria: "Colgantes y cadenas de acero", precio: 7989, precioMayorista: null, codigo: "rn131 - Código H", variantes: [], emoji: "⛓️", imagen: "rn131-h.jpg" },
  { id: "prod-107-A", nombre: "Colgantes Rockers dije chico acero inox. (A)", categoria: "Colgantes y cadenas de acero", precio: 12159, precioMayorista: null, codigo: "rn107 - Código A", variantes: [], emoji: "⛓️", imagen: "rn107A.jpg" },
  { id: "prod-107-B", nombre: "Colgantes Rockers dije chico acero inox. (B)", categoria: "Colgantes y cadenas de acero", precio: 12159, precioMayorista: null, codigo: "rn107 - Código B", variantes: [], emoji: "⛓️", imagen: "rn107B.jpg" },
  { id: "prod-107-C", nombre: "Colgantes Rockers dije chico acero inox. (C)", categoria: "Colgantes y cadenas de acero", precio: 12159, precioMayorista: null, codigo: "rn107 - Código C", variantes: [], emoji: "⛓️", imagen: "rn107C.jpg" },
  { id: "prod-107-D", nombre: "Colgantes Rockers dije chico acero inox. (D)", categoria: "Colgantes y cadenas de acero", precio: 12159, precioMayorista: null, codigo: "rn107 - Código D", variantes: [], emoji: "⛓️", imagen: "rn107D.jpg" },
  { id: "prod-113-A", nombre: "Colgantes Dorado corazones (A)", categoria: "Colgantes y cadenas de acero", precio: 7698, precioMayorista: null, codigo: "rn113 - Código A", variantes: [], emoji: "⛓️", imagen: "rn113A.jpg" },
  { id: "prod-113-B", nombre: "Colgantes Dorado corazones (B)", categoria: "Colgantes y cadenas de acero", precio: 7698, precioMayorista: null, codigo: "rn113 - Código B", variantes: [], emoji: "⛓️", imagen: "rn113B.jpg" },
  { id: "prod-113-C", nombre: "Colgantes Dorado corazones (C)", categoria: "Colgantes y cadenas de acero", precio: 7698, precioMayorista: null, codigo: "rn113 - Código C", variantes: [], emoji: "⛓️", imagen: "rn113C.jpg" },
  { id: "prod-113-D", nombre: "Colgantes Dorado corazones (D)", categoria: "Colgantes y cadenas de acero", precio: 7698, precioMayorista: null, codigo: "rn113 - Código D", variantes: [], emoji: "⛓️", imagen: "rn113D.jpg" },
  { id: "prod-113-E", nombre: "Colgantes Dorado corazones (E)", categoria: "Colgantes y cadenas de acero", precio: 7698, precioMayorista: null, codigo: "rn113 - Código E", variantes: [], emoji: "⛓️", imagen: "rn113E.jpg" },
  { id: "prod-113-F", nombre: "Colgantes Dorado corazones (F)", categoria: "Colgantes y cadenas de acero", precio: 7698, precioMayorista: null, codigo: "rn113 - Código F", variantes: [], emoji: "⛓️", imagen: "rn113F.jpg" },
  { id: "prod-113-G", nombre: "Colgantes Dorado corazones (G)", categoria: "Colgantes y cadenas de acero", precio: 7698, precioMayorista: null, codigo: "rn113 - Código G", variantes: [], emoji: "⛓️", imagen: "rn113G.jpg" },
  { id: "prod-113-H", nombre: "Colgantes Dorado corazones (H)", categoria: "Colgantes y cadenas de acero", precio: 7698, precioMayorista: null, codigo: "rn113 - Código H", variantes: [], emoji: "⛓️", imagen: "rn113H.jpg" },
  { id: "prod-113-I", nombre: "Colgantes Dorado corazones (I)", categoria: "Colgantes y cadenas de acero", precio: 7698, precioMayorista: null, codigo: "rn113 - Código I", variantes: [], emoji: "⛓️", imagen: "rn113I.jpg" },
  { id: "prod-113-J", nombre: "Colgantes Dorado corazones (J)", categoria: "Colgantes y cadenas de acero", precio: 7698, precioMayorista: null, codigo: "rn113 - Código J", variantes: [], emoji: "⛓️", imagen: "rn113J.jpg" },
  { id: "prod-127-A", nombre: "Cadena Acero dorada (A)", categoria: "Colgantes y cadenas de acero", precio: 7089, precioMayorista: null, codigo: "rn127 - Código A", variantes: [], emoji: "⛓️", imagen: "rn127A.jpg" },
  { id: "prod-127-B", nombre: "Cadena Acero dorada (B)", categoria: "Colgantes y cadenas de acero", precio: 7089, precioMayorista: null, codigo: "rn127 - Código B", variantes: [], emoji: "⛓️", imagen: "rn127B.jpg" },
  { id: "prod-127-C", nombre: "Cadena Acero dorada (C)", categoria: "Colgantes y cadenas de acero", precio: 7089, precioMayorista: null, codigo: "rn127 - Código C", variantes: [], emoji: "⛓️", imagen: "rn127C.jpg" },
  { id: "prod-127-D", nombre: "Cadena Acero dorada (D)", categoria: "Colgantes y cadenas de acero", precio: 7089, precioMayorista: null, codigo: "rn127 - Código D", variantes: [], emoji: "⛓️", imagen: "rn127D.jpg" },
  { id: "prod-127-E", nombre: "Cadena Acero dorada (E)", categoria: "Colgantes y cadenas de acero", precio: 7089, precioMayorista: null, codigo: "rn127 - Código E", variantes: [], emoji: "⛓️", imagen: "rn127E.jpg" },
  { id: "prod-127-F", nombre: "Cadena Acero dorada (F)", categoria: "Colgantes y cadenas de acero", precio: 7089, precioMayorista: null, codigo: "rn127 - Código F", variantes: [], emoji: "⛓️", imagen: "rn127F.jpg" },
  { id: "prod-127-G", nombre: "Cadena Acero dorada (G)", categoria: "Colgantes y cadenas de acero", precio: 7089, precioMayorista: null, codigo: "rn127 - Código G", variantes: [], emoji: "⛓️", imagen: "rn127G.jpg" },
  { id: "prod-106-A", nombre: "Colgantes Rockers dije grande acero inox. (A)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código A", variantes: [], emoji: "⛓️", imagen: "rn106A.jpg" },
  { id: "prod-106-B", nombre: "Colgantes Rockers dije grande acero inox. (B)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código B", variantes: [], emoji: "⛓️", imagen: "rn106B.jpg" },
  { id: "prod-106-C", nombre: "Colgantes Rockers dije grande acero inox. (C)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código C", variantes: [], emoji: "⛓️", imagen: "rn106C.jpg" },
  { id: "prod-106-D", nombre: "Colgantes Rockers dije grande acero inox. (D)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código D", variantes: [], emoji: "⛓️", imagen: "rn106D.jpg" },
  { id: "prod-106-E", nombre: "Colgantes Rockers dije grande acero inox. (E)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código E", variantes: [], emoji: "⛓️", imagen: "rn106E.jpg" },
  { id: "prod-106-F", nombre: "Colgantes Rockers dije grande acero inox. (F)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código F", variantes: [], emoji: "⛓️", imagen: "rn106F.jpg" },
  { id: "prod-106-G", nombre: "Colgantes Rockers dije grande acero inox. (G)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código G", variantes: [], emoji: "⛓️", imagen: "rn106G.jpg" },
  { id: "prod-106-H", nombre: "Colgantes Rockers dije grande acero inox. (H)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código H", variantes: [], emoji: "⛓️", imagen: "rn106H.jpg" },
  { id: "prod-106-I", nombre: "Colgantes Rockers dije grande acero inox. (I)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código I", variantes: [], emoji: "⛓️", imagen: "rn106i.jpg" },
  { id: "prod-106-J", nombre: "Colgantes Rockers dije grande acero inox. (J)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código J", variantes: [], emoji: "⛓️", imagen: "rn106J.jpg" },
  { id: "prod-106-K", nombre: "Colgantes Rockers dije grande acero inox. (K)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código K", variantes: [], emoji: "⛓️", imagen: "rn106K.jpg" },
  { id: "prod-106-L", nombre: "Colgantes Rockers dije grande acero inox. (L)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código L", variantes: [], emoji: "⛓️", imagen: "rn106L.jpg" },
  { id: "prod-106-M", nombre: "Colgantes Rockers dije grande acero inox. (M)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código M", variantes: [], emoji: "⛓️", imagen: "rn106M.jpg" },
  { id: "prod-106-N", nombre: "Colgantes Rockers dije grande acero inox. (N)", categoria: "Colgantes y cadenas de acero", precio: 17890, precioMayorista: null, codigo: "rn106 - Código N", variantes: [], emoji: "⛓️", imagen: "rn106N.jpg" },
  { id: "prod-117", nombre: "Colgantes Chokers flecha corazon acero inox.", categoria: "Colgantes y cadenas de acero", precio: 13596, precioMayorista: null, codigo: "rn117", variantes: [], emoji: "⛓️", imagen: "rn117a.jpg" },
  { id: "prod-103", nombre: "Colgantes Negro pirata", categoria: "Colgantes y cadenas de acero", precio: 7259, precioMayorista: null, codigo: "rn103", variantes: [], emoji: "⛓️", imagen: "rn103a.jpg" },
  { id: "prod-108", nombre: "Colgantes Negro corazon acero inox", categoria: "Colgantes y cadenas de acero", precio: 5984, precioMayorista: null, codigo: "rn108", variantes: [], emoji: "⛓️", imagen: "rn108.jpg" },
  { id: "prod-109-A", nombre: "Colgantes Rosario piedras naturales ac. y pi. (A)", categoria: "Colgantes y cadenas de acero", precio: 22893, precioMayorista: null, codigo: "rn109 - Código A", variantes: [], emoji: "⛓️", imagen: "rn109A.jpg" },
  { id: "prod-109-B", nombre: "Colgantes Rosario piedras naturales ac. y pi. (B)", categoria: "Colgantes y cadenas de acero", precio: 22893, precioMayorista: null, codigo: "rn109 - Código B", variantes: [], emoji: "⛓️", imagen: "rn109B.jpg" },
  { id: "prod-110-A", nombre: "Colgantes Darks byc (A)", categoria: "Colgantes y cadenas de acero", precio: 6580, precioMayorista: null, codigo: "rn110 - Código A", variantes: [], emoji: "⛓️", imagen: "rn110A.jpg" },
  { id: "prod-110-B", nombre: "Colgantes Darks byc (B)", categoria: "Colgantes y cadenas de acero", precio: 6580, precioMayorista: null, codigo: "rn110 - Código B", variantes: [], emoji: "⛓️", imagen: "rn110B.jpg" },
  { id: "prod-110-C", nombre: "Colgantes Darks byc (C)", categoria: "Colgantes y cadenas de acero", precio: 6580, precioMayorista: null, codigo: "rn110 - Código C", variantes: [], emoji: "⛓️", imagen: "rn110C.jpg" },
  { id: "prod-110-D", nombre: "Colgantes Darks byc (D)", categoria: "Colgantes y cadenas de acero", precio: 6580, precioMayorista: null, codigo: "rn110 - Código D", variantes: [], emoji: "⛓️", imagen: "rn110D.jpg" },
  { id: "prod-110-E", nombre: "Colgantes Darks byc (E)", categoria: "Colgantes y cadenas de acero", precio: 6580, precioMayorista: null, codigo: "rn110 - Código E", variantes: [], emoji: "⛓️", imagen: "rn110E.jpg" },
  { id: "prod-110-F", nombre: "Colgantes Darks byc (F)", categoria: "Colgantes y cadenas de acero", precio: 6580, precioMayorista: null, codigo: "rn110 - Código F", variantes: [], emoji: "⛓️", imagen: "rn110F.jpg" },
  { id: "prod-110-G", nombre: "Colgantes Darks byc (G)", categoria: "Colgantes y cadenas de acero", precio: 6580, precioMayorista: null, codigo: "rn110 - Código G", variantes: [], emoji: "⛓️", imagen: "rn110G.jpg" },
  { id: "prod-110-H", nombre: "Colgantes Darks byc (H)", categoria: "Colgantes y cadenas de acero", precio: 6580, precioMayorista: null, codigo: "rn110 - Código H", variantes: [], emoji: "⛓️", imagen: "rn110H.jpg" },
  { id: "prod-110-I", nombre: "Colgantes Darks byc (I)", categoria: "Colgantes y cadenas de acero", precio: 6580, precioMayorista: null, codigo: "rn110 - Código I", variantes: [], emoji: "⛓️", imagen: "rn110i.jpg" },
  { id: "prod-110-J", nombre: "Colgantes Darks byc (J)", categoria: "Colgantes y cadenas de acero", precio: 6580, precioMayorista: null, codigo: "rn110 - Código J", variantes: [], emoji: "⛓️", imagen: "rn110J.jpg" },
  { id: "prod-111", nombre: "Colgantes Serpiente plata acero inox.", categoria: "Colgantes y cadenas de acero", precio: 7981, precioMayorista: null, codigo: "rn111", variantes: [], emoji: "⛓️", imagen: "rn111.jpg" },
  { id: "prod-112", nombre: "Colgantes Moño corazon aleacion", categoria: "Colgantes y cadenas de acero", precio: 7918, precioMayorista: null, codigo: "rn112", variantes: [], emoji: "⛓️", imagen: "rn112.jpg" },
  { id: "prod-115-A", nombre: "Colgantes Corazones dorados acero inox. (A)", categoria: "Colgantes y cadenas de acero", precio: 9521, precioMayorista: null, codigo: "rn115 - Código A", variantes: [], emoji: "⛓️", imagen: "rn115A.jpg" },
  { id: "prod-115-B", nombre: "Colgantes Corazones dorados acero inox. (B)", categoria: "Colgantes y cadenas de acero", precio: 9521, precioMayorista: null, codigo: "rn115 - Código B", variantes: [], emoji: "⛓️", imagen: "rn115B.jpg" },
  { id: "prod-115-D", nombre: "Colgantes Corazones dorados acero inox. (D)", categoria: "Colgantes y cadenas de acero", precio: 9521, precioMayorista: null, codigo: "rn115 - Código D", variantes: [], emoji: "⛓️", imagen: "rn115D.jpg" },
  { id: "prod-115-F", nombre: "Colgantes Corazones dorados acero inox. (F)", categoria: "Colgantes y cadenas de acero", precio: 9521, precioMayorista: null, codigo: "rn115 - Código F", variantes: [], emoji: "⛓️", imagen: "rn115F.jpg" },
  { id: "prod-115-G", nombre: "Colgantes Corazones dorados acero inox. (G)", categoria: "Colgantes y cadenas de acero", precio: 9521, precioMayorista: null, codigo: "rn115 - Código G", variantes: [], emoji: "⛓️", imagen: "rn115G.jpg" },
  { id: "prod-116-A", nombre: "Colgantes Chokers darksv (A)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn116 - Código A", variantes: [], emoji: "⛓️", imagen: "rn116A.jpg" },
  { id: "prod-116-B", nombre: "Colgantes Chokers darksv (B)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn116 - Código B", variantes: [], emoji: "⛓️", imagen: "rn116B.jpg" },
  { id: "prod-116-C", nombre: "Colgantes Chokers darksv (C)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn116 - Código C", variantes: [], emoji: "⛓️", imagen: "rn116C.jpg" },
  { id: "prod-116-D", nombre: "Colgantes Chokers darksv (D)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn116 - Código D", variantes: [], emoji: "⛓️", imagen: "rn116D.jpg" },
  { id: "prod-116-E", nombre: "Colgantes Chokers darksv (E)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn116 - Código E", variantes: [], emoji: "⛓️", imagen: "rn116E.jpg" },
  { id: "prod-116-F", nombre: "Colgantes Chokers darksv (F)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn116 - Código F", variantes: [], emoji: "⛓️", imagen: "rn116F.jpg" },
  { id: "prod-116-G", nombre: "Colgantes Chokers darksv (G)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn116 - Código G", variantes: [], emoji: "⛓️", imagen: "rn116G.jpg" },
  { id: "prod-116-H", nombre: "Colgantes Chokers darksv (H)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn116 - Código H", variantes: [], emoji: "⛓️", imagen: "rn116H.jpg" },
  { id: "prod-116-I", nombre: "Colgantes Chokers darksv (I)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn116 - Código I", variantes: [], emoji: "⛓️", imagen: "rn116i.jpg" },
  { id: "prod-116-J", nombre: "Colgantes Chokers darksv (J)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn116 - Código J", variantes: [], emoji: "⛓️", imagen: "rn116J.jpg" },
  { id: "prod-119-A", nombre: "Colgantes Chokers mariposas variedad (A)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn119 - Código A", variantes: [], emoji: "⛓️", imagen: "rn119A.jpg" },
  { id: "prod-119-B", nombre: "Colgantes Chokers mariposas variedad (B)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn119 - Código B", variantes: [], emoji: "⛓️", imagen: "rn119B.jpg" },
  { id: "prod-119-C", nombre: "Colgantes Chokers mariposas variedad (C)", categoria: "Colgantes y cadenas de acero", precio: 11596, precioMayorista: null, codigo: "rn119 - Código C", variantes: [], emoji: "⛓️", imagen: "rn119C.jpg" },
  { id: "prod-120-A", nombre: "Colgantes Chokers serpiente brillo acero (A)", categoria: "Colgantes y cadenas de acero", precio: 10064, precioMayorista: null, codigo: "rn120 - Código A", variantes: [], emoji: "⛓️", imagen: "rn120A.jpg" },
  { id: "prod-120-B", nombre: "Colgantes Chokers serpiente brillo acero (B)", categoria: "Colgantes y cadenas de acero", precio: 10064, precioMayorista: null, codigo: "rn120 - Código B", variantes: [], emoji: "⛓️", imagen: "rn120B.jpg" },
  { id: "prod-118", nombre: "Colgantes Chokers negro luna acero", categoria: "Colgantes y cadenas de acero", precio: 11080, precioMayorista: null, codigo: "rn118", variantes: [], emoji: "⛓️", imagen: "rn118.jpg" },
  { id: "prod-121-A", nombre: "Cadena Gruesas rock acero inox. (A)", categoria: "Colgantes y cadenas de acero", precio: 11569, precioMayorista: null, codigo: "rn121 - Código A", variantes: [], emoji: "⛓️", imagen: "rn121A.jpg" },
  { id: "prod-121-B", nombre: "Cadena Gruesas rock acero inox. (B)", categoria: "Colgantes y cadenas de acero", precio: 11569, precioMayorista: null, codigo: "rn121 - Código B", variantes: [], emoji: "⛓️", imagen: "rn121B.jpg" },
  { id: "prod-121-C", nombre: "Cadena Gruesas rock acero inox. (C)", categoria: "Colgantes y cadenas de acero", precio: 11569, precioMayorista: null, codigo: "rn121 - Código C", variantes: [], emoji: "⛓️", imagen: "rn121C.jpg" },
  { id: "prod-121-D", nombre: "Cadena Gruesas rock acero inox. (D)", categoria: "Colgantes y cadenas de acero", precio: 11569, precioMayorista: null, codigo: "rn121 - Código D", variantes: [], emoji: "⛓️", imagen: "rn121D.jpg" },
  { id: "prod-121-E", nombre: "Cadena Gruesas rock acero inox. (E)", categoria: "Colgantes y cadenas de acero", precio: 11569, precioMayorista: null, codigo: "rn121 - Código E", variantes: [], emoji: "⛓️", imagen: "rn121E.jpg" },
  { id: "prod-121-F", nombre: "Cadena Gruesas rock acero inox. (F)", categoria: "Colgantes y cadenas de acero", precio: 11569, precioMayorista: null, codigo: "rn121 - Código F", variantes: [], emoji: "⛓️", imagen: "rn121F.jpg" },
  { id: "prod-121-G", nombre: "Cadena Gruesas rock acero inox. (G)", categoria: "Colgantes y cadenas de acero", precio: 11569, precioMayorista: null, codigo: "rn121 - Código G", variantes: [], emoji: "⛓️", imagen: "rn121G.jpg" },
  { id: "prod-121-H", nombre: "Cadena Gruesas rock acero inox. (H)", categoria: "Colgantes y cadenas de acero", precio: 11569, precioMayorista: null, codigo: "rn121 - Código H", variantes: [], emoji: "⛓️", imagen: "rn121H.jpg" },
  { id: "prod-121-I", nombre: "Cadena Gruesas rock acero inox. (I)", categoria: "Colgantes y cadenas de acero", precio: 11569, precioMayorista: null, codigo: "rn121 - Código I", variantes: [], emoji: "⛓️", imagen: "rn121i.jpg" },
  { id: "prod-121-J", nombre: "Cadena Gruesas rock acero inox. (J)", categoria: "Colgantes y cadenas de acero", precio: 11569, precioMayorista: null, codigo: "rn121 - Código J", variantes: [], emoji: "⛓️", imagen: "rn121J.jpg" },
  { id: "prod-121-K", nombre: "Cadena Gruesas rock acero inox. (K)", categoria: "Colgantes y cadenas de acero", precio: 11569, precioMayorista: null, codigo: "rn121 - Código K", variantes: [], emoji: "⛓️", imagen: "rn121K.jpg" },
  { id: "prod-121-O", nombre: "Cadena Gruesas rock acero inox. (O)", categoria: "Colgantes y cadenas de acero", precio: 11569, precioMayorista: null, codigo: "rn121 - Código O", variantes: [], emoji: "⛓️", imagen: "rn121O.jpg" },
  { id: "prod-128", nombre: "Cadena Cinta dorada acero inox", categoria: "Colgantes y cadenas de acero", precio: 4897, precioMayorista: null, codigo: "rn128", variantes: [], emoji: "⛓️", imagen: "rn128.jpg" },
  { id: "prod-135", nombre: "Cadena Eslabon puas", categoria: "Colgantes y cadenas de acero", precio: 16909, precioMayorista: null, codigo: "rn135", variantes: [], emoji: "⛓️", imagen: "rn135.jpg" },
  { id: "prod-402-r", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código R", variantes: [], emoji: "✨", imagen: "rn402-r.jpg" },
  { id: "prod-402-m", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código M", variantes: [], emoji: "✨", imagen: "rn402-m.jpg" },
  { id: "prod-402-d", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código D", variantes: [], emoji: "✨", imagen: "rn402-d.jpg" },
  { id: "prod-402-k", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código K", variantes: [], emoji: "✨", imagen: "rn402-k.jpg" },
  { id: "prod-402-c", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código C", variantes: [], emoji: "✨", imagen: "rn402-c.jpg" },
  { id: "prod-402-i", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código I", variantes: [], emoji: "✨", imagen: "rn402-i.jpg" },
  { id: "prod-402-p", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código P", variantes: [], emoji: "✨", imagen: "rn402-p.jpg" },
  { id: "prod-402-f", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código F", variantes: [], emoji: "✨", imagen: "rn402-f.jpg" },
  { id: "prod-402-g", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código G", variantes: [], emoji: "✨", imagen: "rn402-g.jpg" },
  { id: "prod-402-o", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código O", variantes: [], emoji: "✨", imagen: "rn402-o.jpg" },
  { id: "prod-402-l", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código L", variantes: [], emoji: "✨", imagen: "rn402-l.jpg" },
  { id: "prod-402-a", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código A", variantes: [], emoji: "✨", imagen: "rn402-a.jpg" },
  { id: "prod-402-h", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código H", variantes: [], emoji: "✨", imagen: "rn402-h.jpg" },
  { id: "prod-402-e", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código E", variantes: [], emoji: "✨", imagen: "rn402-e.jpg" },
  { id: "prod-402-j", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código J", variantes: [], emoji: "✨", imagen: "rn402-j.jpg" },
  { id: "prod-402-ñ", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código Ñ", variantes: [], emoji: "✨", imagen: "rn402-ñ.jpg" },
  { id: "prod-402-b", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código B", variantes: [], emoji: "✨", imagen: "rn402-b.jpg" },
  { id: "prod-402-q", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código Q", variantes: [], emoji: "✨", imagen: "rn402-q.jpg" },
  { id: "prod-402-n", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código N", variantes: [], emoji: "✨", imagen: "rn402-n.jpg" },
  { id: "prod-402-b2", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código B2", variantes: [], emoji: "✨", imagen: "rn402-b2.jpg" },
  { id: "prod-402-t1", nombre: "Aros Negros individuales", categoria: "Aros de acero", precio: 2509, precioMayorista: null, codigo: "rn402 - Código T1", variantes: [], emoji: "✨", imagen: "rn402-t1.jpg" },
  { id: "prod-403-j", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código J", variantes: [], emoji: "✨", imagen: "rn403-j.jpg" },
  { id: "prod-403-n", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código N", variantes: [], emoji: "✨", imagen: "rn403-n.jpg" },
  { id: "prod-403-q", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código Q", variantes: [], emoji: "✨", imagen: "rn403-q.jpg" },
  { id: "prod-403-w", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código W", variantes: [], emoji: "✨", imagen: "rn403-w.jpg" },
  { id: "prod-403-t", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código T", variantes: [], emoji: "✨", imagen: "rn403-t.jpg" },
  { id: "prod-403-m", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código M", variantes: [], emoji: "✨", imagen: "rn403-m.jpg" },
  { id: "prod-403-p", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código P", variantes: [], emoji: "✨", imagen: "rn403-p.jpg" },
  { id: "prod-403-o", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código O", variantes: [], emoji: "✨", imagen: "rn403-o.jpg" },
  { id: "prod-403-k", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código K", variantes: [], emoji: "✨", imagen: "rn403-k.jpg" },
  { id: "prod-403-r", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código R", variantes: ["Plateado", "Dorado", "Negro"], emoji: "✨", imagen: "rn403-r.jpg", imagenesPorVariante: { "Plateado": "rn403-p.jpg", "Dorado": "rn403-d.jpg", "Negro": "rn403-n.jpg" } },
  { id: "prod-403-g", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código G", variantes: ["Plateado", "Dorado", "Negro"], emoji: "✨", imagen: "rn403-g.jpg", imagenesPorVariante: { "Plateado": "rn403-p.jpg", "Dorado": "rn403-d.jpg", "Negro": "rn403-n.jpg" } },
  { id: "prod-403-b", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código B", variantes: [], emoji: "✨", imagen: "rn403-b.jpg" },
  { id: "prod-403-c", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código C", variantes: ["Plateado", "Dorado", "Negro"], emoji: "✨", imagen: "rn403-c.jpg", imagenesPorVariante: { "Plateado": "rn403-p.jpg", "Dorado": "rn403-d.jpg", "Negro": "rn403-n.jpg" } },
  { id: "prod-403-a", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código A", variantes: [], emoji: "✨", imagen: "rn403-a.jpg" },
  { id: "prod-403-e", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código E", variantes: ["Azulado", "Dorado", "Plateado", "Negro", "Tornasolado"], emoji: "✨", imagen: "rn403-e.jpg", imagenesPorVariante: { "Azulado": "rn403-a.jpg", "Dorado": "rn403-d.jpg", "Plateado": "rn403-p.jpg", "Negro": "rn403-n.jpg", "Tornasolado": "rn403-t.jpg" } },
  { id: "prod-403-f", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código F", variantes: ["Plateado", "Dorado", "Negro"], emoji: "✨", imagen: "rn403-f.jpg", imagenesPorVariante: { "Plateado": "rn403-p.jpg", "Dorado": "rn403-d.jpg", "Negro": "rn403-n.jpg" } },
  { id: "prod-403-d", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código D", variantes: [], emoji: "✨", imagen: "rn403-d.jpg" },
  { id: "prod-403-b2", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código B2", variantes: ["Plateado", "Dorado", "Negro"], emoji: "✨", imagen: "rn403-b2.jpg", imagenesPorVariante: { "Plateado": "rn403-p.jpg", "Dorado": "rn403-d.jpg", "Negro": "rn403-n.jpg" } },
  { id: "prod-403-c2", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código C2", variantes: ["Plateado", "Dorado", "Negro"], emoji: "✨", imagen: "rn403-c2.jpg", imagenesPorVariante: { "Plateado": "rn403-p.jpg", "Dorado": "rn403-d.jpg", "Negro": "rn403-n.jpg" } },
  { id: "prod-403-c3", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código C3", variantes: ["Negro", "Plateado"], emoji: "✨", imagen: "rn403-c3.jpg", imagenesPorVariante: { "Negro": "rn403-n.jpg", "Plateado": "rn403-p.jpg" } },
  { id: "prod-403-c4", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código C4", variantes: ["Negro", "Plateado"], emoji: "✨", imagen: "rn403-c4.jpg", imagenesPorVariante: { "Negro": "rn403-n.jpg", "Plateado": "rn403-p.jpg" } },
  { id: "prod-403-p1", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código P1", variantes: ["Negro", "Plateado"], emoji: "✨", imagen: "rn403-p1.jpg", imagenesPorVariante: { "Negro": "rn403-n.jpg", "Plateado": "rn403-p.jpg" } },
  { id: "prod-403-r2", nombre: "Aros Negros acero", categoria: "Aros de acero", precio: 4669, precioMayorista: null, codigo: "rn403 - Código R2", variantes: [], emoji: "✨", imagen: "rn403-r2.jpg" },
  { id: "prod-401-mb", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código MB", variantes: ["Negro", "Plateado"], emoji: "✨", imagen: "rn401-mb.jpg", imagenesPorVariante: { "Negro": "rn401-n.jpg", "Plateado": "rn401-p.jpg" } },
  { id: "prod-401-z", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código Z", variantes: [], emoji: "✨", imagen: "rn401-z.jpg" },
  { id: "prod-401-p", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código P", variantes: [], emoji: "✨", imagen: "rn401-p.jpg" },
  { id: "prod-401-ñ", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código Ñ", variantes: [], emoji: "✨", imagen: "rn401-ñ.jpg" },
  { id: "prod-401-q", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código Q", variantes: [], emoji: "✨", imagen: "rn401-q.jpg" },
  { id: "prod-401-o", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código O", variantes: [], emoji: "✨", imagen: "rn401-o.jpg" },
  { id: "prod-401-b1", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código B1", variantes: [], emoji: "✨", imagen: "rn401-b1.jpg" },
  { id: "prod-401-y", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código Y", variantes: [], emoji: "✨", imagen: "rn401-y.jpg" },
  { id: "prod-401-j", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código J", variantes: [], emoji: "✨", imagen: "rn401-j.jpg" },
  { id: "prod-401-k", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código K", variantes: [], emoji: "✨", imagen: "rn401-k.jpg" },
  { id: "prod-401-a", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código A", variantes: [], emoji: "✨", imagen: "rn401-a.jpg" },
  { id: "prod-401-h2", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código H2", variantes: [], emoji: "✨", imagen: "rn401-h2.jpg" },
  { id: "prod-401-za1", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código ZA1", variantes: ["Plateado", "Dorado"], emoji: "✨", imagen: "rn401-za1.jpg", imagenesPorVariante: { "Plateado": "rn401-p.jpg", "Dorado": "rn401-d.jpg" } },
  { id: "prod-401-x", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código X", variantes: [], emoji: "✨", imagen: "rn401-x.jpg" },
  { id: "prod-401-r", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código R", variantes: [], emoji: "✨", imagen: "rn401-r.jpg" },
  { id: "prod-401-w", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código W", variantes: [], emoji: "✨", imagen: "rn401-w.jpg" },
  { id: "prod-401-w2", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código W2", variantes: [], emoji: "✨", imagen: "rn401-w2.jpg" },
  { id: "prod-401-h", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código H", variantes: [], emoji: "✨", imagen: "rn401-h.jpg" },
  { id: "prod-401-i", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código I", variantes: [], emoji: "✨", imagen: "rn401-i.jpg" },
  { id: "prod-401-b2", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código B2", variantes: [], emoji: "✨", imagen: "rn401-b2.jpg" },
  { id: "prod-401-c2", nombre: "Aros Rocks acero", categoria: "Aros de acero", precio: 7300, precioMayorista: null, codigo: "rn401 - Código C2", variantes: [], emoji: "✨", imagen: "rn401-c2.jpg" },
  { id: "prod-407-fc", nombre: "Argollas Heavys", categoria: "Aros de acero", precio: 6584, precioMayorista: null, codigo: "rn407 - Código FC", variantes: ["Plateado", "Dorado"], emoji: "✨", imagen: "rn407-fc.jpg", imagenesPorVariante: { "Plateado": "rn407-fc.jpg", "Dorado": "rn407-d.jpg" } },
  { id: "prod-407-b", nombre: "Argollas Heavys", categoria: "Aros de acero", precio: 6584, precioMayorista: null, codigo: "rn407 - Código B", variantes: ["Plateado", "Dorado"], emoji: "✨", imagen: "rn407-b.jpg", imagenesPorVariante: { "Plateado": "rn407-b.jpg", "Dorado": "rn407-d.jpg" } },
  { id: "prod-407-a", nombre: "Argollas Heavys", categoria: "Aros de acero", precio: 6584, precioMayorista: null, codigo: "rn407 - Código A", variantes: ["Plateado", "Dorado"], emoji: "✨", imagen: "rn407-a.jpg", imagenesPorVariante: { "Plateado": "rn407-a.jpg", "Dorado": "rn407-d.jpg" } },
  { id: "prod-406", nombre: "Abridor Calavera acero", categoria: "Aros de acero", precio: 4529, precioMayorista: null, codigo: "rn406", variantes: [], emoji: "✨", imagen: "rn406.jpg" },
  { id: "prod-411-ab", nombre: "Pasante Acero serpiente", categoria: "Aros de acero", precio: 10009, precioMayorista: null, codigo: "rn411 - Código AB", variantes: ["Plateado", "Dorado"], emoji: "✨", imagen: "rn411-ab.jpg", imagenesPorVariante: { "Plateado": "rn411-ab.jpg", "Dorado": "rn411-d.jpg" } },
  { id: "prod-410-e", nombre: "Argollas Doradas par", categoria: "Aros de acero", precio: 7533, precioMayorista: null, codigo: "rn410 - Código E", variantes: [], emoji: "✨", imagen: "rn410-e.jpg" },
  { id: "prod-410-a", nombre: "Argollas Doradas par", categoria: "Aros de acero", precio: 7533, precioMayorista: null, codigo: "rn410 - Código A", variantes: [], emoji: "✨", imagen: "rn410-a.jpg" },
  { id: "prod-410-c", nombre: "Argollas Doradas par", categoria: "Aros de acero", precio: 7533, precioMayorista: null, codigo: "rn410 - Código C", variantes: [], emoji: "✨", imagen: "rn410-c.jpg" },
  { id: "prod-410-d", nombre: "Argollas Doradas par", categoria: "Aros de acero", precio: 7533, precioMayorista: null, codigo: "rn410 - Código D", variantes: [], emoji: "✨", imagen: "rn410-d.jpg" },
  { id: "prod-410-b", nombre: "Argollas Doradas par", categoria: "Aros de acero", precio: 7533, precioMayorista: null, codigo: "rn410 - Código B", variantes: [], emoji: "✨", imagen: "rn410-b.jpg" },
  { id: "prod-056-A", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código A", variantes: [], emoji: "💍", imagen: "rn507-a.jpg" },
  { id: "prod-056-B", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código B", variantes: [], emoji: "💍", imagen: "rn507-b.jpg" },
  { id: "prod-056-D", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código D", variantes: [], emoji: "💍", imagen: "rn507-d.jpg" },
  { id: "prod-056-E", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código E", variantes: [], emoji: "💍", imagen: "rn507-e.jpg" },
  { id: "prod-056-F", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código F", variantes: [], emoji: "💍", imagen: "rn507-f.jpg" },
  { id: "prod-056-G", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código G", variantes: [], emoji: "💍", imagen: "rn507-g.jpg" },
  { id: "prod-056-H", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código H", variantes: [], emoji: "💍", imagen: "rn507-h.jpg" },
  { id: "prod-056-I", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código I", variantes: [], emoji: "💍", imagen: "rn507-i.jpg" },
  { id: "prod-056-J", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código J", variantes: [], emoji: "💍", imagen: "rn507-j.jpg" },
  { id: "prod-056-K", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código K", variantes: [], emoji: "💍", imagen: "rn507-k.jpg" },
  { id: "prod-056-L", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código L", variantes: [], emoji: "💍", imagen: "rn507-l.jpg" },
  { id: "prod-056-P", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código P", variantes: [], emoji: "💍", imagen: "rn507-p.jpg" },
  { id: "prod-056-U", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código U", variantes: [], emoji: "💍", imagen: "rn507-u.jpg" },
  { id: "prod-056-W", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código W", variantes: [], emoji: "💍", imagen: "rn507-w.jpg" },
  { id: "prod-056-Y", nombre: "Anillos Dorados", categoria: "Anillos de acero", precio: 7309, precioMayorista: null, codigo: "Rn507 - Código Y", variantes: [], emoji: "💍", imagen: "rn507-y.jpg" },
  { id: "prod-046-B", nombre: "Anillo Eddie Egipcio Acero", categoria: "Anillos de acero", precio: 5549, precioMayorista: null, codigo: "Rn509 - Código B", variantes: [], emoji: "💍", imagen: "rn509-b.jpg" },
  { id: "prod-046-D", nombre: "Anillo Eddie Egipcio Acero", categoria: "Anillos de acero", precio: 5549, precioMayorista: null, codigo: "Rn509 - Código D", variantes: [], emoji: "💍", imagen: "rn509-d.jpg" },
  { id: "prod-046-E", nombre: "Anillo Eddie Egipcio Acero", categoria: "Anillos de acero", precio: 5549, precioMayorista: null, codigo: "Rn509 - Código E", variantes: [], emoji: "💍", imagen: "rn509-e.jpg" },
  { id: "prod-046-F", nombre: "Anillo Eddie Egipcio Acero", categoria: "Anillos de acero", precio: 5549, precioMayorista: null, codigo: "Rn509 - Código F", variantes: [], emoji: "💍", imagen: "rn509-f.jpg" },
  { id: "prod-046-G", nombre: "Anillo Eddie Egipcio Acero", categoria: "Anillos de acero", precio: 5549, precioMayorista: null, codigo: "Rn509 - Código G", variantes: [], emoji: "💍", imagen: "rn509-g.jpg" },
  { id: "prod-046-H", nombre: "Anillo Eddie Egipcio Acero", categoria: "Anillos de acero", precio: 5549, precioMayorista: null, codigo: "Rn509 - Código H", variantes: [], emoji: "💍", imagen: "rn509-h.jpg" },
  { id: "prod-047-A", nombre: "Anillos Cornias antiguos", categoria: "Anillos de acero", precio: 16980, precioMayorista: null, codigo: "Rn510 - Código A", variantes: [], emoji: "💍", imagen: "rn510-a.jpg" },
  { id: "prod-047-B", nombre: "Anillos Cornias antiguos", categoria: "Anillos de acero", precio: 16980, precioMayorista: null, codigo: "Rn510 - Código B", variantes: [], emoji: "💍", imagen: "rn510-b.jpg" },
  { id: "prod-047-C", nombre: "Anillos Cornias antiguos", categoria: "Anillos de acero", precio: 16980, precioMayorista: null, codigo: "Rn510 - Código C", variantes: [], emoji: "💍", imagen: "rn510-c.jpg" },
  { id: "prod-047-D", nombre: "Anillos Cornias antiguos", categoria: "Anillos de acero", precio: 16980, precioMayorista: null, codigo: "Rn510 - Código D", variantes: [], emoji: "💍", imagen: "rn510-d.jpg" },
  { id: "prod-028R-A1", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código A1", variantes: [], emoji: "💍", imagen: "rn501-a1.jpg" },
  { id: "prod-028R-AA", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código AA", variantes: [], emoji: "💍", imagen: "rn501-aa.jpg" },
  { id: "prod-028R-AB", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código AB", variantes: [], emoji: "💍", imagen: "rn501-ab.jpg" },
  { id: "prod-028R-AC", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código AC", variantes: [], emoji: "💍", imagen: "rn501-ac.jpg" },
  { id: "prod-028R-B", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código B", variantes: [], emoji: "💍", imagen: "rn501-b.jpg" },
  { id: "prod-028R-B1", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código B1", variantes: [], emoji: "💍", imagen: "rn501-b1.jpg" },
  { id: "prod-028R-C", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código C", variantes: [], emoji: "💍", imagen: "rn501-c.jpg" },
  { id: "prod-028R-D", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código D", variantes: [], emoji: "💍", imagen: "rn501-d.jpg" },
  { id: "prod-028R-E", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código E", variantes: [], emoji: "💍", imagen: "rn501-e.jpg" },
  { id: "prod-028R-F", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código F", variantes: [], emoji: "💍", imagen: "rn501-f.jpg" },
  { id: "prod-028R-G", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código G", variantes: [], emoji: "💍", imagen: "rn501-g.jpg" },
  { id: "prod-028R-H", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código H", variantes: [], emoji: "💍", imagen: "rn501-h.jpg" },
  { id: "prod-028R-I", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código I", variantes: [], emoji: "💍", imagen: "rn501-i.jpg" },
  { id: "prod-028R-J", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código J", variantes: [], emoji: "💍", imagen: "rn501-j.jpg" },
  { id: "prod-028R-K", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código K", variantes: [], emoji: "💍", imagen: "rn501-k.jpg" },
  { id: "prod-028R-L", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código L", variantes: [], emoji: "💍", imagen: "rn501-l.jpg" },
  { id: "prod-028R-M", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código M", variantes: [], emoji: "💍", imagen: "rn501-m.jpg" },
  { id: "prod-028R-N", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código N", variantes: [], emoji: "💍", imagen: "rn501-n.jpg" },
  { id: "prod-028R-Ñ", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código Ñ", variantes: [], emoji: "💍", imagen: "rn501-ñ.jpg" },
  { id: "prod-028R-O", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código O", variantes: [], emoji: "💍", imagen: "rn501-o.jpg" },
  { id: "prod-028R-P", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código P", variantes: [], emoji: "💍", imagen: "rn501-p.jpg" },
  { id: "prod-028R-Q", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código Q", variantes: [], emoji: "💍", imagen: "rn501-q.jpg" },
  { id: "prod-028R-R", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código R", variantes: [], emoji: "💍", imagen: "rn501-r.jpg" },
  { id: "prod-028R-S", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código S", variantes: [], emoji: "💍", imagen: "rn501-s.jpg" },
  { id: "prod-028R-T", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código T", variantes: [], emoji: "💍", imagen: "rn501-t.jpg" },
  { id: "prod-028R-U", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código U", variantes: [], emoji: "💍", imagen: "rn501-u.jpg" },
  { id: "prod-028R-V", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código V", variantes: [], emoji: "💍", imagen: "rn501-v.jpg" },
  { id: "prod-028R-W", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código W", variantes: [], emoji: "💍", imagen: "rn501-w.jpg" },
  { id: "prod-028R-X", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código X", variantes: [], emoji: "💍", imagen: "rn501-x.jpg" },
  { id: "prod-028R-XX", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código XX", variantes: [], emoji: "💍", imagen: "rn501-xx.jpg" },
  { id: "prod-028R-Y", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código Y", variantes: [], emoji: "💍", imagen: "rn501-y.jpg" },
  { id: "prod-028R-YY", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código YY", variantes: [], emoji: "💍", imagen: "rn501-yy.jpg" },
  { id: "prod-028R-Z", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código Z", variantes: [], emoji: "💍", imagen: "rn501-z.jpg" },
  { id: "prod-028R-ZZ", nombre: "Anillo Varios Rock", categoria: "Anillos de acero", precio: 10789, precioMayorista: null, codigo: "Rn501 - Código ZZ", variantes: [], emoji: "💍", imagen: "rn501-zz.jpg" },
  { id: "prod-044-B", nombre: "Anillo Varios aleacion", categoria: "Anillos de acero", precio: 4125, precioMayorista: null, codigo: "RN502 - Código B", variantes: [], emoji: "💍", imagen: "rn502-b.jpg" },
  { id: "prod-945-A", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código A", variantes: [], emoji: "💍", imagen: "rn505-a.jpg" },
  { id: "prod-945-B", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código B", variantes: [], emoji: "💍", imagen: "rn505-b.jpg" },
  { id: "prod-945-C", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código C", variantes: [], emoji: "💍", imagen: "rn505-c.jpg" },
  { id: "prod-945-D", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código D", variantes: [], emoji: "💍", imagen: "rn505-d.jpg" },
  { id: "prod-945-F", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código F", variantes: [], emoji: "💍", imagen: "rn505-f.jpg" },
  { id: "prod-945-G", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código G", variantes: [], emoji: "💍", imagen: "rn505-g.jpg" },
  { id: "prod-945-H", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código H", variantes: [], emoji: "💍", imagen: "rn505-h.jpg" },
  { id: "prod-945-I", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código I", variantes: [], emoji: "💍", imagen: "rn505-i.jpg" },
  { id: "prod-945-J", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código J", variantes: [], emoji: "💍", imagen: "rn505-j.jpg" },
  { id: "prod-945-K", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código K", variantes: [], emoji: "💍", imagen: "rn505-k.jpg" },
  { id: "prod-945-L", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código L", variantes: [], emoji: "💍", imagen: "rn505-l.jpg" },
  { id: "prod-945-M", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código M", variantes: [], emoji: "💍", imagen: "rn505-m.jpg" },
  { id: "prod-945-N", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código N", variantes: [], emoji: "💍", imagen: "rn505-n.jpg" },
  { id: "prod-945-O", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código O", variantes: [], emoji: "💍", imagen: "rn505-o.jpg" },
  { id: "prod-945-P", nombre: "Anillo Liso Acero", categoria: "Anillos de acero", precio: 5099, precioMayorista: null, codigo: "rn505 - Código P", variantes: [], emoji: "💍", imagen: "rn505-p.jpg" },
  { id: "prod-946-A", nombre: "Anillos Exxtremo", categoria: "Anillos de acero", precio: 9989, precioMayorista: null, codigo: "rn502 - Código A", variantes: [], emoji: "💍", imagen: "rn502-a.jpg" },
  { id: "prod-946-B", nombre: "Anillos Exxtremo", categoria: "Anillos de acero", precio: 9989, precioMayorista: null, codigo: "rn502 - Código B", variantes: [], emoji: "💍", imagen: "rn502-b.jpg" },
  { id: "prod-946-B2", nombre: "Anillos Exxtremo", categoria: "Anillos de acero", precio: 9989, precioMayorista: null, codigo: "rn502 - Código B2", variantes: [], emoji: "💍", imagen: "rn502-b2.jpg" },
  { id: "prod-946-C", nombre: "Anillos Exxtremo", categoria: "Anillos de acero", precio: 9989, precioMayorista: null, codigo: "rn502 - Código C", variantes: [], emoji: "💍", imagen: "rn502-c.jpg" },
  { id: "prod-946-D", nombre: "Anillos Exxtremo", categoria: "Anillos de acero", precio: 9989, precioMayorista: null, codigo: "rn502 - Código D", variantes: [], emoji: "💍", imagen: "rn502-d.jpg" },
  { id: "prod-946-F", nombre: "Anillos Exxtremo", categoria: "Anillos de acero", precio: 9989, precioMayorista: null, codigo: "rn502 - Código F", variantes: [], emoji: "💍", imagen: "rn502-f.jpg" },
  { id: "prod-946-G", nombre: "Anillos Exxtremo", categoria: "Anillos de acero", precio: 9989, precioMayorista: null, codigo: "rn502 - Código G", variantes: [], emoji: "💍", imagen: "rn502-g.jpg" },
  { id: "prod-946-H", nombre: "Anillos Exxtremo", categoria: "Anillos de acero", precio: 9989, precioMayorista: null, codigo: "rn502 - Código H", variantes: [], emoji: "💍", imagen: "rn502-h.jpg" },
  { id: "prod-946-I", nombre: "Anillos Exxtremo", categoria: "Anillos de acero", precio: 9989, precioMayorista: null, codigo: "rn502 - Código I", variantes: [], emoji: "💍", imagen: "rn502-i.jpg" },
  { id: "prod-701", nombre: "Remera transparente", categoria: "Remeras Mujer", precio: 14899, precioMayorista: null, codigo: "rn701", variantes: [], emoji: "👕", imagen: "rn701.jpg" },
  { id: "prod-702", nombre: "Remera transparente", categoria: "Remeras Mujer", precio: 14899, precioMayorista: null, codigo: "rn702", variantes: [], emoji: "👕", imagen: "rn702.jpg" },
  { id: "prod-703", nombre: "Remera transparente", categoria: "Remeras Mujer", precio: 24987, precioMayorista: null, codigo: "rn703", variantes: [], emoji: "👕", imagen: "rn703.jpg" },
  { id: "prod-704", nombre: "Remera transparente", categoria: "Remeras Mujer", precio: 14899, precioMayorista: null, codigo: "rn704", variantes: [], emoji: "👕", imagen: "rn704.jpg" },
  { id: "prod-705", nombre: "Remera transparente", categoria: "Remeras Mujer", precio: 14899, precioMayorista: null, codigo: "rn705", variantes: [], emoji: "👕", imagen: "rn705.jpg" },
  { id: "prod-706", nombre: "Remera transparente", categoria: "Remeras Mujer", precio: 14899, precioMayorista: null, codigo: "rn706", variantes: [], emoji: "👕", imagen: "rn706.jpg" },
  { id: "prod-707", nombre: "Remera imagen ", categoria: "Remeras Corte Clásico Unisex", precio: 17000, precioMayorista: null, codigo: "rn707", variantes: [], emoji: "👕", imagen: "rn707.png" },
  { id: "prod-708", nombre: "Remera imagen ", categoria: "Remeras Corte Clásico Unisex", precio: 17000, precioMayorista: null, codigo: "rn708", variantes: [], emoji: "👕", imagen: "rn708.png" },
  { id: "prod-709", nombre: "Top banda ", categoria: "Remeras Mujer", precio: 24987, precioMayorista: null, codigo: "rn709", variantes: [], emoji: "👕", imagen: "rn709.png" },
  { id: "prod-remera-personalizada", nombre: "Remera personalizada", categoria: "Remera personalizada", precio: null , precioMayorista: null, codigo: "RN-PP", variantes: [], emoji: "👕", imagen: "remeraper.png", precioTexto: "Precio por medidas: S-XL 15.000, XXL 18.000", infoExtra: "El diseño se acuerda por WhatsApp.", esDestacada: true },
];

/* =====================================================================
   TUTORIAL: CÓMO AGREGAR LAS FOTOS DE LOS PRODUCTOS
   =====================================================================

   4) NOMBRE DE LAS FOTOS: para los productos con variantes (A, B,
     // C...), el nombre de cada foto es el CÓDIGO del producto en
      //minúscula, seguido de un guion y la letra de esa variante, en
    //  minúscula. Por ejemplo, para el "Anillo Liso Acero" (código
   //   rn505) con variantes A, B, C...:

    //    rn505-a.jpg   (variante A)
   //     rn505-b.jpg   (variante B)
   //     rn505-c.jpg   (variante C)
   //     ... y así con cada letra que tenga ese producto.

  // 5) CASO ESPECIAL - "Pulseras CierreMagnetico": este es el único
   ///   producto que se mantiene como UNA sola tarjeta con un
  //    desplegable para elegir el modelo (A a J), en vez de separarse
  //    en tarjetas individuales. Por eso tiene un campo extra,
  //    "imagenesPorVariante", con la foto de cada modelo. Cuando el
  //    cliente cambia de modelo en el desplegable, la foto de la
 //     tarjeta cambia sola. Para cargar esas fotos, mismo criterio:
 //     nombralas rn609-a.jpg, rn609-b.jpg, etc. y subilas a
  //    imagenes R.N/ACCESORIOS MODA/CUERO/.

 //  ⚠️ PENDIENTE - "Anillos Exxtremo": este producto quedó con
 //  "imagen: null" en todas sus variantes a propósito. Su código en el
 //  Excel (rn502) es el mismo que usan otros dos productos ya
 //  existentes en el catálogo (Anillo Varios aleacion y Anillo Sello
 //  gigante acero). Para poder ponerle fotos sin que se mezclen con las
 //  de esos otros productos, primero hay que asignarle un código
 //  distinto a "Anillos Exxtremo". Avisame cuando tengas el código
 //  nuevo y lo actualizo. Tampoco tiene precio cargado todavía (el
 //  Excel lo trajo vacío), por eso en el sitio muestra "Consultar
 //  precio" en lugar de un valor.

 //  Podés ir subiendo fotos de a poco: los productos que queden con
 //  "imagen: null" van a seguir mostrando el emoji de respaldo, así
 //  que no se rompe nada mientras completás el catálogo.

 //  RECOMENDACIONES PARA LAS FOTOS:
 //  - Formato: .jpg o .webp (más liviano que .png para fotos)
 //  - Tamaño recomendado: 800x800px (cuadradas, se recortan solas)
 //  - Peso: idealmente menos de 200kb por imagen (usá
 //    https://squoosh.app para comprimirlas gratis sin perder calidad)
 //   - Fondo parecido/consistente entre fotos para que el catálogo se
 //    vea prolijo
*/