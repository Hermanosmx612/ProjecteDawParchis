import { loginForm } from "./views/login.js";
import { registerForm } from "./views/register.js";
import { tablero } from "./views/templateTablero.js";
import { putTokens } from "./initiation.js";
import { menu } from "./views/menu.js";
import { readGameState } from "./services/http.js";
import { GameView } from "./model/GameView.js";
import { getIdGame } from "./services/http.js";
import { GameStatus } from "./model/gameStatus.js";
import { logout } from "./services/users.js";
import { profileForm } from "./views/profile.js";

export async function route(ruta) {
  // let params = ruta.split('?')[1];
  // params = params ? new Map(params.split('&').map((param) => {
  //   const paramArray = param.split('=');
  //   return [paramArray[0], paramArray[1]];
  // })) : new Map();
  // console.log(params);
  // ruta = ruta.split('?')[0];
  const main = document.querySelector("#container");

  switch (ruta) {
    case "#/":
      main.innerHTML = "";
      main.append(loginForm());
      break;
    case "#/login":
      main.innerHTML = "";
      main.append(loginForm());
      break;
    case "#/game":
      main.innerHTML = "";
      console.log(localStorage.getItem("idPartidaActual"));
      if (localStorage.getItem("idPartidaActual")) {
        //console.log((await readGameState(getIdGame()))[0].partida)
        const gameStateObj = (await readGameState(getIdGame()))[0].partida;
        let gameState = new GameStatus();
        Object.assign(gameState, gameStateObj);
        let gameView = new GameView(gameState);
        main.append(menu());
        main.append(tablero(gameState));
        gameView.drawTokensBoard(gameState);
        gameView.removeImg();
        gameView.putTokensHouseWithGame(gameState)
      } else {
        main.append(menu());
        main.append(tablero());
        putTokens();
        document.body.style.backgroundColor = "white";
      }
      //if (params.get('id')) {
      //  generateGame(params.get('id')).then((divs) => main.append(...divs));
      //} else if (localStorage.getItem('gameId')) {
      //  window.location.hash = `#/game?id=${localStorage.getItem('gameId')}`;
      //} else {

      //}
      break;
    case "#/allgames":
      main.innerHTML = "";
      main.append(generateGameList());
      break;
    case "#/register":
      main.innerHTML = "";
      main.append(registerForm());
      break;
    case "#/logout":
      localStorage.clear();
      logout();
      window.location.hash = "#/";
      break;
    case "#/profile":
      console.log("Funcion de profile")
      main.innerHTML = "";
      main.append(profileForm());
      break;
    case "":
      window.location.hash = "#/";
      break;
    default:
      window.location.hash = "#/";
  }
}
