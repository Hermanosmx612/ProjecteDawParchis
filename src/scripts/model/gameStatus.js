import { Player } from "./Player.js";
import { Board } from "./Board.js";
import { aleatoriNumber, changeStatusToken, knowPosiTokens, encontrarElementosRepetidos, compPuente } from "../gameLogic.js";
import { mostrarDado } from "../view.js";
import { manejarClicEnFicha } from "../handleEvents.js";
import { GameView } from "./GameView.js";

export class GameStatus {
  constructor() {
    this.tablero = new Board();
    this.players = [
      new Player("Alex", "azul", 22, 17),
      new Player("Bot1", "rojo", 39, 34),
      new Player("Bot2", "verde", 56, 51),
      new Player("Bot3", "amarillo", 5, 68),
    ];
    this.turno = 0;
    this.dados = 0;
    this.estado = "en_curso";
    this.numeroTirada = 0;
    this.seguros = [5, 12, 17, 22, 29, 34, 39, 46, 51, 56, 63, 68];

    this.posiToDelete = 0;
    this.sixInRow = 0;
  }

  tirarDados() {
    let number = aleatoriNumber();
    this.dados = number;
    mostrarDado(number);
  }

  getHouseCard(colourToken, numSalida) {
    for (let i = 0; i < this.tablero.length; i++) {
      if (i === numSalida) {
        this.tablero[i].fichas.push({
          color: colourToken,
          numCasilla: numSalida,
        });
      }
    }
    let actualPlayer = this.players[this.turno];
    for (const p of actualPlayer.fichas) {
      if (p.estado === "fuera_del_tablero") {
        console.log("DENTROOOO DEL TABLEROOOOO")
        p.estado = "dentro_del_tablero";
        break;
      }
    }
  }

  actualizarTurno() {
    if (this.numeroTirada !== 0) {
      this.turno = (this.turno + 1) % 4;
    } else {
      this.numeroTirada += 1;
    }
    this.sixInRow = 0
    this.posiToDelete = 0;
  }

  agregarEventosDeClicFichas(game,gameView) {
    let jugadorActual = this.players[this.turno];
    const fichasNuevas = document.querySelectorAll(
      "." + jugadorActual.colorFichas + ".fueraCasa"
    );
    let count = 0; // Contador para saber si se le a añadido algun Listener
    fichasNuevas.forEach(function (ficha) {
      console.log(jugadorActual.colorFichas);
      console.log(ficha.classList[0]);
      if (jugadorActual.colorFichas === ficha.classList[0]) {
        ficha.removeEventListener("click", manejarClicEnFicha);
          let posiTokens = knowPosiTokens(game);
          let repeatedElements = encontrarElementosRepetidos(posiTokens);
          if((game.dados === 6 || game.dados === 7) && repeatedElements.length !== 0){
            let posicionNumeros = parseInt(ficha.classList[2].replace(/[^0-9]/g, ""));
            let compSiPuente = compPuente(posicionNumeros, posicionNumeros + game.dados, game);
            if(repeatedElements.includes(posicionNumeros) && compSiPuente){ // Si el numero ese esta en un puente y ademas puede tirar
              count ++;
              ficha.addEventListener("click", function () {
                manejarClicEnFicha(game, ficha.classList[2],gameView);
              });
            }
          }else{
            count ++;
            ficha.addEventListener("click", function () {
              manejarClicEnFicha(game, ficha.classList[2],gameView);
              return;
            });
          }
        
      }
    });
    fichasNuevas.forEach(function (ficha) {
      ficha.removeEventListener("click", manejarClicEnFicha); // Funcion por si al count no se le ha sumado es decir que hay un puente pero no se puede tirar
      if(count === 0){
        ficha.addEventListener("click", function () {
          manejarClicEnFicha(game, ficha.classList[2],gameView);
        });
      }
    });
  }

  borrarFichaTablero(posicionBorrar) {
    console.log("Entra a la funcion de borrar")
    let actualPlayer = this.players[this.turno];
    for (const tablero of this.tablero) {
      if (tablero.numero - 1 === posicionBorrar) {
        const index = tablero.fichas.findIndex(
          (ficha) =>
            ficha.color === actualPlayer.colorFichas &&
            ficha.numCasilla === posicionBorrar
        );
        if (index !== -1) {
          tablero.fichas.splice(index, 1);
          console.log("Ficha borrada");
          break; // Puedes salir del bucle si ya encontraste y eliminaste la ficha
        } else {
          console.log("ficha no encontarda");
        }
      }
    }
  }

  moverFichaTablero(posiAdvance) {
    let jugadorActual = this.players[this.turno];
    for (let i = 0; i < this.tablero.length; i++) {
      if (i === posiAdvance) {
        this.tablero[i].fichas.push({
          color: jugadorActual.colorFichas,
          numCasilla: posiAdvance,
        });
      }
    }
  }

  determinToDeleteSixRow(){
    let actualPlayer = this.players[this.turno];
    if((this.dados === 6 || this.dados === 7 )&& this.sixInRow === 2){
      for (const tablero of this.tablero) {
      const index = tablero.fichas.findIndex(
        (ficha) =>
          ficha.color === actualPlayer.colorFichas &&
          ficha.numCasilla === this.posiToDelete
      );
      if (index !== -1) {
        tablero.fichas.splice(index, 1);
        console.log("Borrada por 3 seguidas la ficha con la posicion: "+this.posiToDelete);
        changeStatusToken(this);
        return false;
      } else {
        console.log("ficha no encontarda");
      }
    }
    }
    return true;
  }

  removeLastToken(posiToRemove, originalColour){
    for(let i = 0; i < this.tablero.length; i++){
      let fichas = this.tablero[i].fichas;
      for(let j = fichas.length -1; j >= 0; j--){
        if(fichas[j].color !== originalColour && fichas[j].numCasilla === posiToRemove){
          let colorEliminado = fichas[j].color;
          fichas.splice(j,1);
          return colorEliminado;
        }
      }
    }
  }

  compIfKill(posiAdvance, game){
    console.log("HA ENTRADO EN LA FUNCION DE COMPROBAR SI MATA")
    let actualPlayer = this.players[this.turno];
    for(const tablero of game.tablero){
      for(const token of tablero.fichas){
        const segurosArray = game.seguros;
        if(token.numCasilla === posiAdvance){ // && !segurosArray.includes(posiAdvance)
          if (tablero.fichas.length === 1 && token.color !== actualPlayer.colorFichas) {
            return true;
          }
        }
      }
    }
    return false;
  }


  compIfWin(game){
    let actualPlayer = game.players[game.turno];
    let count = 0;
  for (let i = 0; i < actualPlayer.fichas.length; i++) {
    let fichas = actualPlayer.fichas[i];
    if (fichas.estado === "fuera_del_tablero_win") {
      count ++;
    }
    if(count === 4){
      alert("Ha ganado el jugador "+actualPlayer.colorFichas)
    }
  }
  }

  
  
}
