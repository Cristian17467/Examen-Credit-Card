const card = document.getElementById('card');
const inputNumber = document.getElementById('input-number');
const inputName = document.getElementById('input-name');
const inputCVV = document.getElementById('input-cvv');
const selectDay = document.getElementById('select-day');
const selectYear = document.getElementById('select-year');

// Referencias a los contenedores de los logos (Frente y Dorso)
const bankLogoDisplay = document.getElementById('bank-logo-display');
const bankLogoBackDisplay = document.getElementById('bank-logo-back-display');

// Generar meses y años
for (let i = 1; i <= 12; i++) {
    let d = i < 10 ? '0' + i : i;
    selectDay.add(new Option(d, d));
}
for (let i = 1980; i <= 2035; i++) {
    let yearValue = i.toString().slice(-2);
    selectYear.add(new Option(i, yearValue));
}

// Lógica de Logos con detección a los 8 dígitos
const updateBankLogo = (rawNumber) => {
    // Limpiamos ambos contenedores
    bankLogoDisplay.innerHTML = ''; 
    bankLogoBackDisplay.innerHTML = '';

    if (rawNumber.length >= 1) {
        let svgLogo = '';

        // Si tenemos 8 dígitos o más, intentamos detectar el banco específico
        if (rawNumber.length >= 8) {
            const bin = rawNumber.substring(0, 8);
            
            // Simulación de base de datos de BINs (Se usan colores originales de las marcas)
            if (bin === '41523132') {
                // BBVA (Azul marino)
                svgLogo = `<svg viewBox="0 0 100 30"><text x="0" y="25" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#004481" letter-spacing="1">BBVA</text></svg>`;
            } else if (bin === '55790700') {
                // Santander (Rojo)
                svgLogo = `<svg viewBox="0 0 120 30"><text x="0" y="24" font-family="Arial, sans-serif" font-weight="bold" font-size="22" fill="#EC0000">Santander</text></svg>`;
            } else if (bin === '52567812') {
                // Citibanamex (Azul oscuro)
                svgLogo = `<svg viewBox="0 0 130 30"><text x="0" y="24" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#002D72">citibanamex</text></svg>`;
            } else if (bin === '53501501') {
                // Nu (Morado)
                svgLogo = `<svg viewBox="0 0 60 30"><text x="0" y="26" font-family="Arial, sans-serif" font-weight="bold" font-size="28" fill="#8A05BE">Nu</text></svg>`;
            }
        }

        // Si no detectó banco a los 8 dígitos, O si tiene menos de 8 dígitos, muestra Visa/Mastercard
        if (svgLogo === '') {
            if (rawNumber.startsWith('4')) {
                // Logo Visa en sus colores originales (Azul)
                svgLogo = `
                    <svg viewBox="0 0 50 16" fill="#1A1F71" width="100%" height="100%">
                        <path d="M22.064 0h3.585l-3.376 15.65h-3.584L22.064 0zm15.42 15.253c-3.18 0-5.419-1.637-5.433-3.982-.021-1.9 1.76-2.956 3.102-3.593 1.378-.654 1.84-1.071 1.833-1.652-.01-.892-1.11-1.285-2.14-1.3-1.423-.021-2.253.371-3.033.722l-.427.194-.482-2.888c.783-.35 2.217-.66 3.71-.671 3.364 0 5.56 1.597 5.58 4.07.02 1.082-.365 2.1-1.284 2.828-.62.486-1.895 1.041-2.67 1.455-1.258.65-1.503 1.074-1.493 1.66.012.83.992 1.25 2.215 1.25 1.157-.02 1.948-.256 2.66-.583l.36-.164.462 2.76c-.722.327-2.008.66-3.468.66zm-17.708-3.09l.666-3.197c.502-2.384.97-4.636 1.438-6.883h3.535l-5.636 13.567H16.03l-3.05-10.457c-.208-.737-.41-1.03-1.04-1.393L8.6 2.05v-.206h5.812c.742 0 1.423.515 1.59 1.34L17.556 8.7a85.83 85.83 0 0 1 1.033 5.467h.034l.872-4.113.28-1.31zM6.9 15.65H2.336L.003 0H4.55l2.35 15.65z"/>
                    </svg>`;
            } else if (rawNumber.startsWith('5')) {
                // Logo Mastercard en sus colores originales (Rojo y Naranja)
                svgLogo = `
                    <svg viewBox="0 0 44 28" width="100%" height="100%">
                        <circle cx="14" cy="14" r="14" fill="#eb001b"/>
                        <circle cx="30" cy="14" r="14" fill="#f79e1b"/>
                        <path d="M22 25.12a13.94 13.94 0 0 0 0-22.24 13.94 13.94 0 0 0 0 22.24z" fill="#ff5f00"/>
                    </svg>`;
            }
        }

        // Insertar el logo en el frente y en el reverso
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