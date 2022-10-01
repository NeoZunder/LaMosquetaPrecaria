const mensaje = document.getElementById("Mensaje");
const saldo = document.getElementById("Saldo");
const btnApuesta = document.getElementById("btnApuesta");
const moduloCopas = document.getElementById("seleccionarCopa");
const moduloApuesta = document.getElementById("Apuesta");

let racha = 0;
let saldoUsuario = 2000;
let apuestaUsuario;

document.addEventListener("DOMContentLoaded", () => {
  saldo.textContent = `${saldoUsuario}`;
  moduloCopas.style.visibility = "hidden";
});

function seleccionComputadora() {
  let sComputadora = Math.floor(Math.random() * 3) + 1;
  console.log(sComputadora);
  return sComputadora;
}

function seleccionarCopa(SeleccionUsuario) {
  if (apuestaUsuario === undefined) {
    return alert("Haga una apuesta antes de elegir copa!!!!!!");
  }
  let seleccionPC = seleccionComputadora();
  esconderApuesta();

  if (racha < 3) {
    if (SeleccionUsuario === seleccionPC) {
      escoderPelotitas();
      mostrarPelotita(seleccionPC);
      console.log(
        `Usuario copa: ${SeleccionUsuario} Computadora copa: ${seleccionPC}`
      );
      quitarAgregarSaldo(true, apuestaUsuario);
    } else {
      escoderPelotitas();
      mostrarPelotita(seleccionPC);
      console.log(
        `Usuario copa: ${SeleccionUsuario} Computadora copa: ${seleccionPC}`
      );
      quitarAgregarSaldo(false, apuestaUsuario);
    }
  } else {
    console.log("Perdiste por racha de victorias");
    if (SeleccionUsuario === 1 || SeleccionUsuario === 2) {
      console.log(
        `Usuario copa: ${SeleccionUsuario} Computadora copa: ${seleccionPC + 1}`
      );
      escoderPelotitas();
      mostrarPelotita(seleccionPC);
      quitarAgregarSaldo(false, apuestaUsuario);
    } else {
      console.log(
        `Usuario copa: ${SeleccionUsuario} Computadora copa: ${seleccionPC - 1}`
      );
      quitarAgregarSaldo(false, apuestaUsuario);
    }
  }
}

function guardarApuesta(apuesta) {
  if (apuesta > 0 && saldoUsuario - apuesta >= 0) {
    apuestaUsuario = parseInt(apuesta);
    esconderApuesta();
  } else {
    alert("Debe Ingresar apuesta de acuerdo a su saldo");
  }
}

btnApuesta.addEventListener("click", (e) =>
  guardarApuesta(document.getElementById("inputApuesta").value)
);

function quitarAgregarSaldo(bool, apuesta) {
  if (bool) {
    //Ganar
    mensaje.textContent = "";
    mensaje.textContent = "GANASTE";
    mensaje.style.color = "green";
    saldo.textContent = "";
    saldoUsuario += apuesta;
    saldo.textContent = `${saldoUsuario}`;
    racha++;
  } else {
    //Perder
    mensaje.textContent = "";
    mensaje.textContent = "PERDISTE";
    mensaje.style.color = "red";
    saldo.textContent = "";
    saldoUsuario -= apuesta;
    saldo.textContent = `${saldoUsuario}`;
    racha = 0;
    if (saldoUsuario === 0) {
      setTimeout(() => {
        mensaje.textContent = "SALDO INSUFICIENTE";
        mensaje.style.color = "red";
      }, 3000);
    }
  }
}

function mostrarPelotita(seleccionPC) {
  let posPelotita = `Pelota${seleccionPC}`; //Copa1 || Copa2 || Copa3
  console.log(posPelotita);
  document.getElementById(`${posPelotita}`).style.visibility = "visible";
}

function escoderPelotitas() {
  let posicionPelotitas = document.querySelectorAll(".Pelota");
  posicionPelotitas.forEach((posPelotita) => {
    posPelotita.style.visibility = "hidden";
  });
}

function esconderApuesta() {
  if (moduloApuesta.style.visibility === "hidden") {
    moduloCopas.style.visibility = "hidden";
    moduloApuesta.style.visibility = "visible";
    setTimeout(() => {
      escoderPelotitas();
    }, 1500);
  } else {
    moduloCopas.style.visibility = "visible";
    moduloApuesta.style.visibility = "hidden";
  }
}
