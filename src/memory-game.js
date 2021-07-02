//Responsavel por criar a logica dos cards e inicializar o jogo
export class MemoryGame {
  //Caso o objeto passado tenha mais de uma propriedade,
  //O construtor ignora as demais e pega apenas as propriedades Tela e Util,
  //que é as que vamos utilizar para criar o dinamismo e logica
  constructor({ tela, util }) {
    this.tela = tela,
    this.util = util,
    this.heroisIniciais = [
      {img:'./assets/american.png', nome: 'capitao america'},
      {img:'./assets/batman.png', nome: 'batman'},
      {img:'./assets/iron-man.png', nome: 'homem-de-ferro'},
      {img:'./assets/lanterna-verde.png', nome: 'lanterna-verde'}
    ],
    this.iconePadrao = './assets/default.png',
    this.heroisEscondidos = [],
    this.heroisSelecionados = []
  }
  //Para usar o this, não podemos usar static
  inicializarGame() {
    //Pega todas as funções da classe tela
    //adiciona todos os herois na função de atualizar os herois na tela
    this.tela.atualizarImagens(this.heroisIniciais);
    //força a tela a usar o this do jogo da memoria
    this.tela.configurarBotaoJogar(this.jogar.bind(this));
    this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this));
    this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this));
  }

  //metodo para embaralhar as cards
  async embaralhar() {
    const copias = this.heroisIniciais
    //duplicar os herois
    .concat(this.heroisIniciais)
    //entrar em cada item e adicionar um id aleatorio
    .map(item => {return Object.assign({}, item, { id: Math.random() / 0.5});})
    //ordenar aleatoriamente
    .sort(() => Math.random() - 0.5);
    this.tela.atualizarImagens(copias);
    this.tela.contadorInicio(); //mostra o contador para embaralhar

    const idDoIntervalo = this.tela.iniciarContador();

    //apos 3 segundos mostrando as imagens, eles vao esconder os herois com a imagem padrâo
    await this.util.timeout(2000);
    this.tela.limparIntervalo(idDoIntervalo);
    this.esconderHerois(copias);
    this.tela.contadorInicio(false);//apos esconder os herois, deixa o contador invisivel
  }

  //metodo para esconder os herois após 1 segundo
  esconderHerois(herois) {
    //trocar a imagem de todos os herois pelo icone padrao
    //Usando a sintaxe ({chave: 1}) estamos falando que vamos retornar
    //oque está dentro dos parenteses
    //quando não usamos ':' o interpretador entende que estamos pegando a variavel
    //id: e name: já criadas
    const heroisOcultos = herois.map(({ nome, id }) => ({
      id,
      nome,
      img: this.iconePadrao
    }));
    //atualiza as imagens com novos herois
    this.tela.atualizarImagens(heroisOcultos);
    //Guardamos os herois para utilizar posteriormente
    this.heroisEscondidos = heroisOcultos;
  }

  exibirHerois(nomeDoHeroi) {
    //procurar o heroi pelo nome e exibir a imagem dele
    //obtemos apernas a img dele
    // { img } -> estamos extraindo apenas a propriedade imagem
    //({ nome }) -> estamos extraindo apenas a propriedade nome para verificação
    const { img } = this.heroisIniciais.find(({ nome }) =>  nomeDoHeroi === nome);
    //função para exibir o heroi que tem nomes iguais
    this.tela.exibirHerois(nomeDoHeroi, img);
  }

  verificarSelecao(id, nome) {
    const item = {id, nome}
    //Verificamos se escolheu duas cartas
    //Após escolher duas, verificamos se acertou, para dar continuidade ao jogo
    const heroisSelecionados = this.heroisSelecionados.length
    switch(heroisSelecionados) {
      case 0:
        // adiciona a escolha na lista e espera pela próxima
        this.heroisSelecionados.push(item);
        break;
      case 1:
        //se a quantidade escolhida for um
        //o jogador podera escolher mais uma carta
        //opção1 é igual ao primeiro card escolhido que demos o push
        const [ opção1 ] = this.heroisSelecionados;
        //zera o array para não selecionar mais
        this.heroisSelecionados = [];
        //verificamos se os dois ID são diferentes para o jogador
        //não clicar na mesma card e ganhar, porém os nomes tem que ser iguais
        //para o jogador acertar
        if(opção1.nome === item.nome && opção1.id !== item.id) {
          this.exibirHerois(item.nome);
          //para a execução se for correta
          this.tela.mostrarMensagem();
          return;
        }
        //fim do case
        this.tela.mostrarMensagem(false);
        break;
    }
  }

  mostrarHeroisEscondidos() {
    //vamos colocar todos herois da tela e colocar seus respectivos valor
    const heroisEscondidos = this.heroisEscondidos;
    for(const heroi of heroisEscondidos) {
      const { img } = this.heroisIniciais.find((item) => item.nome === heroi.nome);
      heroi.img = img;
    }
    this.tela.atualizarImagens(heroisEscondidos);
  }

  jogar() {
    this.embaralhar();
  }
}
