//Responsavel por criar a logica dos cards e inicializar o jogo
export class MemoryGame {
  //Caso o objeto passado tenha mais de uma propriedade,
  //O construtor ignora as demais e pega apenas a propriedade Tela, que é a que vamos usar para dar o dinamismo as imagens
  constructor({ tela }) {
    this.tela = tela;

    this.heroisIniciais = [
      {img:'./assets/american.png', name: 'capitao america'},
      {img:'./assets/batman.png', name: 'batman'},
      {img:'./assets/iron-man.png', name: 'homem-de-ferro'},
      {img:'./assets/lanterna-verde.png', name: 'lanterna-verde'}
    ]
  }
  //Para usar o this, não podemos usar static
  inicializarGame() {
    //Pega todas as funções da classe tela
    //adiciona todos os herois na função de atualizar os herois na tela
    this.tela.atualizarImagens(this.heroisIniciais)

  }
}
