const card = document.getElementById('card');
const inputNumber = document.getElementById('input-number');
const inputName = document.getElementById('input-name');
const inputCVV = document.getElementById('input-cvv');
const selectDay = document.getElementById('select-day');
const selectYear = document.getElementById('select-year');
const bankLogoDisplay = document.getElementById('bank-logo-display');

// 1. Generar días (01 al 31)
for (let i = 1; i <= 31; i++) {
    let d = i < 10 ? '0' + i : i;
    selectDay.add(new Option(d, d));
}

// 2. Generar años (1980 al 2026) - Rango solicitado
for (let i = 1980; i <= 2026; i++) {
    let yearValue = i.toString().slice(-2);
    selectYear.add(new Option(i, yearValue));
}

// 3. Lógica para detectar red de tarjeta y mostrar logo a los 8 dígitos
const updateBankLogo = (rawNumber) => {
    // Limpiamos el contenedor
    bankLogoDisplay.innerHTML = '';
    
    // Solo actuamos si el usuario ha introducido 8 dígitos o más
    if (rawNumber.length >= 8) {
        let logoSrc = '';
        let altText = '';

        // Detección básica (Visa empieza con 4, Mastercard con 5)
        if (rawNumber.startsWith('4')) {
            // Reemplaza esto con la ruta real de tu imagen de Visa
            logoSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png';
            altText = 'Visa';
        } else if (rawNumber.startsWith('5')) {
            // Reemplaza esto con la ruta real de tu imagen de Mastercard
            logoSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png';
            altText = 'Mastercard';
        }

        if (logoSrc) {
            bankLogoDisplay.innerHTML = `<img src="${logoSrc}" class="bank-logo-img" alt="${altText}">`;
        } else {
            // Fallback si es otra tarjeta (AMEX, etc) y no tienes imagen
            bankLogoDisplay.innerHTML = '<span class="bank-text-fallback">BANK</span>';
        }
    }
};

// 4. Formatear número de tarjeta y actualizar visual
inputNumber.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, ''); // Solo números
    let formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ').trim(); // Añade espacios
    e.target.value = formatted;

    document.getElementById('card-num-display').innerText = formatted || '#### #### #### ####';
    
    // Actualizar últimos 4 dígitos en la firma del reverso
    const lastDigits = val.slice(-4);
    document.getElementById('card-last-digits').innerText = val.length >= 4 ? lastDigits : '7345';
    
    // Llamar a la función del logo pasándole el número sin espacios
    updateBankLogo(val);
});

// 5. Actualizar Nombre del titular
inputName.addEventListener('input', (e) => {
    document.getElementById('card-name-display').innerText = e.target.value.toUpperCase() || 'NOMBRE COMPLETO';
});

// 6. Actualizar Fecha de Expiración
const updateDate = () => {
    const d = selectDay.value || 'MM';
    const y = selectYear.value || 'YY';
    document.getElementById('card-exp-display').innerText = `${d}/${y}`;
};
selectDay.addEventListener('change', updateDate);
selectYear.addEventListener('change', updateDate);

// 7. Animación de Giro y actualización de CVV
inputCVV.addEventListener('focus', () => card.classList.add('flipped'));
inputCVV.addEventListener('blur', () => card.classList.remove('flipped'));
inputCVV.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, ''); // Solo números permitidos
    e.target.value = val;
    document.getElementById('card-cvv-display').innerText = val || '000';
});