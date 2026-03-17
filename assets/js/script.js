const card = document.getElementById('card');
const inputNumber = document.getElementById('input-number');
const inputName = document.getElementById('input-name');
const inputCVV = document.getElementById('input-cvv');
const selectDay = document.getElementById('select-day');
const selectYear = document.getElementById('select-year');

const bankLogoDisplay = document.getElementById('bank-logo-display');
const bankLogoBackDisplay = document.getElementById('bank-logo-back-display');

// Elementos nuevos
const btnToggleCVV = document.getElementById('toggle-cvv');
const eyeIcon = document.getElementById('eye-icon');
const displayCVV = document.getElementById('card-cvv-display');

const inputAmount = document.getElementById('input-amount');
const cartAmountDisplay = document.getElementById('cart-amount-display');
const btnPay = document.getElementById('btn-pay');
const successOverlay = document.getElementById('success-overlay');

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

// Lógica de Logos Dinámicos
const updateBankLogo = (rawNumber) => {
    bankLogoDisplay.innerHTML = ''; 
    bankLogoBackDisplay.innerHTML = '';

    if (rawNumber.length >= 8) {
        const bin = rawNumber.substring(0, 8);
        let svgLogo = '';

        const bankLogos = {
            '41523132': `<svg viewBox="0 0 100 30"><text x="0" y="25" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#ffffff" letter-spacing="1">BBVA</text></svg>`,
            '55790700': `<svg viewBox="0 0 120 30"><text x="0" y="24" font-family="Arial, sans-serif" font-weight="bold" font-size="22" fill="#ffffff">Santander</text></svg>`,
            '52567812': `<svg viewBox="0 0 130 30"><text x="0" y="24" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#ffffff">citibanamex</text></svg>`,
            '53501501': `<svg viewBox="0 0 60 30"><text x="0" y="26" font-family="Arial, sans-serif" font-weight="bold" font-size="28" fill="#ffffff">Nu</text></svg>`,
            '49131600': `<svg viewBox="0 0 110 30"><text x="0" y="24" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#ffffff">BANORTE</text></svg>`,
            '44315300': `<svg viewBox="0 0 80 30"><text x="0" y="25" font-family="Arial, sans-serif" font-weight="bold" font-size="26" fill="#ffffff">HSBC</text></svg>`
        };

        if (bankLogos[bin]) {
            svgLogo = bankLogos[bin];
        } else {
            if (rawNumber.startsWith('4')) {
                svgLogo = `
                    <svg viewBox="0 0 50 16" fill="#ffffff" width="100%" height="100%">
                        <path d="M22.064 0h3.585l-3.376 15.65h-3.584L22.064 0zm15.42 15.253c-3.18 0-5.419-1.637-5.433-3.982-.021-1.9 1.76-2.956 3.102-3.593 1.378-.654 1.84-1.071 1.833-1.652-.01-.892-1.11-1.285-2.14-1.3-1.423-.021-2.253.371-3.033.722l-.427.194-.482-2.888c.783-.35 2.217-.66 3.71-.671 3.364 0 5.56 1.597 5.58 4.07.02 1.082-.365 2.1-1.284 2.828-.62.486-1.895 1.041-2.67 1.455-1.258.65-1.503 1.074-1.493 1.66.012.83.992 1.25 2.215 1.25 1.157-.02 1.948-.256 2.66-.583l.36-.164.462 2.76c-.722.327-2.008.66-3.468.66zm-17.708-3.09l.666-3.197c.502-2.384.97-4.636 1.438-6.883h3.535l-5.636 13.567H16.03l-3.05-10.457c-.208-.737-.41-1.03-1.04-1.393L8.6 2.05v-.206h5.812c.742 0 1.423.515 1.59 1.34L17.556 8.7a85.83 85.83 0 0 1 1.033 5.467h.034l.872-4.113.28-1.31zM6.9 15.65H2.336L.003 0H4.55l2.35 15.65z"/>
                    </svg>`;
            } else if (rawNumber.startsWith('5')) {
                svgLogo = `
                    <svg viewBox="0 0 44 28" width="100%" height="100%">
                        <circle cx="14" cy="14" r="14" fill="#eb001b"/>
                        <circle cx="30" cy="14" r="14" fill="#f79e1b"/>
                        <path d="M22 25.12a13.94 13.94 0 0 0 0-22.24 13.94 13.94 0 0 0 0 22.24z" fill="#ff5f00"/>
                    </svg>`;
            }
        }

        bankLogoDisplay.innerHTML = svgLogo;
        bankLogoBackDisplay.innerHTML = svgLogo;
    }
};

// Formatear número de tarjeta
inputNumber.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, ''); 
    let formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ').trim(); 
    e.target.value = formatted;

    document.getElementById('card-num-display').innerText = formatted || '#### #### #### ####';
    
    const lastDigits = val.slice(-4);
    document.getElementById('card-last-digits').innerText = val.length >= 4 ? lastDigits : '####';
    
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

// Lógica del Ojo del CVV
function updateCVVDisplay() {
    const val = inputCVV.value;
    if (inputCVV.getAttribute('type') === 'password') {
        displayCVV.innerText = '●'.repeat(val.length) || '000';
    } else {
        displayCVV.innerText = val || '000';
    }
}

btnToggleCVV.addEventListener('click', () => {
    const isPassword = inputCVV.getAttribute('type') === 'password';
    inputCVV.setAttribute('type', isPassword ? 'text' : 'password');
    eyeIcon.classList.toggle('bi-eye');
    eyeIcon.classList.toggle('bi-eye-slash');
    updateCVVDisplay();
});

// Animación de Giro y actualización de CVV
inputCVV.addEventListener('focus', () => card.classList.add('flipped'));
inputCVV.addEventListener('blur', () => card.classList.remove('flipped'));
inputCVV.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, ''); 
    e.target.value = val;
    updateCVVDisplay();
});

// Carrito en tiempo real
inputAmount.addEventListener('input', (e) => {
    let val = e.target.value.replace(/[^0-9.]/g, ''); 
    if(val) {
        cartAmountDisplay.innerText = `$ ${val}`;
    } else {
        cartAmountDisplay.innerText = '$ 0.00';
    }
});

// Procesar el Pago, mostrar Palomita y descargar PDFd
btnPay.addEventListener('click', (e) => {
    e.preventDefault();

    if(!inputAmount.value || !inputNumber.value) {
        alert("Por favor, ingresa al menos el Monto y el Número de Tarjeta para proceder.");
        return;
    }

    successOverlay.classList.remove('d-none');

    const amountVal = cartAmountDisplay.innerText;
    const nameVal = inputName.value || 'Cliente General';
    const cardRaw = inputNumber.value.replace(/\s/g, '');
    const last4Val = cardRaw.length >= 4 ? cardRaw.slice(-4) : '####';
    
    const fecha = new Date();
    const dateVal = fecha.toLocaleDateString() + ' ' + fecha.toLocaleTimeString();

    document.getElementById('receipt-name').innerText = nameVal;
    document.getElementById('receipt-card').innerText = last4Val;
    document.getElementById('receipt-amount').innerText = amountVal;
    document.getElementById('receipt-date').innerText = dateVal;

    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = ''; 
    
    const urlFacturacion = `https://tupagina.com/facturar?monto=${amountVal.replace(/[^0-9.]/g, '')}&tarjeta=${last4Val}`;
    
    new QRCode(qrContainer, {
        text: urlFacturacion,
        width: 120,
        height: 120,
        colorDark : "#0f172a",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        const receiptElement = document.getElementById('receipt-template');
        
        const opt = {
            margin:       10,
            filename:     `Boucher_SecurePay_${last4Val}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a5', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(receiptElement).save().then(() => {
            setTimeout(() => {
                successOverlay.classList.add('d-none');
            }, 1500);
        });

    }, 2000); 
});