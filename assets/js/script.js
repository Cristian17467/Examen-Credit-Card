const card = document.getElementById('card');
const inputNumber = document.getElementById('input-number');
const inputName = document.getElementById('input-name');
const inputCVV = document.getElementById('input-cvv');
const selectDay = document.getElementById('select-day');
const selectYear = document.getElementById('select-year');

// 1. Generar días (01 al 31)
for (let i = 1; i <= 31; i++) {
    let d = i < 10 ? '0' + i : i;
    let opt = new Option(d, d);
    selectDay.add(opt);
}

// 2. Generar años (1980 al 2026) - REQUERIMIENTO ESPECIAL
for (let i = 1980; i <= 2026; i++) {
    let opt = new Option(i, i.toString().slice(-2));
    selectYear.add(opt);
}

// 3. Formatear número de tarjeta y actualizar visual
inputNumber.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, ''); // Solo números
    let formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    e.target.value = formatted;

    document.getElementById('card-num-display').innerText = formatted || '#### #### #### ####';
    
    // Actualizar últimos 4 dígitos en el reverso
    const lastDigits = val.slice(-4);
    document.getElementById('card-last-digits').innerText = lastDigits.length === 4 ? lastDigits : '7345';
});

// 4. Actualizar Nombre
inputName.addEventListener('input', (e) => {
    document.getElementById('card-name-display').innerText = e.target.value.toUpperCase() || 'NOMBRE COMPLETO';
});

// 5. Actualizar Fecha
const updateDate = () => {
    const d = selectDay.value || 'MM';
    const y = selectYear.value || 'YY';
    document.getElementById('card-exp-display').innerText = `${d}/${y}`;
};
selectDay.addEventListener('change', updateDate);
selectYear.addEventListener('change', updateDate);

// 6. Animación de Giro y CVV
inputCVV.addEventListener('focus', () => card.classList.add('flipped'));
inputCVV.addEventListener('blur', () => card.classList.remove('flipped'));
inputCVV.addEventListener('input', (e) => {
    document.getElementById('card-cvv-display').innerText = e.target.value || '000';
});