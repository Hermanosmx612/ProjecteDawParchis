import { loginForm } from "./views/login.js";
import { registerForm } from "./views/register.js";
import { tablero } from "./views/templateTablero.js";
import { putTokens } from "./initiation.js";

export function route(ruta) {
    // let params = ruta.split('?')[1];
    // params = params ? new Map(params.split('&').map((param) => {
    //   const paramArray = param.split('=');
    //   return [paramArray[0], paramArray[1]];
    // })) : new Map();
    // console.log(params);
    // ruta = ruta.split('?')[0];
    const main = document.querySelector('#container');
  
    switch (ruta) {
      case '#/':
        main.innerHTML = '';
        main.append(loginForm());
        break;
      case '#/login':
        main.innerHTML = '';
        main.append(loginForm());
        break;
      case '#/game':
        main.innerHTML = '';
        //if (params.get('id')) {
        //  generateGame(params.get('id')).then((divs) => main.append(...divs));
        //} else if (localStorage.getItem('gameId')) {
        //  window.location.hash = `#/game?id=${localStorage.getItem('gameId')}`;
        //} else {
        main.append(tablero())
        putTokens();
        var body = document.body;
        body.style.backgroundColor = 'white';
        //}
        break;
      case '#/allgames':
        main.innerHTML = '';
        main.append(generateGameList());
        break;
      case '#/register':
        main.innerHTML = '';
        main.append(registerForm());
        break;
      case '#/logout':
        logout();
        window.location.hash = '#/';
        break;
      case '#/profile':
        main.innerHTML = '';
        main.append(profileForm());
        break;
      case '':
        window.location.hash = '#/';
        break;
      default:
        window.location.hash = '#/';
    }
  }