import { Tela } from "./src/screen.js";
import { MemoryGame } from "./src/memory-game.js";

//Apenas chama o inicializar, para dar inicio ao jogo
function onLoadScreen() {
  //a variavel dependencias está pegando a classe Tela e adicionando na logica do jogo da memoria.
  const dependencias = {
    tela: Tela //a classe Tela é global
  }
  //iniciar jogo da memoria
  const jogoDaMemoria = new MemoryGame(dependencias);
  jogoDaMemoria.inicializarGame();
}

window.onLoad = onLoadScreen();
