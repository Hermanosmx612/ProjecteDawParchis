export class Player {
    constructor(nombre, color, salida,limite) {
      this.nombre = nombre;
      this.colorFichas = color;
      this.salida = salida;
      this.limite = limite
      this.fichas = [
        { estado: "fuera_del_tablero"},
        { estado: "fuera_del_tablero"},
        { estado: "fuera_del_tablero"},
        { estado: "fuera_del_tablero"},
      ];
      
    }
  }