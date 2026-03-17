const card = document.getElementById('card');
const inputNumber = document.getElementById('input-number');
const inputName = document.getElementById('input-name');
const inputCVV = document.getElementById('input-cvv');
const selectDay = document.getElementById('select-day');
const selectYear = document.getElementById('select-year');
const bankLogoDisplay = document.getElementById('bank-logo-display');

// 1. Generar meses (01 al 12)
for (let i = 1; i <= 12; i++) {
    let d = i < 10 ? '0' + i : i;
    selectDay.add(new Option(d, d));
}

// 2. Generar años (1980 al 2026)
for (let i = 1980; i <= 2026; i++) {
    let yearValue = i.toString().slice(-2);
    selectYear.add(new Option(i, yearValue));
}

// 3. Lógica para detectar red de tarjeta y mostrar logo
const updateBankLogo = (rawNumber) => {
    bankLogoDisplay.innerHTML = '';
    
    if (rawNumber.length >= 8) {
        let logoSrc = '';
        let altText = '';

        if (rawNumber.startsWith('4')) {
            logoSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Visa_2014.svg/200px-Visa_2014.svg.png';
            altText = 'Visa';
        } else if (rawNumber.startsWith('5')) {
            logoSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png';
            altText = 'Mastercard';
        }

        if (logoSrc) {
            bankLogoDisplay.innerHTML = `<img src="${logoSrc}" class="bank-logo-img" alt="${altText}">`;
        }
    }
};

// 4. Formatear número de tarjeta y actualizar visual
inputNumber.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, ''); 
    let formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ').trim(); 
    e.target.value = formatted;

    document.getElementById('card-num-display').innerText = formatted || '#### #### #### ####';
    
    const lastDigits = val.slice(-4);
    document.getElementById('card-last-digits').innerText = val.length >= 4 ? lastDigits : '7345';
    
    updateBankLogo(val);
});

// 5. Actualizar Nombre del titular
inputName.addEventListener('input', (e) => {
    document.getElementById('card-name-display').innerText = e.target.value || 'NOMBRE COMPLETO';
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
    let val = e.target.value.replace(/\D/g, ''); 
    e.target.value = val;
    document.getElementById('card-cvv-display').innerText = val || '000';
});