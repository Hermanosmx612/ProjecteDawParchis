export function createTable(){
    let board = new Array(69);
    for (let i = 0; i < 69; i++) {
      board[i] = { numero: i + 1, fichas: [] };
    }
    return board;
  };

export function putTokens (){
    let fichas = [
      "fichaAmarillo.png",
      "fichaVerde.png",
      "fichaAzul.png",
      "fichaRojo.png",
    ];

    let colores = ["amarillo", "verde", "azul", "rojo"];
    let count = 0;
    let homeTokens = document.querySelectorAll("#home");
    for (let casilla of homeTokens) {
      let childrenn = casilla.children;
      let count2 = 1;
      for (let atributes of childrenn) {
        if (atributes.tagName === "IMG") {
          //atributes.addEventListener(click ,moverFichaQueQuieras);
          atributes.src = "images/" + fichas[count];
          atributes.className = "fichas " + colores[count];
          count2++;
        }
      }
      count++;
    }
  };