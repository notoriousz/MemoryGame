import { ScreenHTML } from "./src/screen.js";
import { MemoryGame } from "./src/memory-game.js";

function onLoadScreen() {
  //Adicionado herois dinamicamente
  const heroi = {
    img: '../assets/american.png',
    name: 'american-captain'
  }
  const test = ScreenHTML.initContentHTML(heroi)
  console.log(test)
  ScreenHTML.setContentHTML(heroi)
}

window.onLoad = onLoadScreen()