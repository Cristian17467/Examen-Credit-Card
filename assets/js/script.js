const card = document.getElementById('card');

// Inputs
const iNumber = document.getElementById('i-number');
const iName = document.getElementById('i-name');
const iMonth = document.getElementById('i-month');
const iYear = document.getElementById('i-year');
const iCVV = document.getElementById('i-cvv');

// Visual Elements en la tarjeta
const vNumber = document.getElementById('v-number');
const vName = document.getElementById('v-name');
const vExpiry = document.getElementById('v-expiry');
const vCVV = document.getElementById('v-cvv');

// Reflejar número
iNumber.addEventListener('input', (e) => {
    vNumber.innerText = e.target.value || "#### #### #### ####";
});

// Reflejar nombre
iName.addEventListener('input', (e) => {
    vName.innerText = e.target.value.toUpperCase() || "NOMBRE COMPLETO";
});

// Reflejar Expiración
const updateExpiry = () => {
    vExpiry.innerText = `${iMonth.value || 'MM'}/${iYear.value || 'YY'}`;
};
iMonth.addEventListener('change', updateExpiry);
iYear.addEventListener('change', updateExpiry);

// Reflejar CVV
iCVV.addEventListener('input', (e) => {
    vCVV.innerText = e.target.value;
});

// GIRAR TARJETA
iCVV.addEventListener('focus', () => {
    card.classList.add('flipped');
});

iCVV.addEventListener('blur', () => {
    card.classList.remove('flipped');
});