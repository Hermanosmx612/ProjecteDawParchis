import {
  checkPuedeSalir,
  compPuente,
  compIfAllBlocked,
  killBoardToken,
  changeStatusToken,
  changeStatusTokenWithColor,
  knowWhereBridge,
  knowBridgeMultiColour,
} from "./gameLogic.js";
import { habilitarBoton, deshabilitarBoton } from "./view.js";
import { updateGameState, getIdGame, readGameState} from "./services/http.js";
export function manejarClickBoton(game, gameView) {

  deshabilitarBoton();
  if (game.dados !== 6) {
    // Cuando sea un 6 repetira la tirada
    game.actualizarTurno(); // Llama a la funcion actualizar turno del GameStatus
  }
  game.tirarDados(); // Llama a la funcion de la clase Tirar Dados
  let jugadorActual = game.players[game.turno];

  let fichaAMover = jugadorActual.fichas.find(
    (ficha) => ficha.estado === "fuera_del_tablero"
  );
  let fichaAMover2 = jugadorActual.fichas.find(
    (ficha) => ficha.estado !== "fuera_del_tablero"
  );

  if (game.dados === 6 && fichaAMover === undefined) {
    game.dados = 7;
  }



  //Actualizar el gameStatus de supabase
  updateGameState(game, getIdGame())
  console.log(readGameState(getIdGame()))
 

  if (game.determinToDeleteSixRow()) {
    if (game.dados === 5 && fichaAMover !== undefined) {
      // Si el dado es 5 y hay fichas en su casa
      let result = checkPuedeSalir(jugadorActual.colorFichas,jugadorActual.salida,game,gameView);
      console.log("El resultado es: "+result)
      if (result === true) { // Saber si puede salir
        //console.log("Si que puede salir");
        game.getHouseCard(jugadorActual.colorFichas, jugadorActual.salida);
        gameView.removeHouseToken(jugadorActual.colorFichas);
        gameView.removeTokensBoard(game);
        gameView.drawTokensBoard(game);
      } else if(result === "FichaMuerta"){
        console.log("Ha matado una ficha saliendo de csasa")
        game.getHouseCard(jugadorActual.colorFichas, jugadorActual.salida);
        gameView.removeHouseToken(jugadorActual.colorFichas);
        gameView.removeTokensBoard(game);
        gameView.drawTokensBoard(game);
        addEventToCount20(game,gameView);
      }else {
        game.agregarEventosDeClicFichas(game, gameView);
      }
    } else if (fichaAMover2 !== undefined) {
      game.agregarEventosDeClicFichas(game, gameView);
    } else {
      habilitarBoton();
    }
  } else {
    game.dados = 0;
    gameView.drawTokenHouse(game, jugadorActual.colorFichas);
    gameView.removeTokensBoard(game);
    gameView.drawTokensBoard(game);
    habilitarBoton();
  }
}

export function manejarClicEnFicha(game, posicionConLetras, gameView) {
  let actualPlayer = game.players[game.turno];
  let posicionNumeros = parseInt(posicionConLetras.replace(/[^0-9]/g, ""));
  let posiAdvance = game.dados + posicionNumeros;
  let posiAdvanceSinRestar = game.dados + posicionNumeros;
  if (posiAdvance > 68) {
    posiAdvance = posiAdvance - 68;
  }
  if (posiAdvance === 0) {
    posiAdvance = 1;
  }

  let canMove = compPuente(posicionNumeros, posiAdvance, game);
  console.log(canMove);
  if (canMove) {
    if (game.compIfKill(posiAdvance, game)) {
      if (
        posicionNumeros <= actualPlayer.limite &&
        posiAdvanceSinRestar >= actualPlayer.limite
      ) {
        console.log("Su casa ya ha pasado");
        game.moverFichaTablero(actualPlayer.limite);
        game.borrarFichaTablero(posicionNumeros);
      } else {
        let colourDel = killBoardToken(posiAdvance, game);
        changeStatusTokenWithColor(game, colourDel);
        gameView.drawTokenHouse(game, colourDel);
        game.moverFichaTablero(posiAdvance);
        game.borrarFichaTablero(posicionNumeros);
        gameView.removeTokensBoard();
        gameView.drawTokensBoard();
        addEventToCount20(game, gameView);
      }
    } else {
      if (
        posicionNumeros < actualPlayer.limite &&
        posiAdvanceSinRestar >= actualPlayer.limite
      ) {
        console.log("Su casa ya ha pasado");
        game.moverFichaTablero(actualPlayer.limite);
        game.borrarFichaTablero(posicionNumeros);
      } else {
        console.log("Esta en juego");
        game.moverFichaTablero(posiAdvance);
        game.borrarFichaTablero(posicionNumeros);
      }
      gameView.removeTokensBoard();
      gameView.drawTokensBoard();
    }
    if (game.dados === 7 || game.dados === 6) {
      game.dados = 6;
      game.sixInRow += 1;
      game.posiToDelete = posiAdvance;
    }
  } else {
    if (!compIfAllBlocked(game)) {
      console.log("TODAS BLOQUEADAS");
      game.sixInRow = 0;
      game.dados = 0;
      habilitarBoton();
    }
  }
}

export function addEventToCount20(game, gameView) {
  let actualPlayer = game.players[game.turno];
  deshabilitarBoton();
  const fichasNuevas = document.querySelectorAll(
    "." + actualPlayer.colorFichas + ".fueraCasa"
  );
  fichasNuevas.forEach((ficha) => {
    //ficha.removeEventListener("click")
    ficha.addEventListener("click", function (event) {
      manejarCount20(game, ficha.classList[2], gameView);
    });
  });
}

function manejarCount20(game, posiActual, gameView) {
  let actualPlayer = game.players[game.turno];
  let posiActualOnlyNum = parseInt(posiActual.replace(/[^0-9]/g, ""));
  //let actualPlayer = game.players[game.turno];
  let posiAvanzar = 0;
  let posiAdvanceSinRestar = 20 + posiActualOnlyNum;
  if (posiActualOnlyNum + 20 > 68) {
    posiAvanzar = posiActualOnlyNum + 20 - 68;
  } else {
    posiAvanzar = posiActualOnlyNum + 20;
  }
  let canMove = compPuente(posiActualOnlyNum, posiAvanzar, game);
  let posiBridge = knowWhereBridge(game, posiActualOnlyNum + 1, posiAvanzar); // Saber en que posicion esta el puente
  let compPuenteMultiColour = knowBridgeMultiColour(posiBridge - 1, game); // Saber si detras del puente existe algun puente multicolor

  if (canMove) {
    if (game.compIfKill(compPuenteMultiColour, game)) {
      if (posiActualOnlyNum <= actualPlayer.limite && posiAdvanceSinRestar >= actualPlayer.limite) {
        console.log("Su casa ya ha pasado");
        game.moverFichaTablero(actualPlayer.limite);
        game.borrarFichaTablero(posiActualOnlyNum);
      } else {
        let colourDel = killBoardToken(posiAvanzar, game);
        changeStatusTokenWithColor(game, colourDel);
        gameView.drawTokenHouse(game, colourDel);
        game.moverFichaTablero(compPuenteMultiColour);
        game.borrarFichaTablero(posiActualOnlyNum);
        gameView.removeTokensBoard();
        gameView.drawTokensBoard();
        addEventToCount20(game, gameView);
      }
    } else {
      if (posiActualOnlyNum <= actualPlayer.limite && posiAdvanceSinRestar >= actualPlayer.limite) {
        console.log("Su casa ya ha pasado");
        game.moverFichaTablero(actualPlayer.limite);
        game.borrarFichaTablero(posiActualOnlyNum);
      }else{
        game.borrarFichaTablero(posiActualOnlyNum);
        game.moverFichaTablero(posiAvanzar);
        gameView.removeTokensBoard();
        gameView.drawTokensBoard();
      }
      
    }
  } else {
    if (game.compIfKill(compPuenteMultiColour, game)) {
      if (posiActualOnlyNum <= actualPlayer.limite && posiAdvanceSinRestar >= actualPlayer.limite) {
        console.log("Su casa ya ha pasado");
        game.moverFichaTablero(actualPlayer.limite);
        game.borrarFichaTablero(posiActualOnlyNum);
      }else{
        let colourDel = killBoardToken(posiAvanzar, game);
        changeStatusTokenWithColor(game, colourDel);
        gameView.drawTokenHouse(game, colourDel);
        game.moverFichaTablero(compPuenteMultiColour);
        game.borrarFichaTablero(posiActualOnlyNum);
        gameView.removeTokensBoard();
        gameView.drawTokensBoard();
        addEventToCount20(game, gameView);
      }
      
    } else {
      if (posiActualOnlyNum <= actualPlayer.limite && posiAdvanceSinRestar >= actualPlayer.limite) {
        console.log("Su casa ya ha pasado");
        game.moverFichaTablero(actualPlayer.limite);
        game.borrarFichaTablero(posiActualOnlyNum);
      }else{
        game.borrarFichaTablero(posiActualOnlyNum);
        game.moverFichaTablero(posiBridge - 1);
        gameView.removeTokensBoard();
        gameView.drawTokensBoard();
      }
      
    }
  }
}
