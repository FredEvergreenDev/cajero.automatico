let cuentas = [
    {nombre: "Ana", saldo: 200, contraseña: "Milaneso", historial: []},
    {nombre: "Diego", saldo: 500, contraseña: "Tigger", historial: []},
    {nombre: "Vico", saldo: 350, contraseña: "Devf", historial: []}
];

let cuentaActual;

document.addEventListener("DOMContentLoaded", function() {
    const cuentaNombre = localStorage.getItem("cuentaNombre");
    if (cuentaNombre) {
        cuentaActual = cuentas.find(cuenta => cuenta.nombre === cuentaNombre);
    }

    if (cuentaActual) {
        document.getElementById("consultar").addEventListener("click", consultarSaldo);
        document.getElementById("ingresar").addEventListener("click", mostrarIngreso);
        document.getElementById("retirar").addEventListener("click", mostrarRetiro);
        document.getElementById("cerrar").addEventListener("click", cerrarSesion);
    }
});

function login(event) {
    event.preventDefault();

    let usuario = document.getElementById("username").value;
    let contra = document.getElementById("password").value;
    let mensaje = document.getElementById("msj");
    let cuentaEncontrada = false;

    for (let i = 0; i < cuentas.length; i++) {
        if (usuario === cuentas[i].nombre && contra === cuentas[i].contraseña) {
            cuentaActual = cuentas[i];
            cuentaEncontrada = true;
            localStorage.setItem("cuentaNombre", cuentaActual.nombre);
            window.location.href = "banco.html";
            break;
        }
    }

    if (!cuentaEncontrada) {
        mensaje.innerText = "Error en usuario o contraseña.";
    }
}

function consultarSaldo() {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `<h3>Saldo actual: $${cuentaActual.saldo}</h3>`;
    mostrarHistorial();
}

function mostrarIngreso() {
    let monto = prompt("Ingresa el monto a depositar:");
    monto = parseFloat(monto);

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingresa un monto válido.");
        return;
    }

    if (cuentaActual.saldo + monto > 990) {
        alert("No puedes tener más de $990 en tu cuenta.");
        return;
    }

    cuentaActual.saldo += monto;
    registrarTransaccion(`Depósito de $${monto}`);
    consultarSaldo();
}

function mostrarRetiro() {
    let monto = prompt("Ingresa el monto a retirar:");
    monto = parseFloat(monto);

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingresa un monto válido.");
        return;
    }

    if (cuentaActual.saldo - monto < 10) {
        alert("No puedes tener menos de $10 en tu cuenta.");
        return;
    }

    cuentaActual.saldo -= monto;
    registrarTransaccion(`Retiro de $${monto}`);
    consultarSaldo();
}

function registrarTransaccion(tipo) {
    const ahora = new Date();
    const fechaHora = ahora.toLocaleString();
    cuentaActual.historial.push(`${tipo} - ${fechaHora}`);
}

function mostrarHistorial() {
    let historialDiv = document.getElementById("historial");
    let historial = cuentaActual.historial.join('<br>');
    historialDiv.innerHTML = `<h4>Historial de transacciones:</h4>${historial}`;
}

function cerrarSesion() {
    localStorage.removeItem("cuentaNombre");
    window.location.href = "index.html";
}
