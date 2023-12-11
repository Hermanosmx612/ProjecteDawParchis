import { capitalizeFirstLetter, compPuenteInitMoreFin, compPuente, encontrarElementosRepetidos } from "../src/scripts/gameLogic.js";
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
    gameMod.tablero[3].fichas.push({"color": "amarillo" , "numCasilla" : 4})
    gameMod.tablero[3].fichas.push({"color": "amarillo" , "numCasilla" : 4})
    console.log(gameMod)
    expect(compPuente(1,4,gameMod)).toBe(false)
    expect(compPuente(1,3,gameMod)).toBe(true)
});

it('should return an array with repeated elements when given an array with at least one repeated element', function() {
    const arr = [1, 2, 3, 4, 5, 2];
    const result = encontrarElementosRepetidos(arr);
    expect(result).toEqual([2]);
  });

