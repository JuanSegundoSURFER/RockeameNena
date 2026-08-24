/* =====================================================================
   ROCKEAME NENA ACCESORIOS - script.js
   =====================================================================
   El catálogo de productos vive en productos.js (array PRODUCTOS).
   Este archivo se encarga de:
   1) RENDER -> dibuja las tarjetas, con búsqueda, filtro por categoría,
                paginación ("Ver más productos") y variantes
   2) CARRITO -> agregar, sacar, cambiar cantidad, calcular total
   3) CHECKOUT DEL CARRITO -> formulario de datos + link de WhatsApp
   4) POPUP DE CONTACTO -> botón "Escribinos por WhatsApp" (sin carrito)
   ===================================================================== */


/* =====================================================================
   1) RENDER DEL CATÁLOGO
   ===================================================================== */

const prodGrid        = document.getElementById("prod-grid");
const filtroActivo     = document.getElementById("filtro-activo");
const filtroTexto      = document.getElementById("filtro-texto");
const filtroNombre     = document.getElementById("filtro-nombre");
const filtroQuitarBtn  = document.getElementById("filtro-quitar");
const catGrid          = document.querySelector(".cat-grid");
const buscadorInput    = document.getElementById("buscador-input");
const resultadoCount   = document.getElementById("resultado-count");
const cargarMasBtn     = document.getElementById("cargar-mas-btn");
const cargarMasBox     = document.querySelector(".cargar-mas-box");
const rubroDetalle     = document.querySelector(".rubro-detalle");
const rubroDetalleKicker = rubroDetalle ? rubroDetalle.querySelector(".kicker") : null;
const rubroDetalleTitulo = rubroDetalle ? rubroDetalle.querySelector("h3") : null;
const catCards         = document.querySelectorAll(".cat-card");

let categoriaActual = null;  // null = todas las categorías
let busquedaActual  = "";    // texto del buscador
const LOTE = 24;             // cuántos productos se muestran por tanda
let cantidadVisible = LOTE;

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // saca tildes para que "muñeca" y "muneca" matcheen
}

function mostrarCategoriasPorRubro(rubro) {
  const grupo = rubro === "indumentaria" ? "indumentaria" : "moda";

  catCards.forEach((card) => {
    const cardGrupo = card.dataset.rubroGrupo || "moda";
    if (cardGrupo === grupo) {
      card.classList.remove("oculto");
    } else {
      card.classList.add("oculto");
    }
  });

  if (rubroDetalleKicker) {
    rubroDetalleKicker.textContent = rubro === "indumentaria" ? "Indumentaria" : "Accesorios Moda";
  }

  if (rubroDetalleTitulo) {
    rubroDetalleTitulo.textContent = rubro === "indumentaria"
      ? "Catálogo de Indumentaria"
      : "Catálogo de Accesorios Moda";
  }

  document.querySelectorAll(".rubro-card").forEach((rubroCard) => {
    rubroCard.classList.toggle("rubro-activo", rubroCard.dataset.rubro === rubro);
  });
}

mostrarCategoriasPorRubro("moda");

function productosFiltrados() {
  let lista = PRODUCTOS;

  if (categoriaActual) {
    lista = lista.filter((p) => p.categoria === categoriaActual);
  }

  if (busquedaActual.trim() !== "") {
    const q = normalizar(busquedaActual);
    lista = lista.filter((p) => normalizar(p.nombre).includes(q));
  }

  return lista;
}

// Arma la ruta completa de una imagen según la categoría del producto
function rutaImagen(producto, archivo) {
  const carpeta = CARPETA_POR_CATEGORIA[producto.categoria] || "";
  return `${CARPETA_IMAGENES}/${carpeta}/${archivo}`;
}

// Devuelve el archivo de imagen que corresponde mostrar, según la
// variante elegida. Si el producto tiene una foto distinta por cada
// variante (imagenesPorVariante), usa esa; si no, usa la foto general.
function archivoImagenPara(producto, variante) {
  if (producto.imagenesPorVariante && variante && producto.imagenesPorVariante[variante]) {
    return producto.imagenesPorVariante[variante];
  }
  return producto.imagen;
}

function imagenDebeQuedarFija(producto) {
  return [
    "prod-403-r",
    "prod-403-g",
    "prod-403-c",
    "prod-403-f",
    "prod-403-b2",
    "prod-403-c2",
    "prod-403-e",
    "prod-403-c3",
    "prod-403-c4",
    "prod-403-p1",
    "prod-401-mb",
    "prod-401-za1",
    "prod-407-fc",
    "prod-407-b",
    "prod-407-a",
    "prod-411-ab"
  ].includes(producto.id);
}

function renderProductos() {
  const todosFiltrados = productosFiltrados();
  const productosAMostrar = todosFiltrados.slice(0, cantidadVisible);

  prodGrid.innerHTML = "";

  if (todosFiltrados.length === 0) {
    prodGrid.innerHTML = '<p class="sin-resultados">No encontramos productos con ese criterio.</p>';
    resultadoCount.textContent = "";
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

  resultadoCount.textContent = `Mostrando ${productosAMostrar.length} de ${todosFiltrados.length} productos`;

  if (cantidadVisible < todosFiltrados.length) {
    cargarMasBox.classList.remove("oculto");
  } else {
    cargarMasBox.classList.add("oculto");
  }
}

function filtrarPorCategoria(categoria) {
  categoriaActual = categoria;
  cantidadVisible = LOTE;
  filtroTexto.innerHTML = `Categoría: <strong id="filtro-nombre">${categoria}</strong>`;
  filtroActivo.style.display = "flex";
  renderProductos();
  document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
}

function quitarFiltro() {
  categoriaActual = null;
  busquedaActual = "";
  buscadorInput.value = "";
  cantidadVisible = LOTE;
  filtroActivo.style.display = "none";
  renderProductos();
}

// Click en una tarjeta de categoría -> filtra los productos
catGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".cat-card");
  if (!card) return;
  filtrarPorCategoria(card.dataset.categoria);
});

// Click en cualquiera de los rubros -> baja suave hasta sus categorías
// para ver cómo se ve la sección al interactuar con el catálogo.
document.querySelectorAll(".rubro-card").forEach((rubro) => {
  rubro.addEventListener("click", () => {
    const grupo = rubro.dataset.rubro;
    if (grupo === "moda" || grupo === "indumentaria") {
      mostrarCategoriasPorRubro(grupo);
    }

    if (rubroDetalle) {
      rubroDetalle.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

filtroQuitarBtn.addEventListener("click", quitarFiltro);

// Links de categoría en el footer -> mismo filtro que las tarjetas de arriba
document.querySelectorAll(".footer-cat-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    filtrarPorCategoria(link.dataset.categoria);
  });
});

// Buscador (con un pequeño debounce para no re-renderizar en cada tecla)
let buscadorTimeout;
buscadorInput.addEventListener("input", (e) => {
  clearTimeout(buscadorTimeout);
  buscadorTimeout = setTimeout(() => {
    busquedaActual = e.target.value;
    cantidadVisible = LOTE;

    if (busquedaActual.trim() !== "") {
      filtroTexto.innerHTML = `Resultados para: <strong>"${busquedaActual}"</strong>`;
      filtroActivo.style.display = "flex";
    } else if (!categoriaActual) {
      filtroActivo.style.display = "none";
    }

    renderProductos();
  }, 250);
});

// Botón "Ver más productos"
cargarMasBtn.addEventListener("click", () => {
  cantidadVisible += LOTE;
  renderProductos();
});


/* =====================================================================
   2) CARRITO
   =====================================================================
   Cada línea del carrito se identifica con "id|variante" para que un
   mismo producto con distintas variantes se sume como ítems separados.
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

  // Pequeño "bump" visual para que se note que se agregó algo
  cartCountBadge.classList.remove("bump");
  // Forzar reflow para poder repetir la animación aunque sea consecutiva
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

function toggleBodyScroll(disable) {
  document.body.classList.toggle("modal-open", disable);
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

// Cuando cambia la variante elegida en el desplegable, actualiza la
// foto de la tarjeta (si ese producto tiene una imagen distinta por
// variante, definida en imagenesPorVariante dentro de productos.js)
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

// Click en "+" de cada producto del catálogo
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

  // Si el producto tiene modelos y todavía no eligió, no agrega nada
  if (selectVariante && !selectVariante.value) {
    selectVariante.classList.add("atencion");
    setTimeout(() => selectVariante.classList.remove("atencion"), 1200);
    return;
  }

  agregarAlCarrito(id, selectVariante ? selectVariante.value : null);
});

// Click en la FOTO de cada producto -> abre la imagen ampliada (lightbox)
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

// Clicks dentro del carrito (sumar, restar, quitar)
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


/* =====================================================================
   2.5) LIGHTBOX: imagen del producto ampliada
   ===================================================================== */

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
    // Todavía no tiene foto cargada: se muestra el emoji bien grande
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


/* =====================================================================
   3) CHECKOUT DEL CARRITO: formulario de datos + WhatsApp
   ===================================================================== */

// ⚠️ Reemplazá este número por el WhatsApp real del negocio.
// Formato: código de país + código de área + número, sin espacios ni signos.
// Ejemplo Argentina: 549 + 11 + 32283924  ->  "5491132283924"
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


/* =====================================================================
   4) POPUP DE CONTACTO POR WHATSAPP (reemplaza al formulario)
   =====================================================================
   ⚠️ Reemplazá estos dos números por los reales del negocio.
   ===================================================================== */

const WHATSAPP_EZE = "5493512301915";
const WHATSAPP_YAMI = "5493515214198";
const MENSAJE_WHATSAPP_DEFAULT = "Hola! Quiero hacer una consulta sobre sus productos.";

const whatsappOverlay = document.getElementById("whatsapp-overlay");
const whatsappModal   = document.getElementById("whatsapp-modal");
const whatsappClose   = document.getElementById("whatsapp-close");
const whatsappOpenBtn = document.getElementById("whatsapp-open-btn");
const linkEze    = document.getElementById("whatsapp-link-eze");
const linkYami    = document.getElementById("whatsapp-link-yami");

function armarLinkWhatsapp(numero) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(MENSAJE_WHATSAPP_DEFAULT)}`;
}

function abrirPopupWhatsapp() {
  linkEze.href = armarLinkWhatsapp(WHATSAPP_EZE);
  linkYami.href = armarLinkWhatsapp(WHATSAPP_YAMI);
  whatsappModal.classList.add("active");
  whatsappOverlay.classList.add("active");
  setBodyScrollLock(true);
}

function cerrarPopupWhatsapp() {
  whatsappModal.classList.remove("active");
  whatsappOverlay.classList.remove("active");
  setBodyScrollLock(false);
}

whatsappOpenBtn.addEventListener("click", abrirPopupWhatsapp);
whatsappClose.addEventListener("click", cerrarPopupWhatsapp);
whatsappOverlay.addEventListener("click", cerrarPopupWhatsapp);


/* =====================================================================
   5) SUMATE A LAS PROMOS: registro de email para marketing
   =====================================================================
   Esto NO es un login con contraseña ni un sistema de cuentas seguro
   (para eso hace falta una base de datos y mucho más desarrollo).
   Es un capturador de emails para mandar promociones: cuando alguien
   se registra, sus datos se guardan en un archivo CSV en el hosting
   (carpeta api/data/suscriptores.csv) a través de un script PHP.

   Por seguridad y privacidad, este formulario:
   - NO tiene una pestaña de "verificar si mi email ya está registrado"
     (eso permitía que cualquiera confirme si un email específico está
     en la base, y de quién es el nombre asociado).
   - Pide aceptar la Política de Privacidad antes de registrar.
   - La casilla de "quiero recibir promos" arranca DESMARCADA: el
     usuario tiene que elegir activamente si quiere sumarse.

   ⚠️ Esto SOLO funciona una vez que subas la carpeta "api" completa a
   un hosting con PHP (como Hostinger). Si abrís index.html haciendo
   doble click en tu computadora, el formulario no va a poder guardar
   nada (no hay PHP corriendo ahí). Ver README-REGISTRO-PROMOS.md.
   ===================================================================== */

const RUTA_API_REGISTRO = "api/registro.php";

let modalScrollLockCount = 0;

function setBodyScrollLock(isLocked) {
  if (isLocked) {
    modalScrollLockCount += 1;
  } else if (modalScrollLockCount > 0) {
    modalScrollLockCount -= 1;
  }

  document.body.classList.toggle("modal-open", modalScrollLockCount > 0);
}

const accountToggle  = document.getElementById("account-toggle");
const accountOverlay = document.getElementById("account-overlay");
const accountModal   = document.getElementById("account-modal");
const accountClose   = document.getElementById("account-close");

function abrirCuenta() {
  accountModal.classList.add("active");
  accountOverlay.classList.add("active");
  setBodyScrollLock(true);
}

function cerrarCuenta() {
  accountModal.classList.remove("active");
  accountOverlay.classList.remove("active");
  setBodyScrollLock(false);
}

accountToggle.addEventListener("click", abrirCuenta);
accountClose.addEventListener("click", cerrarCuenta);
accountOverlay.addEventListener("click", cerrarCuenta);

// --- Formulario de registro ---
const registroForm     = document.getElementById("registro-form");
const registroMensaje  = document.getElementById("registro-mensaje");

registroForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre            = document.getElementById("reg-nombre").value.trim();
  const email              = document.getElementById("reg-email").value.trim();
  const telefono           = document.getElementById("reg-telefono").value.trim();
  const promos             = document.getElementById("reg-promos").checked;
  const aceptaPrivacidad   = document.getElementById("reg-privacidad").checked;

  if (!aceptaPrivacidad) {
    registroMensaje.textContent = "Tenés que aceptar la Política de Privacidad para registrarte.";
    registroMensaje.className = "account-mensaje error";
    return;
  }

  registroMensaje.textContent = "Enviando...";
  registroMensaje.className = "account-mensaje";

  try {
    const resp = await fetch(RUTA_API_REGISTRO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, telefono, promos, aceptaPrivacidad }),
    });

    const data = await resp.json();

    if (data.success) {
      registroMensaje.textContent = data.mensaje || "¡Listo! Te registramos correctamente.";
      registroMensaje.className = "account-mensaje ok";
      registroForm.reset();
    } else {
      registroMensaje.textContent = data.mensaje || "No pudimos completar el registro.";
      registroMensaje.className = "account-mensaje error";
    }
  } catch (error) {
    registroMensaje.textContent = "No se pudo conectar con el servidor (¿ya subiste la carpeta 'api' al hosting?).";
    registroMensaje.className = "account-mensaje error";
  }
});


/* =====================================================================
   6) ANIMACIÓN DE SCROLL: hace aparecer suavemente los bloques con
      clase "reveal" a medida que el usuario los va viendo.
   =====================================================================
   Liviano: usa IntersectionObserver nativo del navegador, sin
   librerías externas. No se activa si el usuario tiene "reducir
   movimiento" activado en su sistema (ver style.css).
   ===================================================================== */

function iniciarAnimacionesScroll() {
  const elementos = document.querySelectorAll(".reveal");
  if (!elementos.length) return;

  // Si el navegador no soporta IntersectionObserver, se muestran directo
  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementos.forEach((el) => observer.observe(el));
}


/* =====================================================================
   INICIO: dibuja el catálogo apenas carga la página
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderProductos();
  renderCarrito();
  iniciarAnimacionesScroll();
});