export class Player {
    constructor(nombre, color, salida) {
      this.nombre = nombre;
      this.colorFichas = color;
      this.salida = salida;
      this.fichas = [
        { estado: "fuera_del_tablero"},
        { estado: "fuera_del_tablero"},
        { estado: "fuera_del_tablero"},
        { estado: "fuera_del_tablero"},
      ];
      
    }
  }