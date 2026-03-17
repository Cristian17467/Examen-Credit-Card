// Referencias al DOM (Formulario)
const inputNumero = document.getElementById('input-numero');
const inputNombre = document.getElementById('input-nombre');
const inputMes = document.getElementById('input-mes');
const inputAnio = document.getElementById('input-anio');
const inputCvv = document.getElementById('input-cvv');

// Referencias al DOM (Tarjeta visual)
const displayNumero = document.getElementById('display-numero');
const displayFirmaNumero = document.getElementById('display-firma-numero');
const displayNombre = document.getElementById('display-nombre');
const displayFecha = document.getElementById('display-fecha');
const displayCvv = document.getElementById('display-cvv');

// Referencias al DOM (Logos y Animación)
const logoFront = document.getElementById('logo-banco-front');
const logoBack = document.getElementById('logo-banco-back');
const cardVisual = document.getElementById('card-visual');

// URLs de logos (Puedes cambiarlas por imágenes locales, ej: 'img/visa.png')
const logos = {
    visa: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
    mastercard: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
    amex: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg'
};

// ==========================================
// FORMATEO DE NÚMERO Y DETECCIÓN DE MARCA
// ==========================================
inputNumero.addEventListener('input', (e) => {
    // Eliminar cualquier cosa que no sea número
    let valor = e.target.value.replace(/\D/g, '');
    
    // Limpiar logos previos
    logoFront.innerHTML = '';
    logoBack.innerHTML = '';

    // Detectar marca (Visa empieza con 4, Mastercard con 5, Amex con 3)
    let marca = '';
    if (valor.startsWith('4')) marca = 'visa';
    else if (valor.startsWith('5')) marca = 'mastercard';
    else if (valor.startsWith('3')) marca = 'amex';

    // Si detecta una marca, inyecta la imagen en AMBOS lados
    if (marca) {
        const imgFront = document.createElement('img');
        imgFront.src = logos[marca];
        logoFront.appendChild(imgFront);

        const imgBack = document.createElement('img');
        imgBack.src = logos[marca];
        logoBack.appendChild(imgBack);
    }

    // Formatear con un espacio cada 4 dígitos en el input
    let formateado = valor.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = formateado;

    // Actualizar el número en la parte frontal de la tarjeta
    displayNumero.textContent = formateado || '#### #### #### ####';
    
    // Actualizar los últimos 4 dígitos en la tira de la parte trasera
    if(valor.length >= 4) {
        displayFirmaNumero.textContent = valor.slice(-4);
    } else {
        displayFirmaNumero.textContent = '####';
    }
});

// ==========================================
// ACTUALIZAR NOMBRE
// ==========================================
inputNombre.addEventListener('input', (e) => {
    displayNombre.textContent = e.target.value.toUpperCase() || 'NOMBRE COMPLETO';
});

// ==========================================
// ACTUALIZAR FECHA
// ==========================================
function actualizarFecha() {
    let mes = inputMes.value || 'MM';
    let anio = inputAnio.value || 'YY';
    displayFecha.textContent = `${mes}/${anio}`;
}
inputMes.addEventListener('change', actualizarFecha);
inputAnio.addEventListener('change', actualizarFecha);

// ==========================================
// CVV Y GIRO DE TARJETA
// ==========================================
// Girar al enfocar el input del CVV
inputCvv.addEventListener('focus', () => {
    cardVisual.classList.add('flipped');
});

// Regresar a la normalidad al salir del input del CVV
inputCvv.addEventListener('blur', () => {
    cardVisual.classList.remove('flipped');
});

// Actualizar los dígitos del CVV en tiempo real
inputCvv.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, ''); // Solo números
    e.target.value = valor;
    displayCvv.textContent = valor || '000';
});