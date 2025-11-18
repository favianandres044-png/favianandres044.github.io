const carritoContainer = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const elementos2 = document.getElementById('lista-2');
const lista = document.querySelector('#lista-carrito tbody'); 
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

let carritoArray = JSON.parse(localStorage.getItem('carrito')) || [];

cargarEventListeners();

function cargarEventListeners() {
 
    if (elementos1) elementos1.addEventListener('click', comprarElemento);
    if (elementos2) elementos2.addEventListener('click', comprarElemento);

    if (lista) lista.addEventListener('click', eliminarElemento);

    if (vaciarCarritoBtn) vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded', renderCarrito);

    const imgCarritoIcon = document.getElementById('img-carrito');
    if (imgCarritoIcon) {
        imgCarritoIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            carritoContainer.classList.toggle('show'); 
        });
    }
}

function comprarElemento(e) {
    
    if (e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        const elemento = e.target.closest('.ofert-1'); 
        if (elemento) {
            leerDatosElemento(elemento);
        }
    }
}

function leerDatosElemento(elemento) {
  
    const imagenEl = elemento.querySelector('img');
    const tituloEl = elemento.querySelector('h3');
    const precioEl = elemento.querySelector('.precio');
    const idEl = elemento.querySelector('a[data-id]');

    const infoElemento = {
        imagen: imagenEl ? imagenEl.src : '',
        titulo: tituloEl ? tituloEl.textContent.trim() : 'Producto',
     
        precio: precioEl ? Number(String(precioEl.textContent).replace(/[^0-9.,]/g, '').replace(',', '.')) : 0,
        id: idEl ? idEl.getAttribute('data-id') : Date.now().toString()
    };

    carritoArray.push(infoElemento);
    localStorage.setItem('carrito', JSON.stringify(carritoArray));
    renderCarrito();
}

function renderCarrito() {

    while (lista && lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    if (!lista) return;

    if (carritoArray.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="4" style="color:#fff; text-align:center; padding:12px;">Tu carrito está vacío</td>`;
        lista.appendChild(row);
        return;
    }

    carritoArray.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.imagen}" width="100" alt="${item.titulo}"></td>
            <td style="color:#fff;">${item.titulo}</td>
            <td style="color:#fff;">$${item.precio}</td>
            <td><a href="#" class="borrar" data-id="${item.id}">X</a></td>
        `;
        lista.appendChild(row);
    });
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        const elementoId = e.target.getAttribute('data-id');

        const row = e.target.closest('tr');
        if (row) row.remove();

        carritoArray = carritoArray.filter(item => item.id !== elementoId);

        localStorage.setItem('carrito', JSON.stringify(carritoArray));

        renderCarrito();
    }
}

function vaciarCarrito(e) {
    e.preventDefault();

    while (lista && lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    carritoArray = [];
    localStorage.setItem('carrito', JSON.stringify(carritoArray));

    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="4" style="color:#fff; text-align:center; padding:12px;">Carrito vacío</td>`;
    if (lista) lista.appendChild(row);
    return false;
}

document.getElementById('contactos-link').addEventListener('click', function(e) {
  
  document.getElementById('modalContact').style.display = 'block';
});

document.querySelectorAll('.modal .close').forEach(function(span) {
  span.addEventListener('click', function() {
    this.closest('.modal').style.display = 'none';
  });
});
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

document.querySelectorAll('.btn-4').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    var modalId = this.dataset.modal;
    var modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'block';
  });
});


const imgCarritoIcon = document.getElementById('img-carrito');
const carritoBox = document.getElementById('carrito');

function toggleCarrito(e) {
  e.stopPropagation(); 
  carritoBox.classList.toggle('show');
}

if (imgCarritoIcon) {
  imgCarritoIcon.addEventListener('click', toggleCarrito);
}
const btnVerCarrito = document.getElementById('btn-ver-carrito');
if (btnVerCarrito) {
  btnVerCarrito.addEventListener('click', function(e) {
    e.stopPropagation();
    carritoBox.classList.add('show');
  });
}

document.addEventListener('click', function (e) {
  if (!carritoBox.contains(e.target) && e.target !== imgCarritoIcon && e.target !== btnVerCarrito) {
    carritoBox.classList.remove('show');
  }
});

carritoBox.addEventListener('click', function(e) {
  e.stopPropagation();
});

const btnInicio = document.getElementById('btn-inicio');

if (btnInicio) {
    btnInicio.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const btnProductos = document.getElementById('btn-productos');
const seccionProductos = document.getElementById('lista-2');

if (btnProductos && seccionProductos) {
    btnProductos.addEventListener('click', () => {
        seccionProductos.scrollIntoView({ behavior: 'smooth' });
    });
}

const opcComprarProductos = document.getElementById('opc-comprar-productos');

if (opcComprarProductos && seccionProductos) {
    opcComprarProductos.addEventListener('click', () => {
        seccionProductos.scrollIntoView({ behavior: 'smooth' });
        modalServicios.style.display = 'none';
    });
}

const opcAsesoramiento = document.getElementById('opc-asesoramiento');
const seccionBlog = document.getElementById('blog');

if (opcAsesoramiento && seccionBlog) {
    opcAsesoramiento.addEventListener('click', () => {
        seccionBlog.scrollIntoView({ behavior: 'smooth' });
        modalServicios.style.display = 'none';
    });
}

const btnServicios = document.getElementById('btn-servicios');
const modalServicios = document.getElementById('modal-servicios');
const cerrarServicios = document.getElementById('cerrar-servicios');

const btnServComprar = document.getElementById('opc-comprar-productos');
const btnServAsesoramiento = document.getElementById('opc-asesoramiento');

if (btnServicios) {
    btnServicios.addEventListener('click', (e) => {
        e.stopPropagation();
        modalServicios.style.display = 'flex';
    });
}

if (cerrarServicios) {
    cerrarServicios.addEventListener('click', () => {
        modalServicios.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modalServicios) {
        modalServicios.style.display = 'none';
    }
});

if (btnServComprar && document.getElementById('lista-2')) {
    btnServComprar.addEventListener('click', () => {
        document.getElementById('lista-2').scrollIntoView({ behavior: 'smooth' });
        modalServicios.style.display = 'none';
    });
}

if (btnServAsesoramiento && document.getElementById('blog')) {
    btnServAsesoramiento.addEventListener('click', () => {
        document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
        modalServicios.style.display = 'none';
    });
}

function obtenerPrecioDeProducto(elemento) {
    
    const precioOfertaEl = elemento.querySelector('.precio-oferta');
    if (precioOfertaEl && precioOfertaEl.textContent.trim() !== '') {
        
        const num = precioOfertaEl.textContent.replace(/[^0-9]/g, '');
        return num ? Number(num) : null;
    }

    const precioNormalEl = elemento.querySelector('.precio');
    if (precioNormalEl && precioNormalEl.textContent.trim() !== '') {
        const num = precioNormalEl.textContent.replace(/[^0-9]/g, '');
        return num ? Number(num) : null;
    }

    const anyPrice = elemento.querySelector('span');
    if (anyPrice && /\d/.test(anyPrice.textContent)) {
        const num = anyPrice.textContent.replace(/[^0-9]/g, '');
        return num ? Number(num) : null;
    }

    return null;
}

function leerDatosElemento(elemento) {
    
    const imagenEl = elemento.querySelector('img');
    const tituloEl = elemento.querySelector('h3');
    const idEl = elemento.querySelector('[data-id]');

    let precioDetectado = obtenerPrecioDeProducto(elemento);
    if (precioDetectado === null) {
        precioDetectado = 0; 
    }

    const infoElemento = {
        imagen: imagenEl ? imagenEl.src : '',
        titulo: tituloEl ? tituloEl.textContent.trim() : 'Producto',
        precio: precioDetectado,
        id: idEl ? idEl.getAttribute('data-id') : Date.now().toString()
    };

    carritoArray.push(infoElemento);
    localStorage.setItem('carrito', JSON.stringify(carritoArray));
    renderCarrito();
}

document.querySelectorAll('.footer .link a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const text = this.textContent.trim().toLowerCase();

        const modalMap = {
            "quiénes somos": "modal-sobre-nosotros",
            "nuestra misión": "modal-mision",
            "calidad y diseño": "modal-calidad",
            "valores de la marca": "modal-valores",

            "preguntas frecuentes": "modal-faq",
            "garantías y cambios": "modal-garantias",
            "política de envíos": "modal-envios",
            "términos y condiciones": "modal-terminos",

            "sofás y sillones": "modal-sofas",
            "sillas de escritorio": "modal-sillas-escritorio",
            "sillas tipo barra": "modal-sillas-barra",
            "colección destacada": "modal-coleccion",

            "whatsapp: 3153866467": "modal-whatsapp",
            "instagram: favianlazaro44": "modal-instagram",
            "email: favianandres044@gmail.com": "modal-email",
            "soporte personalizado": "modal-soporte"
        };

        const modalId = modalMap[text];
        if (modalId) {
            document.getElementById(modalId).style.display = "block";
        }
    });
});

document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', () => {
         btn.closest('.modal').style.display = "none";
    });
});

window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});