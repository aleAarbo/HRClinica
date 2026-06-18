const edad = document.getElementById("numero");


edad.addEventListener("blur", () => {

    const validez = edad.validity;

    edad.setCustomValidity('');

    if (validez.valueMissing) {
        edad.setCustomValidity('Debe ser mayor de 18');
        edad.reportValidity();
    }
    else if (validez.rangeUnderflow) {
        edad.setCustomValidity('Mínimo es 1');
        edad.reportValidity();
    }
    else if (validez.rangeOverflow) {
        edad.setCustomValidity('Máximo es 100');
        edad.reportValidity();
    }
    else if (validez.valid) {
        alert("Pasaste");
    }
});