/* =====================================================================
   ROCKEAME NENA ACCESORIOS - catalogo.js
   =====================================================================
   Página de catálogo filtrado por categoría (catalogo.html).
   Lee la categoría del query string (?categoria=...), dibuja SOLO las
   tarjetas de esa categoría y mantiene el carrito/compras funcionando
   igual que en la página principal (index.html + script.js).
   ===================================================================== */

const prodGrid        = document.getElementById("prod-grid");
const cargarMasBtn    = document.getElementById("cargar-mas-btn");
const cargarMasBox    = document.querySelector(".cargar-mas-box");
const resultadoLabel  = document.getElementById("catalogo-resultado");
const tituloEl        = document.getElementById("catalogo-titulo");
const rubroEl         = document.getElementById("catalogo-rubro");
const descripcionEl   = document.getElementById("catalogo-descripcion");
const buscadorInput   = document.getElementById("catalogo-buscador");

const LOTE = 24;             // cuántos productos se muestran por tanda
let cantidadVisible = LOTE;
let busquedaCatalogo = "";   // texto del buscador de esta categoría

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/* ---------- Categoría desde la URL ---------- */
const params = new URLSearchParams(window.location.search);
const categoriaActual = (params.get("categoria") || "").trim();

function categoriaEsIndumentaria(cat) {
  const i = ["Remera personalizada","Remeras Mujer","Remeras Corte Clásico Unisex"];
  return i.includes(cat);
}

function descripcionCategoria(cat) {
  const rimas = {
    "Colgantes y cadenas de acero": "Colgantes y cadenas en acero con actitud.",
    "Anillos de acero": "Anillos de acero para tu estilo.",
    "Aros de acero": "Aros de acero para completar tu look.",
    "Cuero": "Brazaletes y accesorios en cuero.",
    "Pulseras": "Pulseras de acero y más.",
    "Remera personalizada": "Diseño a medida para vos."
  };
  return rimas[cat] || "Explorá los productos de esta categoría.";
}

/* ---------- Ruta de imágenes ---------- */
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

/* ---------- Render ---------- */
function renderProductos() {
  let lista = categoriaActual
    ? PRODUCTOS.filter((p) => p.categoria === categoriaActual)
    : PRODUCTOS;

  if (busquedaCatalogo.trim() !== "") {
    const q = normalizar(busquedaCatalogo);
    lista = lista.filter((p) => normalizar(p.nombre).includes(q));
  }

  const productosAMostrar = lista.slice(0, cantidadVisible);

  prodGrid.innerHTML = "";

  if (lista.length === 0) {
    prodGrid.innerHTML = '<p class="sin-resultados">No encontramos productos con ese criterio.</p>';
    resultadoLabel.textContent = "";
    cargarMasBox.classList.add("oculto");
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

  if (cantidadVisible < lista.length) {
    cargarMasBox.classList.remove("oculto");
  } else {
    cargarMasBox.classList.add("oculto");
  }
}

cargarMasBtn.addEventListener("click", () => {
  cantidadVisible += LOTE;
  renderProductos();
});

// Buscador dentro de la categoría
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

/* ---------- Encabezado según la categoría ---------- */
if (tituloEl) {
  tituloEl.textContent = categoriaActual || "Todos los productos";
}
if (rubroEl) {
  rubroEl.textContent = categoriaEsIndumentaria(categoriaActual) ? "Indumentaria" : "Accesorios Moda";
}
if (descripcionEl) {
  descripcionEl.textContent = descripcionCategoria(categoriaActual);
}

/* =====================================================================
   CARRITO (igual que en la página principal)
   ===================================================================== */

let carrito = []; // cada item: { key, id, nombre, variante, precio, cantidad }

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

renderProductos();
renderCarrito();
