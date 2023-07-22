export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    console.log(input.parentElement);
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMisMatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío.",
    },
    email: {
        valueMissing: "Este campo no puede estar vacío.",
        typeMisMatch: "El correo no es válido",
    },
    password: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "Mínimo 8 caracteres, al menos 1 letra y 1 numero.",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío.",
        customError: "Debes de tener al menos 18 años de edad.",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El formato requerido es de XXXXXXXXXX 10 números.",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "La dirección debe de contener entre 10 a 40 caracteres."
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "La ciudad debe de contener entre 4 a 20 caracteres."
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El estado debe de contener entre 4 a 20 caracteres."
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

/*
const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);
});*/

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
        
    } );
    return mensaje;
} 


function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}