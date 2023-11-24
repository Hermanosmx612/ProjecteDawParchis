import { GameStatus } from "./model/gameStatus.js";
import { putTokens, createTable } from "./initiation.js";
import { manejarClickBoton } from "./handleEvents.js";
import { GameView } from "./model/GameView.js";
import { createGameState, getIdGame} from "./services/http.js";
import { route } from "./routers.js";

document.addEventListener("DOMContentLoaded", () => {
  route(window.location.hash);
  window.addEventListener('hashchange', () => {
    route(window.location.hash);
  });


  //let trowButton = document.getElementById("buttonThrow");
  //let game = new GameStatus();
  //game.tablero = createTable();
  //putTokens();
  //let gameView = new GameView(game);
  //console.log(game.turno);

  // trowButton.addEventListener("click", () => {
  //   manejarClickBoton(game,gameView);
  // }); 
  //createGameState(SUPABASE_KEY, game)
  //console.log(getIdGame())

  //let prueba = document.getElementById("prueba");
  // prueba.addEventListener("click", () => {
  //   let jugadorActual = game.players[game.turno];

  //   for(const player of jugadorActual.fichas){
  //     console.log(player.estado);
  //   }
 /*    for (let jugador of game.tablero) {
      for (let ficha of jugador.fichas) {
        if (jugador.fichas.length >= 1) {
          console.log(
            "NUMFICHA:: " + ficha.numCasilla + "  COLOR:: " + ficha.color
          );
        }
      }
    } */
  //}); 
});
