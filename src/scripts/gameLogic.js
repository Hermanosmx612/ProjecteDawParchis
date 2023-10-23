import { mostrarDado } from "./view.js";

export function aleatoriNumber() {
  // let result = Math.ceil(Math.random() * 6);
  // return result;
  let numeroAleatorio = Math.floor(Math.random() * 2) + 5;
  //let numeroAleatorio = 5;
  return numeroAleatorio;
}

export function checkPuedeSalir(colourToken, numSalida, game, gameView) {
  for (let i = 0; i < game.tablero.length; i++) {
    if (i === numSalida) {
      let fichas = game.tablero[i].fichas;
      for (let j = 0; j < fichas.length; j++) {
        if (fichas.length >= 2) {
          if (fichas[j].color === fichas[j + 1].color) {
            //console.log("Entra al false");
            return false;
          } else if (
            fichas[j].color !== colourToken ||
            fichas[j + 1] !== colourToken
          ) {
            let diffColour = game.removeLastToken(numSalida, colourToken);
            changeStatusTokenWithColor(game, diffColour);
            gameView.drawTokenHouse(game, diffColour);
            return true;
          }
        }
      }
    }
  }
  return true;
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function compPuenteInitMoreFin(posiInitial, posiFinal, game) {
  for (let i = 1; i <= posiFinal; i++) {
    let fichas = game.tablero[i].fichas;
    for (let j = 0; j < fichas.length; j++) {
      if (fichas.length >= 2) {
        if (fichas[j].color === fichas[j + 1].color) {
          return false;
        }
      }
    }
  }

  for (let i = posiInitial; i < 68; i++) {
    let fichas = game.tablero[i].fichas;
    for (let j = 0; j < fichas.length; j++) {
      if (fichas.length >= 2) {
        if (fichas[j].color === fichas[j + 1].color) {
          return false;
        }
      }
    }
  }
  return true;
}

export function compPuente(posiInitial, posiFinal, game) {
  if (posiFinal < posiInitial) {
    return compPuenteInitMoreFin(posiInitial, posiFinal, game);
  } else {
    for (let i = 0; i < game.tablero.length; i++) {
      let fichas = game.tablero[i].fichas;
      for (let j = 0; j < fichas.length; j++) {
        if (i > posiInitial && i <= posiFinal) {
          if (fichas.length >= 2) {
            if (fichas[j].color === fichas[j + 1].color) {
              return false;
            }
            if (i === posiFinal) {
              return false;
            }
          }
        }
      }
    }
  }
  return true;
}

export function knowPosiTokens(game) {
  let actualPlayer = game.players[game.turno];
  let posiTokens = [];
  for (const tablero of game.tablero) {
    for (const casilla of tablero.fichas) {
      if (casilla.color === actualPlayer.colorFichas) {
        posiTokens.push(casilla.numCasilla);
      }
    }
  }
  return posiTokens;
}

export function encontrarElementosRepetidos(arr) {
  return arr.filter((elemento, indice) => arr.indexOf(elemento) !== indice);
}

export function compIfAllBlocked(game) {
  let comprobaciones = [];
  let posiTokens = [];
  let posiToArriveTokens = [];
  posiTokens = knowPosiTokens(game);

  for (let i = 0; i < posiTokens.length; i++) {
    console.log("Entra a ponerToArriveTokens");
    if (posiTokens[i] + game.dados > 68) {
      posiToArriveTokens.push((posiTokens[i] + game.dados) - 68);
    } else {
      posiToArriveTokens.push(posiTokens[i] + game.dados);
    }
  }

  for (let i = 0; i < posiTokens.length; i++) {
    comprobaciones.push(compPuente(posiTokens[i], posiToArriveTokens[i], game));
    let todosSonFalse = comprobaciones.every(function (valor) {
      return valor === false;
    });

    // Verificar el resultado
    if (todosSonFalse) {
      return false;
    } else {
      return true;
    }
  }
}

export function changeStatusToken(game) {
  let actualPlayer = game.players[game.turno];
  for (let i = 0; i < actualPlayer.fichas.length; i++) {
    let fichas = actualPlayer.fichas[i];
    if (fichas.estado === "dentro_del_tablero") {
      fichas.estado = "fuera_del_tablero";
      break;
    }
  }
}

export function changeStatusTokenWithColor(game, colourToChange) {
  let turno = 0;
  switch (colourToChange) {
    case "azul":
      turno = 0;
      break;
    case "rojo":
      turno = 1;
      break;
    case "verde":
      turno = 2;
      break;
    case "amarillo":
      turno = 3;
      break;
  }
  console.log("CAMBIAAAAA AA FUERA DEL TABLEROOOOOO");
  let playerColourDel = game.players[turno];
  for (let i = 0; i < playerColourDel.fichas.length; i++) {
    let fichas = playerColourDel.fichas[i];
    if (fichas.estado === "dentro_del_tablero") {
      fichas.estado = "fuera_del_tablero";
      break;
    }
  }
}

export function killBoardToken(posiAdvance, game) {
  let actualPlayer = game.players[game.turno];
  for (const tablero of game.tablero) {
    for (const token of tablero.fichas) {
      if (token.numCasilla === posiAdvance) {
        if (
          tablero.fichas.length === 1 &&
          token.color !== actualPlayer.colorFichas
        ) {
          let colourDelToken = token.color;
          let index = tablero.fichas.indexOf(token);
          if (index !== -1) {
            tablero.fichas.splice(index, 1);
          }
          return colourDelToken;
        }
      }
    }
  }
  return "";



  
}
