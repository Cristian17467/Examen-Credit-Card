document.addEventListener('DOMContentLoaded', () => {
    // Inputs del formulario
    const cardNumberInput = document.getElementById('cardNumber');
    const cardHolderInput = document.getElementById('cardHolder');
    const expMonthSelect = document.getElementById('expirationMonth');
    const expYearSelect = document.getElementById('expirationYear');
    const cvvInput = document.getElementById('cardCVV');

    // Elementos visuales de la tarjeta
    const displayCardNumber = document.getElementById('displayCardNumber');
    const displayCardHolder = document.getElementById('displayCardHolder');
    const displayCardExpiration = document.getElementById('displayCardExpiration');
    const displayCardCVV = document.getElementById('displayCardCVV');
    const card = document.getElementById('card');

    // --- 1. Sincronizar Número de Tarjeta ---
    cardNumberInput.addEventListener('input', (e) => {
        let inputVal = e.target.value.replace(/\D/g, '');
        let formattedVal = inputVal.match(/.{1,4}/g)?.join(' ') || '';
        e.target.value = formattedVal;
        
        if (formattedVal === '') {
            displayCardNumber.innerText = '#### #### #### ####';
            displayCardNumber.classList.remove('filled');
        } else {
            displayCardNumber.innerText = formattedVal;
            displayCardNumber.classList.add('filled');
        }
    });

    // --- 2. Sincronizar Titular de la Tarjeta ---
    cardHolderInput.addEventListener('input', (e) => {
        let inputVal = e.target.value.toUpperCase();
        
        if (inputVal === '') {
            displayCardHolder.innerText = 'NOMBRE COMPLETO';
            displayCardHolder.classList.remove('filled');
        } else {
            displayCardHolder.innerText = inputVal;
            displayCardHolder.classList.add('filled');
        }
    });

    // --- 3. Sincronizar Fecha de Expiración ---
    function updateExpiry() {
        let m = expMonthSelect.value || 'MM';
        let y = expYearSelect.value || 'YY';
        displayCardExpiration.innerText = `${m}/${y}`;
        
        if (m !== 'MM' || y !== 'YY') {
            displayCardExpiration.classList.add('filled');
        } else {
            displayCardExpiration.classList.remove('filled');
        }
    }
    expMonthSelect.addEventListener('change', updateExpiry);
    expYearSelect.addEventListener('change', updateExpiry);

    // --- 4. Girar la tarjeta y actualizar CVV ---
    cvvInput.addEventListener('focus', () => {
        card.classList.add('flipped');
    });

    cvvInput.addEventListener('blur', () => {
        card.classList.remove('flipped');
    });

    cvvInput.addEventListener('input', (e) => {
        let inputVal = e.target.value.replace(/\D/g, '');
        e.target.value = inputVal;
        displayCardCVV.innerText = inputVal !== '' ? inputVal : '000';
    });

    // --- Funcionalidad del ojo ---
    const eyeIcon = document.querySelector('.eye-icon');
    eyeIcon.addEventListener('click', () => {
        if (cvvInput.type === 'text') {
            cvvInput.type = 'password';
            eyeIcon.style.stroke = '#4a5568';
        } else {
            cvvInput.type = 'text';
            eyeIcon.style.stroke = '#a0aec0';
        }
    });
});