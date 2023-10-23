import {
  checkPuedeSalir,
  compPuente,
  compIfAllBlocked,
  killBoardToken,
  changeStatusToken,
  changeStatusTokenWithColor,
} from "./gameLogic.js";
import { habilitarBoton, deshabilitarBoton } from "./view.js";

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

  if (game.determinToDeleteSixRow()) {
    if (game.dados === 5 && fichaAMover !== undefined) {
      // Si el dado es 5 y hay fichas en su casa

      if (
        checkPuedeSalir(
          jugadorActual.colorFichas,
          jugadorActual.salida,
          game,
          gameView
        )
      ) {
        //console.log("Si que puede salir");
        game.getHouseCard(jugadorActual.colorFichas, jugadorActual.salida);
        gameView.removeHouseToken(jugadorActual.colorFichas);
        gameView.removeTokensBoard(game);
        gameView.drawTokensBoard(game);
      } else {
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
  let posicionNumeros = parseInt(posicionConLetras.replace(/[^0-9]/g, ""));
  let posiAdvance = game.dados + posicionNumeros;
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
      console.log("Entra a la funcion de matar")
      let colourDel = killBoardToken(posiAdvance, game);
      changeStatusTokenWithColor(game, colourDel);
      gameView.drawTokenHouse(game, colourDel);

    } else {      

      if (game.dados === 7 || game.dados === 6) {
        game.dados = 6;
        game.sixInRow += 1;
        game.posiToDelete = posiAdvance;
        console.log(game.sixInRow);
        console.log(game.posiToDelete);
      }

    }
    game.moverFichaTablero(posiAdvance);
    game.borrarFichaTablero(posicionNumeros);
    gameView.removeTokensBoard();
    gameView.drawTokensBoard();
  } else {
    if (!compIfAllBlocked(game)) {
      console.log("TODAS BLOQUEADAS");
      game.sixInRow = 0;
      game.dados = 0;
      habilitarBoton();
    }
  }
}
