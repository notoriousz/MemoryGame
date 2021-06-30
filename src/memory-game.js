//Responsavel por criar a logica dos cards e inicializar o jogo
export class MemoryGame {
  //Caso o objeto passado tenha mais de uma propriedade,
  //O construtor ignora as demais e pega apenas a propriedade Tela, que é a que vamos usar para dar o dinamismo as imagens
  constructor({ tela }) {
    this.tela = tela,

    this.heroisIniciais = [
      {img:'./assets/american.png', name: 'capitao america'},
      {img:'./assets/batman.png', name: 'batman'},
      {img:'./assets/iron-man.png', name: 'homem-de-ferro'},
      {img:'./assets/lanterna-verde.png', name: 'lanterna-verde'}
    ],
    this.iconePadrao = './assets/default.png',
    this.heroisEscondidos = []
  }
  //Para usar o this, não podemos usar static
  inicializarGame() {
    //Pega todas as funções da classe tela
    //adiciona todos os herois na função de atualizar os herois na tela
    this.tela.atualizarImagens(this.heroisIniciais)
    //força a tela a usar o this do jogo da memoria
    this.tela.configurarBotaoJogar(this.jogar.bind(this));

  }
  embaralhar() {
    const copias = this.heroisIniciais
    //duplicar os herois
    .concat(this.heroisIniciais)
    //entrar em cada item e adicionar um id aleatorio
    .map(item => {return Object.assign({}, item, { id: Math.random() / 0.5});})
    //ordenar aleatoriamente
    .sort(() => Math.random() - 0.5)
    this.tela.atualizarImagens(copias)
    //apos um segundo mostrando as imagens, eles vao esconder os herois com a imagem padrâo
    setTimeout(() => {
      this.esconderHerois(copias)
    }, 1000)
  }
  esconderHerois(herois) {
    //trocar a imagem de todos os herois pelo icone padrao
    //Usando a sintaxe ({chave: 1}) estamos falando que vamos retornar
    //oque está dentro dos parenteses
    //quando não usamos ':' o interpretador entende que estamos pegando a variavel
    //id: e name: já criadas
    const heroisOcultos = herois.map(({ name, id }) => ({
      id,
      name,
      img: this.iconePadrao
    }))
    //atualiza as imagens com novos herois
    this.tela.atualizarImagens(heroisOcultos)
    //Guardamos os herois para utilizar posteriormente
    this.heroisOcultos = heroisOcultos
  }

  jogar() {
    this.embaralhar()
  }


}
