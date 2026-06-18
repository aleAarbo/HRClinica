const formulario = document.querySelector('form');

contrasenia.addEventListener('submit', (e)=>{
    e.preventDefault();

    const contrasenia = document.getElementById('contrasenia');
    
    const pattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}/;

    if(pater.test(contrasenia.value)){
        alert('exacto');
    }else{
        alert('incorrecto');
    }
})