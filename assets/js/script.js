const card = document.getElementById('card');
const inputNumber = document.getElementById('input-number');
const inputName = document.getElementById('input-name');
const inputCVV = document.getElementById('input-cvv');
const selectDay = document.getElementById('select-day');
const selectYear = document.getElementById('select-year');
const bankLogoDisplay = document.getElementById('bank-logo-display');

// Generar meses (01 al 12)
for (let i = 1; i <= 12; i++) {
    let d = i < 10 ? '0' + i : i;
    selectDay.add(new Option(d, d));
}

// Generar años (1980 al 2035)
for (let i = 1980; i <= 2035; i++) {
    let yearValue = i.toString().slice(-2);
    selectYear.add(new Option(i, yearValue));
}

// Lógica para detectar red de tarjeta y mostrar logo SOLO si hay 8 o más dígitos
const updateBankLogo = (rawNumber) => {
    bankLogoDisplay.innerHTML = ''; // Limpiar logo por defecto
    
    // Condición: Mostrar logo solo al ingresar 8 o más dígitos
    if (rawNumber.length >= 8) {
        let logoSrc = '';

        if (rawNumber.startsWith('4')) {
            // Visa
            logoSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Visa_2014.svg/200px-Visa_2014.svg.png';
        } else if (rawNumber.startsWith('5')) {
            // Mastercard
            logoSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png';
        }

        if (logoSrc) {
            bankLogoDisplay.innerHTML = `<img src="${logoSrc}" class="bank-logo-img" alt="Banco">`;
        }
    }
};

// Formatear número de tarjeta y actualizar visual de Izquierda a Derecha
inputNumber.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, ''); // Solo números
    let formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ').trim(); // Espacios cada 4
    e.target.value = formatted;

    document.getElementById('card-num-display').innerText = formatted || '#### #### #### ####';
    
    // Últimos 4 dígitos para el reverso
    const lastDigits = val.slice(-4);
    document.getElementById('card-last-digits').innerText = val.length >= 4 ? lastDigits : '####';
    
    // Llamar a la función del logo
    updateBankLogo(val);
});

// Actualizar Nombre del titular
inputName.addEventListener('input', (e) => {
    document.getElementById('card-name-display').innerText = e.target.value || 'NOMBRE COMPLETO';
});

// Actualizar Fecha de Expiración
const updateDate = () => {
    const d = selectDay.value || 'MM';
    const y = selectYear.value || 'YY';
    document.getElementById('card-exp-display').innerText = `${d}/${y}`;
};
selectDay.addEventListener('change', updateDate);
selectYear.addEventListener('change', updateDate);

// Animación de Giro y actualización de CVV
inputCVV.addEventListener('focus', () => card.classList.add('flipped'));
inputCVV.addEventListener('blur', () => card.classList.remove('flipped'));
inputCVV.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, ''); 
    e.target.value = val;
    document.getElementById('card-cvv-display').innerText = val || '000';
});