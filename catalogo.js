/* =====================================================================
   ROCKEAME NENA ACCESORIOS - catalogo.js
   =====================================================================
   Página de catálogo por rubro (catalogo.html).
   Lee el rubro del query string (?rubro=moda|indumentaria), muestra los
   catálogos de ese rubro uno al lado del otro. Al clickear un catálogo,
   despliega sus productos en la misma página y muestra en cuál estás.
   Mantiene el carrito/compras igual que en la página principal.
   ===================================================================== */

const rubroInfo = {
  moda: {
    titulo: "Accesorios Moda",
    cat: [
      { nombre: "Colgantes y cadenas de acero", img: "colgantesLOGO.jpeg" },
      { nombre: "Anillos de acero",             img: "anillosLOGO.jpeg" },
      { nombre: "Aros de acero",                img: "arosLOGO.jpeg" },
      { nombre: "Cuero",                        img: "cueroLOGO.jpeg" },
      { nombre: "Pulseras",                     img: "pulserasLOGO.jpeg" },
    ],
  },
  indumentaria: {
    titulo: "Indumentaria",
    cat: [
      { nombre: "Remera personalizada",                img: "remera-personalizada.jpeg" },
      { nombre: "Remeras Mujer",                       img: "remeras-mujer.jpeg" },
      { nombre: "Remeras Corte Clásico Unisex",        img: "remeras-unisex.jpeg" },
    ],
  },
};

/* ---------- Parámetros de la URL ---------- */
const params = new URLSearchParams(window.location.search);
let rubroActual = params.get("rubro");
let categoriaInicial = (params.get("categoria") || "").trim();

// Compatibilidad: si venimos con ?categoria=, inferimos el rubro
if (!rubroActual && categoriaInicial) {
  rubroActual = ["Remera personalizada","Remeras Mujer","Remeras Corte Clásico Unisex"].includes(categoriaInicial)
    ? "indumentaria"
    : "moda";
}
if (rubroActual !== "indumentaria") rubroActual = "moda";

/* ---------- Referencias ---------- */
const listaCatEl      = document.getElementById("catalogo-cat-list");
const tituloEl        = document.getElementById("catalogo-titulo");
const rubroEl         = document.getElementById("catalogo-rubro");
const prodGrid        = document.getElementById("prod-grid");
const cargarMasBtn    = document.getElementById("cargar-mas-btn");
const cargarMasBox    = document.getElementById("catalogo-cargar-box");
const buscarBox       = document.getElementById("catalogo-buscador-box");
const buscadorInput   = document.getElementById("catalogo-buscador");
const resultadoLabel  = document.getElementById("catalogo-resultado");
const actualBox       = document.getElementById("catalogo-actual");
const actualNombre    = document.getElementById("catalogo-actual-nombre");

const LOTE = 24;
let cantidadVisible = LOTE;
let categoriaSeleccionada = null;
let busquedaCatalogo = "";

function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/* ---------- Encabezado según el rubro ---------- */
const infoRubro = rubroInfo[rubroActual];
if (tituloEl) tituloEl.textContent = infoRubro.titulo;
if (rubroEl) rubroEl.textContent = "Catálogo";

/* ---------- Render de los catálogos (uno al lado del otro) ---------- */
function renderCatalogoList() {
  listaCatEl.innerHTML = "";
  infoRubro.cat.forEach((c) => {
    const card = document.createElement("div");
    card.className = "cat-card";
    card.dataset.categoria = c.nombre;
    card.innerHTML = `<img class="ico" src="Otras%20imgs/${encodeURIComponent(c.img)}" alt="${c.nombre}" loading="lazy">`;
    listaCatEl.appendChild(card);
  });
}

/* ---------- Mostrar los productos del catálogo elegido ---------- */
function renderProductos() {
  let lista = categoriaSeleccionada
    ? PRODUCTOS.filter((p) => p.categoria === categoriaSeleccionada)
    : [];

  if (busquedaCatalogo.trim() !== "") {
    const q = normalizar(busquedaCatalogo);
    lista = lista.filter((p) => normalizar(p.nombre).includes(q));
  }

  const productosAMostrar = lista.slice(0, cantidadVisible);

  prodGrid.innerHTML = "";

  if (lista.length === 0) {
    prodGrid.innerHTML = '<p class="sin-resultados">No encontramos productos con ese criterio.</p>';
    resultadoLabel.textContent = "";
    cargarMasBox.classList.remove("visible");
    return;
  }

  productosAMostrar.forEach((producto) => {
    const card = document.createElement("div");
    const esDestacada = Boolean(producto.esDestacada);
    card.className = esDestacada ? "prod-card prod-card-feature" : "prod-card";

    const tieneVariantes = Array.isArray(producto.variantes) && producto.variantes.length > 0;
    const varianteInicial = tieneVariantes ? producto.variantes[0] : null;
    const archivoInicial = imagenDebeQuedarFija(producto) ? producto.imagen : archivoImagenPara(producto, varianteInicial);

    let imgHtml = "";
    if (archivoInicial) {
      const ruta = rutaImagen(producto, archivoInicial);
      imgHtml = `<img class="prod-img-foto" src="${encodeURI(ruta)}" alt="${producto.nombre}" loading="lazy"
           onerror="this.remove()">`;
    }

    const varianteHtml = tieneVariantes
      ? `<select class="prod-variante" data-id="${producto.id}">
           <option value="" disabled selected>Elegí el modelo...</option>
           ${producto.variantes.map((v) => `<option value="${v}">Modelo: ${v}</option>`).join("")}
         </select>`
      : "";

    const mayoristaHtml = producto.precioMayorista
      ? `<span class="prod-precio-mayorista">(Mayorista: $${producto.precioMayorista.toLocaleString("es-AR")})</span>`
      : "";

    const precioHtml = producto.precioTexto
      ? `<span class="prod-precio">${producto.precioTexto}</span>`
      : `<span class="prod-precio">${producto.precio > 0 ? "$" + producto.precio.toLocaleString("es-AR") : "Consultar precio"}</span>`;

    const infoExtraHtml = producto.infoExtra
      ? `<p class="prod-info-extra">${producto.infoExtra}</p>`
      : "";

    const categoriaHtml = esDestacada
      ? ""
      : `<span class="prod-tag">${producto.categoria}</span>`;

    const accionHtml = esDestacada
      ? `<button class="prod-whatsapp" type="button" data-id="${producto.id}">Consultar por WhatsApp</button>`
      : `<button class="prod-add" data-id="${producto.id}">+</button>`;

    card.innerHTML = `
      <div class="prod-img" data-id="${producto.id}">${producto.emoji}${imgHtml}</div>
      <div class="prod-body">
        ${categoriaHtml}
        <h4>${producto.nombre}</h4>
        ${varianteHtml}
        <div class="prod-foot">
          ${precioHtml}
          ${accionHtml}
        </div>
        ${mayoristaHtml}
        ${infoExtraHtml}
        <span class="prod-codigo">Cód: ${producto.codigo || "-"}</span>
      </div>
    `;

    prodGrid.appendChild(card);
  });

  resultadoLabel.textContent = `Mostrando ${productosAMostrar.length} de ${lista.length} productos`;

  cargarMasBox.classList.toggle("visible", cantidadVisible < lista.length);
}

/* ---------- Desplegar un catálogo ---------- */
function abrirCatalogo(categoria, scroll) {
  categoriaSeleccionada = categoria;
  busquedaCatalogo = "";
  if (buscadorInput) buscadorInput.value = "";
  cantidadVisible = LOTE;

  // Marca activo solo el catálogo elegido
  listaCatEl.querySelectorAll(".cat-card").forEach((c) => {
    c.classList.toggle("activo", c.dataset.categoria === categoria);
  });

  // Muestra "Estás en: [catálogo]"
  if (actualNombre) actualNombre.textContent = categoria;
  if (actualBox) actualBox.classList.add("visible");
  if (buscarBox) buscarBox.classList.add("visible");

  renderProductos();

  if (scroll) {
    const dest = document.getElementById("catalogo-productos");
    if (dest) dest.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ---------- Click en un catálogo: despliega productos en la misma página ---------- */
listaCatEl.addEventListener("click", (e) => {
  const card = e.target.closest(".cat-card");
  if (!card) return;
  abrirCatalogo(card.dataset.categoria, true);
});

/* ---------- Buscador dentro del catálogo elegido ---------- */
let buscadorTimeout;
if (buscadorInput) {
  buscadorInput.addEventListener("input", (e) => {
    clearTimeout(buscadorTimeout);
    buscadorTimeout = setTimeout(() => {
      busquedaCatalogo = e.target.value;
      cantidadVisible = LOTE;
      renderProductos();
    }, 250);
  });
}

cargarMasBtn.addEventListener("click", () => {
  cantidadVisible += LOTE;
  renderProductos();
});

/* ---------- Inicio ---------- */
renderCatalogoList();

// Si venimos con ?categoria=... (o ?rubro=...&categoria=...), abrimos ese catálogo
if (categoriaInicial && categoriaInicial !== "null") {
  abrirCatalogo(categoriaInicial, true);
}

/* =====================================================================
   CARRITO (igual que en la página principal)
   ===================================================================== */

let carrito = [];

const cartToggle      = document.getElementById("cart-toggle");
const cartDrawer       = document.getElementById("cart-drawer");
const cartOverlay      = document.getElementById("cart-overlay");
const cartClose        = document.getElementById("cart-close");
const cartItemsBox     = document.getElementById("cart-items");
const cartCountBadge   = document.getElementById("cart-count");
const cartTotalLabel   = document.getElementById("cart-total");
const cartCheckoutBtn  = document.getElementById("cart-checkout-btn");

function agregarAlCarrito(id, variante) {
  const producto = PRODUCTOS.find((p) => p.id === id);
  if (!producto) return;

  const key = variante ? `${id}|${variante}` : id;
  const itemExistente = carrito.find((item) => item.key === key);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({
      key,
      id: producto.id,
      nombre: producto.nombre,
      variante: variante || null,
      precio: producto.precio,
      cantidad: 1,
    });
  }

  renderCarrito();
  abrirCarrito();
}

function cambiarCantidad(key, delta) {
  const item = carrito.find((i) => i.key === key);
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    carrito = carrito.filter((i) => i.key !== key);
  }

  renderCarrito();
}

function quitarDelCarrito(key) {
  carrito = carrito.filter((i) => i.key !== key);
  renderCarrito();
}

function calcularTotal() {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function renderCarrito() {
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  cartCountBadge.textContent = totalItems;

  cartCountBadge.classList.remove("bump");
  void cartCountBadge.offsetWidth;
  cartCountBadge.classList.add("bump");

  if (carrito.length === 0) {
    cartItemsBox.innerHTML = '<p class="cart-empty">Todavía no agregaste productos.</p>';
    cartCheckoutBtn.disabled = true;
  } else {
    cartItemsBox.innerHTML = carrito
      .map((item) => {
        const producto = PRODUCTOS.find((p) => p.id === item.id);
        const emoji = producto ? producto.emoji : "🛍️";
        const nombreMostrado = item.variante
          ? `${item.nombre} (${item.variante})`
          : item.nombre;
        return `
          <div class="cart-item">
            <div class="cart-item-img">${emoji}</div>
            <div class="cart-item-info">
              <h5>${nombreMostrado}</h5>
              <span class="cart-item-price">$${item.precio.toLocaleString("es-AR")}</span>
            </div>
            <div class="cart-item-qty">
              <button data-action="menos" data-key="${item.key}">-</button>
              <span>${item.cantidad}</span>
              <button data-action="mas" data-key="${item.key}">+</button>
            </div>
            <button class="cart-item-remove" data-action="quitar" data-key="${item.key}">✕</button>
          </div>
        `;
      })
      .join("");
    cartCheckoutBtn.disabled = false;
  }

  cartTotalLabel.textContent = "$" + calcularTotal().toLocaleString("es-AR");
}

let modalScrollLockCount = 0;
function setBodyScrollLock(isLocked) {
  if (isLocked) {
    modalScrollLockCount += 1;
  } else if (modalScrollLockCount > 0) {
    modalScrollLockCount -= 1;
  }
  document.body.classList.toggle("modal-open", modalScrollLockCount > 0);
}

function abrirCarrito() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
  setBodyScrollLock(true);
}

function cerrarCarrito() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
  setBodyScrollLock(false);
}

// Ruta de imágenes
function rutaImagen(producto, archivo) {
  const carpeta = CARPETA_POR_CATEGORIA[producto.categoria] || "";
  return `${CARPETA_IMAGENES}/${carpeta}/${archivo}`;
}

function archivoImagenPara(producto, variante) {
  if (producto.imagenesPorVariante && variante && producto.imagenesPorVariante[variante]) {
    return producto.imagenesPorVariante[variante];
  }
  return producto.imagen;
}

function imagenDebeQuedarFija(producto) {
  return [
    "prod-403-r","prod-403-g","prod-403-c","prod-403-f","prod-403-b2",
    "prod-403-c2","prod-403-e","prod-403-c3","prod-403-c4","prod-403-p1",
    "prod-401-mb","prod-401-za1","prod-407-fc","prod-407-b","prod-407-a",
    "prod-411-ab"
  ].includes(producto.id);
}

prodGrid.addEventListener("change", (e) => {
  const select = e.target.closest(".prod-variante");
  if (!select) return;

  const producto = PRODUCTOS.find((p) => p.id === select.dataset.id);
  if (!producto || imagenDebeQuedarFija(producto)) return;
  if (!producto.imagenesPorVariante) return;

  const card = select.closest(".prod-card");
  const fotoBox = card.querySelector(".prod-img");
  const archivo = archivoImagenPara(producto, select.value);

  if (!archivo) return;

  const ruta = rutaImagen(producto, archivo);
  let img = fotoBox.querySelector(".prod-img-foto");

  if (!img) {
    img = document.createElement("img");
    img.className = "prod-img-foto";
    img.loading = "lazy";
    img.onerror = () => img.remove();
    fotoBox.appendChild(img);
  }

  img.alt = producto.nombre;
  img.src = encodeURI(ruta);
});

prodGrid.addEventListener("click", (e) => {
  const whatsappBtn = e.target.closest(".prod-whatsapp");
  if (whatsappBtn) {
    const producto = PRODUCTOS.find((p) => p.id === whatsappBtn.dataset.id);
    if (!producto) return;
    const mensaje = encodeURIComponent(`Hola! Quiero consultar por la ${producto.nombre}. Me interesa el diseño personalizado.`);
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`, "_blank");
    return;
  }

  const boton = e.target.closest(".prod-add");
  if (!boton) return;

  const id = boton.dataset.id;
  const card = boton.closest(".prod-card");
  const selectVariante = card.querySelector(".prod-variante");

  if (selectVariante && !selectVariante.value) {
    selectVariante.classList.add("atencion");
    setTimeout(() => selectVariante.classList.remove("atencion"), 1200);
    return;
  }

  agregarAlCarrito(id, selectVariante ? selectVariante.value : null);
});

prodGrid.addEventListener("click", (e) => {
  const boton = e.target.closest(".prod-add");
  const whatsappBtn = e.target.closest(".prod-whatsapp");
  if (boton || whatsappBtn) return;

  const fotoBox = e.target.closest(".prod-img");
  if (!fotoBox) return;

  const card = fotoBox.closest(".prod-card");
  const selectVariante = card.querySelector(".prod-variante");
  const variante = selectVariante ? selectVariante.value : null;

  abrirLightbox(fotoBox.dataset.id, variante);
});

cartItemsBox.addEventListener("click", (e) => {
  const boton = e.target.closest("button[data-action]");
  if (!boton) return;

  const { action, key } = boton.dataset;

  if (action === "mas") cambiarCantidad(key, 1);
  if (action === "menos") cambiarCantidad(key, -1);
  if (action === "quitar") quitarDelCarrito(key);
});

cartToggle.addEventListener("click", abrirCarrito);
cartClose.addEventListener("click", cerrarCarrito);
cartOverlay.addEventListener("click", cerrarCarrito);

/* ---------- Lightbox ---------- */
const lightboxOverlay = document.getElementById("lightbox-overlay");
const lightboxModal    = document.getElementById("lightbox-modal");
const lightboxClose    = document.getElementById("lightbox-close");
const lightboxContent  = document.getElementById("lightbox-content");
const lightboxNombre   = document.getElementById("lightbox-nombre");

function abrirLightbox(id, variante) {
  const producto = PRODUCTOS.find((p) => p.id === id);
  if (!producto) return;

  setBodyScrollLock(true);
  const archivo = imagenDebeQuedarFija(producto) ? producto.imagen : archivoImagenPara(producto, variante);

  if (archivo) {
    const ruta = rutaImagen(producto, archivo);
    lightboxContent.innerHTML = `<img src="${encodeURI(ruta)}" alt="${producto.nombre}">`;
  } else {
    lightboxContent.innerHTML = `<span class="lightbox-emoji">${producto.emoji}</span>`;
  }

  lightboxNombre.textContent = variante ? `${producto.nombre} (${variante})` : producto.nombre;
  lightboxModal.classList.add("active");
  lightboxOverlay.classList.add("active");
}

function cerrarLightbox() {
  lightboxModal.classList.remove("active");
  lightboxOverlay.classList.remove("active");
  setBodyScrollLock(false);
}

lightboxClose.addEventListener("click", cerrarLightbox);
lightboxOverlay.addEventListener("click", cerrarLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarLightbox();
});

/* ---------- Checkout ---------- */
const WHATSAPP_NUMERO = "5493512301915";

const checkoutOverlay = document.getElementById("checkout-overlay");
const checkoutModal   = document.getElementById("checkout-modal");
const checkoutClose   = document.getElementById("checkout-close");
const checkoutForm    = document.getElementById("checkout-form");

function abrirCheckout() {
  if (carrito.length === 0) return;
  cerrarCarrito();
  checkoutModal.classList.add("active");
  checkoutOverlay.classList.add("active");
  setBodyScrollLock(true);
}

function cerrarCheckout() {
  checkoutModal.classList.remove("active");
  checkoutOverlay.classList.remove("active");
  setBodyScrollLock(false);
}

cartCheckoutBtn.addEventListener("click", abrirCheckout);
checkoutClose.addEventListener("click", cerrarCheckout);
checkoutOverlay.addEventListener("click", cerrarCheckout);

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre    = document.getElementById("co-nombre").value.trim();
  const telefono  = document.getElementById("co-telefono").value.trim();
  const pago      = document.getElementById("co-pago").value;
  const entrega   = document.getElementById("co-entrega").value;
  const direccion = document.getElementById("co-direccion").value.trim();
  const notas     = document.getElementById("co-notas").value.trim();

  const detalleProductos = carrito
    .map((item) => {
      const nombreMostrado = item.variante ? `${item.nombre} (${item.variante})` : item.nombre;
      return `- ${nombreMostrado} x${item.cantidad} ($${(item.precio * item.cantidad).toLocaleString("es-AR")})`;
    })
    .join("%0A");

  const total = calcularTotal().toLocaleString("es-AR");

  let mensaje = `¡Hola! Quiero hacer este pedido:%0A%0A`;
  mensaje += `*Productos:*%0A${detalleProductos}%0A%0A`;
  mensaje += `*Total: $${total}*%0A%0A`;
  mensaje += `*Nombre:* ${nombre}%0A`;
  mensaje += `*Teléfono:* ${telefono}%0A`;
  mensaje += `*Método de pago:* ${pago}%0A`;
  mensaje += `*Entrega:* ${entrega}%0A`;
  if (direccion) mensaje += `*Dirección:* ${direccion}%0A`;
  if (notas) mensaje += `*Notas:* ${notas}%0A`;

  const urlWhatsapp = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;

  window.open(urlWhatsapp, "_blank");

  carrito = [];
  renderCarrito();
  cerrarCheckout();
  checkoutForm.reset();
});

renderCarrito();
