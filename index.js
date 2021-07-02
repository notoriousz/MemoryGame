import { Tela } from "./src/screen.js";
import { MemoryGame } from "./src/memory-game.js";
import { Util } from "./src/util.js";

//Apenas chama o inicializar, para dar inicio ao jogo
function onLoadScreen() {
  //a variavel dependencias está pegando a classe Tela e Util e adicionando na logica do jogo da memoria.
  const dependencias = {
    tela: Tela, //a classe Tela é global
    util: Util
  }
  //iniciar jogo da memoria instanciando a classe e passando as dependencias
  const jogoDaMemoria = new MemoryGame(dependencias);
  jogoDaMemoria.inicializarGame();
}
window.onLoad = onLoadScreen();
