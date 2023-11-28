import { capitalizeFirstLetter } from "../gameLogic.js";
import { habilitarBoton } from "../view.js";

export class GameView {
  constructor(gameStatus) {
    this.gameStatus = gameStatus;
  }

  removeHouseToken(colourToken) {
    let houseTokens = document.querySelector("." + colourToken + "Casa");
    let fichasCasa = houseTokens.children;
    for (let token of fichasCasa) {
      if (token.tagName === "BR") {
        token.remove;
      }
      if (token.tagName === "IMG") {
        token.remove();
        break;
      }
    }
  }

  removeTokensBoard(game) {
    let tokensOutHome = document.querySelectorAll(".fueraCasa");
    tokensOutHome.forEach((token) => {
      token.remove();
    });
    habilitarBoton();
  }

  drawTokensBoard() {
    for (let jugador of this.gameStatus.tablero) {
      for (let ficha of jugador.fichas) {
        let paraImagen = capitalizeFirstLetter(ficha.color);
        let fatherCont = document.getElementById(ficha.numCasilla);
        let newToken = document.createElement("img");
        newToken.className =
          ficha.color + " fueraCasa posicion" + ficha.numCasilla;
        //console.log(pepe.className)
        newToken.src = "images/ficha" + paraImagen + ".png";
        fatherCont.appendChild(newToken);
      }
    }
    habilitarBoton();
  }

  drawTokenHouse(game, colourToken) {
    //let actualPlayer = game.players[game.turno];
    let paraImagen = capitalizeFirstLetter(colourToken);
    let fatherDiv = document.querySelector("." + colourToken + "Casa");
    let primerHijo = fatherDiv.firstChild;
    let childToken = document.createElement("img");
    childToken.src = "images/ficha" + paraImagen + ".png";
    childToken.className = "fichas " + colourToken;
    fatherDiv.insertBefore(childToken, primerHijo);
  }

  /* drawTokenHouse(game){
    for (const player of game.players) {
      for (const ficha of player.fichas) {
        console.log(ficha.estado);
    }
  } */

  putTokensHouseWithGame(game) {
    let count = 0;
    for (const player of game.players) {
      count = 0;
      for (const ficha of player.fichas) {
        let homeTokens = document.querySelector(
          "." + player.colorFichas + "Casa"
        );
        if (ficha.estado === "fuera_del_tablero") {
          if (count === 2) {
            count = 0;
            let espacio = document.createElement("br");
            homeTokens.append(espacio);
          }
          let image = document.createElement("img");

          // Establecer los atributos del elemento de imagen
          image.src =
            "images/ficha" + capitalizeFirstLetter(player.colorFichas) + ".png";
          image.className = "fichas " + player.colorFichas;
          //image.alt = "Descripción de la imagen";

          // Agregar el elemento de imagen al elemento homeTokens
          homeTokens.appendChild(image);
          count++;
        }
      }
    }
  }

  removeImg() {
    let homeTokens = document.querySelectorAll("#home");
    for (const token of homeTokens) {
      while (token.firstChild) {
        token.removeChild(token.firstChild);
      }
    }
  }
}
