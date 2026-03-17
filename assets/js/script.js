const card = document.getElementById('card');
const inputNumber = document.getElementById('input-number');
const inputName = document.getElementById('input-name');
const inputCVV = document.getElementById('input-cvv');
const selectMonth = document.getElementById('select-month');
const selectYear = document.getElementById('select-year');

// Llenar selectores de fecha
for(let i = 1; i <= 31; i++) {
    let opt = document.createElement('option');
    opt.value = i < 10 ? '0'+i : i;
    opt.innerHTML = i < 10 ? '0'+i : i;
    selectMonth.appendChild(opt);
}
for(let i = 2024; i <= 2035; i++) {
    let opt = document.createElement('option');
    opt.value = i.toString().slice(-2);
    opt.innerHTML = i;
    selectYear.appendChild(opt);
}

// Actualizar Número (con espacios)
inputNumber.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value;
    document.getElementById('card-num-display').innerText = value || '#### #### #### ####';
});

// Actualizar Nombre
inputName.addEventListener('input', (e) => {
    document.getElementById('card-name-display').innerText = e.target.value.toUpperCase() || 'NOMBRE COMPLETO';
});

// Actualizar Expiración
const updateExp = () => {
    const m = selectMonth.value || 'MM';
    const y = selectYear.value || 'YY';
    document.getElementById('card-exp-display').innerText = `${m}/${y}`;
};
selectMonth.addEventListener('change', updateExp);
selectYear.addEventListener('change', updateExp);

// Giro de tarjeta al enfocar CVV
inputCVV.addEventListener('focus', () => card.classList.add('flipped'));
inputCVV.addEventListener('blur', () => card.classList.remove('flipped'));
inputCVV.addEventListener('input', (e) => {
    document.getElementById('card-cvv-display').innerText = e.target.value;
});