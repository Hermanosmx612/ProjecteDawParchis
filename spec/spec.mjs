import { changePlayerTokenStatus, changeStateToTokenWin, knowBridgeMultiColour,KnowWhereBridgeFinalBigInit, knowWhereBridge, capitalizeFirstLetter, compPuenteInitMoreFin, compPuente, encontrarElementosRepetidos,changeStatusToken, changeStatusTokenWithColor, killBoardToken } from "../src/scripts/gameLogic.js";
import { GameStatus } from "../src/scripts/model/gameStatus.js";
import { createTable } from "../src/scripts/initiation.js";

let gameBase = new GameStatus();
gameBase.tablero = createTable();
gameBase.dados = 5;


it('should return a string with the first letter capitalized when given a string', function() {
    expect(capitalizeFirstLetter('hello')).toEqual('Hello');
    expect(capitalizeFirstLetter('world')).toEqual('World');
    expect(capitalizeFirstLetter('')).toEqual('');
  });

it('Comprobacion si de un puente pero la ficha parte desde un numero mayor al que acabara', function() {
    let gameMod = structuredClone(gameBase)
    gameMod.tablero[3].fichas.push({"color": "amarillo" , "numCasilla" : 3})
    gameMod.tablero[3].fichas.push({"color": "amarillo" , "numCasilla" : 3})
    console.log(gameMod)
    expect(compPuenteInitMoreFin(66,4,gameMod)).toBe(false)
    expect(compPuenteInitMoreFin(66,1,gameMod)).toBe(true)
});

it('Comprobacion si de un puente', function() {
    let gameMod = structuredClone(gameBase)
    gameMod.tablero[4].fichas.push({"color": "amarillo" , "numCasilla" : 4})
    gameMod.tablero[4].fichas.push({"color": "amarillo" , "numCasilla" : 4})
    console.log(gameMod)
    expect(compPuente(1,4,gameMod)).toBe(false)
    expect(compPuente(1,3,gameMod)).toBe(true)
});

it('should return an array with repeated elements when given an array with at least one repeated element', function() {
    const arr = [1, 2, 3, 4, 5, 2];
    const result = encontrarElementosRepetidos(arr);
    expect(result).toEqual([2]);
});
it('Change Status Token', function() {
  let gameMod = structuredClone(gameBase)
  gameMod.players[0].fichas[0].estado = "dentro_del_tablero"
  changeStatusToken(gameMod);
  expect(gameMod.players[0].fichas[0].estado).toBe("fuera_del_tablero");
});

it('Change Status Token with color', function() {
  let gameMod = structuredClone(gameBase)
  gameMod.players[0].fichas[0].estado = "dentro_del_tablero";
  changeStatusTokenWithColor(gameMod, "azul");
  expect(gameMod.players[0].fichas[0].estado).toBe("fuera_del_tablero");
  gameMod.players[1].fichas[0].estado = "dentro_del_tablero";
  changeStatusTokenWithColor(gameMod, "rojo");
  expect(gameMod.players[1].fichas[0].estado).toBe("fuera_del_tablero");
});


it('Kill Token', function() {
  let gameMod = structuredClone(gameBase)
  gameMod.tablero[3].fichas.push({"color": "amarillo" , "numCasilla" : 3})
  expect(killBoardToken(3,gameMod)).toBe("amarillo")
  expect(killBoardToken(4,gameMod)).toBe("")

});

it('Conocer donde se encuentra el puente o si no', function() {
  let gameMod = structuredClone(gameBase)
  gameMod.tablero[10].fichas.push({"color": "amarillo" , "numCasilla" : 10})
  gameMod.tablero[10].fichas.push({"color": "amarillo" , "numCasilla" : 10})
  expect(knowWhereBridge(gameMod,6,11)).toBe(10)
  expect(knowWhereBridge(gameMod,4,10)).toBe(10)
  expect(knowWhereBridge(gameMod,4,9)).toBe(0)

});

it('Conocer donde se encuentra el puente o si no, pero la posicion Inicial es mas grande que la final', function() {
  let gameMod = structuredClone(gameBase)
  gameMod.tablero[2].fichas.push({"color": "azul" , "numCasilla" : 2})
  gameMod.tablero[2].fichas.push({"color": "azul" , "numCasilla" : 2})
  expect(KnowWhereBridgeFinalBigInit(66,3,gameMod)).toBe(2)
  expect(KnowWhereBridgeFinalBigInit(66,2,gameMod)).toBe(2)
  expect(KnowWhereBridgeFinalBigInit(65,1,gameMod)).toBe(0)

});


it('Saber donde esta el puente multicolor', function() {
  let gameMod = structuredClone(gameBase)
  gameMod.tablero[5].fichas.push({"color": "azul" , "numCasilla" : 5})
  gameMod.tablero[5].fichas.push({"color": "rojo" , "numCasilla" : 5})
  gameMod.tablero[6].fichas.push({"color": "rojo" , "numCasilla" : 6})
  expect(knowBridgeMultiColour(5,gameMod)).toBe(4)
  expect(knowBridgeMultiColour(6,gameMod)).toBe(6)
});

it('Saber posicion del puente', function() {
  let gameMod = structuredClone(gameBase)
  gameMod.tablero[5].fichas.push({"color": "azul" , "numCasilla" : 5})
  gameMod.tablero[5].fichas.push({"color": "rojo" , "numCasilla" : 5})
  gameMod.tablero[6].fichas.push({"color": "rojo" , "numCasilla" : 6})
  expect(knowBridgeMultiColour(5,gameMod)).toBe(4)
  expect(knowBridgeMultiColour(6,gameMod)).toBe(6)
});

it('Borarr ficha del tablero', function() {
  let gameMod = structuredClone(gameBase)
  gameMod.tablero[5].fichas.push({"color": "azul" , "numCasilla" : 5})
  gameMod.tablero[9].fichas.push({"color": "amarillo" , "numCasilla" : 9})
  expect(changeStateToTokenWin(gameMod,5,"azul")).toBe(true)
  expect(changeStateToTokenWin(gameMod,6,"azul")).toBe(false)
  expect(changeStateToTokenWin(gameMod,9,"amarillo")).toBe(true)
});


it('Cambiar status a win de la ficha', function() {
  let gameMod = structuredClone(gameBase)
  gameMod.players[0].fichas[0].estado = "dentro_del_tablero"
  gameMod.players[0].fichas[1].estado = "dentro_del_tablero"
  gameMod.players[1].fichas[0].estado = "dentro_del_tablero"
  changePlayerTokenStatus(gameMod)
  expect(gameMod.players[0].fichas[0].estado).toBe("fuera_del_tablero_win");
  expect(gameMod.players[0].fichas[1].estado).toBe("dentro_del_tablero");
  gameMod.turno = 1;
  changePlayerTokenStatus(gameMod)
  expect(gameMod.players[1].fichas[0].estado).toBe("fuera_del_tablero_win");


});









