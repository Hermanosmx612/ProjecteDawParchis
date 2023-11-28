import { capitalizeFirstLetter } from "./gameLogic.js";

export function deshabilitarBoton() {
  //console.log("Boton deshabilitado");
  let buttonThrow = document.getElementById("buttonThrow");
  buttonThrow.disabled = true;
}

export function habilitarBoton() {
  let buttonThrow = document.getElementById("buttonThrow");
  buttonThrow.disabled = false;
}

export function mostrarDado(number) {
  let imageCube = document.getElementById("cubeImage");
  imageCube.style.display = "block";
  imageCube.src = "images/" + number + ".png";
}






