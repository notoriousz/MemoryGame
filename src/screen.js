
import { Util } from "./util.js";
//metodos estáticos não podem acessar o 'this'
//então nossa classe 'util' não pode ser acessada usando o construtor
//exemplo: this.util, então faremos em forma de variável como variavel global
//assim, conseguimos utilizar o async e await no timeout do metodo mostrarMensagem()
const util = Util;
const ID_CONTENT = "content";
const ID_BTN_JOGAR = "jogar";
const ID_MENSAGEM = "mensagem";
const ID_CARREGANDO = "carregando";
const ID_CONTADOR = "contador";
const CLASSE_INVISIVEL = "invisible";
const BTN_MOSTRAR_TUDO = "mostrarTudo"
const MENSAGENS = {
  sucesso: {
    texto: "Combinação correta",
    classe: 'alert-success'
  },
  erro: {
    texto: "Combinação incorreta",
    classe: 'alert-danger'
  }
}

//classe responsavel por alterar os conteudos na tela
export class Tela {
  
  static obterCodigoHtml(item) {
    //Base do HTML para cada imagem que vamos colocar
    //Pega cada imagem dinamicamente pelo template string
    return `
    <div class="col-md-3">
      <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
        <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
      </div>
    </div>
   `
  }
  //ao click, verifica as cards que foram clicadas
  static configurarBotaoVerificarSelecao(funcaoOnCLick) {
    window.verificarSelecao = funcaoOnCLick;
  }

  static alterarConteudoHtml(htmlCode) {
    //Insere no HTML o conteudo
    const conteudo = document.getElementById(ID_CONTENT);
    conteudo.innerHTML = htmlCode;
  }

  static gerarStringPorImagem(itens) {
    //para cada item da lista vai exercutar a função para gerar o HTML
    //e concatena tudo em uma unica string
    //No final muda de array para string
    return itens.map(Tela.obterCodigoHtml).join('')
  }

  //atualiza as imagens dinamicamente na tela
  static atualizarImagens(itens) {
    const codeHtml = Tela.gerarStringPorImagem(itens);
    Tela.alterarConteudoHtml(codeHtml);
  }

  //configurando o btn para iniciar game
  static configurarBotaoJogar(initOnClick) {
    const btnJogar = document.getElementById(ID_BTN_JOGAR);
    btnJogar.onclick = initOnClick;
  }

  static exibirHerois(nomeDoHeroi, img) {
    const elementosHtml = document.getElementsByName(nomeDoHeroi);
    //para cada elemento na tela
    //trocaremos a imagem padrao para o heroi setando o src
    elementosHtml.forEach(item => item.src = img)
  }
  
  static async mostrarMensagem(success = true) {
    const elemento = document.getElementById(ID_MENSAGEM);
    if(success) {
      elemento.classList.remove(MENSAGENS.erro.classe);
      elemento.classList.add(MENSAGENS.sucesso.classe)
      elemento.innerText = MENSAGENS.sucesso.texto;
    }else {
      elemento.classList.remove(MENSAGENS.sucesso.classe);
      elemento.classList.add(MENSAGENS.erro.classe);
      elemento.innerText = MENSAGENS.erro.texto;
    }
    elemento.classList.remove(CLASSE_INVISIVEL);
    await util.timeout(1000)
    elemento.classList.add(CLASSE_INVISIVEL);
  }
  
  static contadorInicio(mostrar = true) {
    const carregando = document.getElementById(ID_CARREGANDO);
    if(mostrar) {
      carregando.classList.remove(CLASSE_INVISIVEL);
      return;
    }
    carregando.classList.add(CLASSE_INVISIVEL);
  }

  static iniciarContador() {
    let contar = 2;
    const contador = document.getElementById(ID_CONTADOR);
    //fazemos uma contagem regressiva
    const identificadorNoTexto = "$$contador";
    const textoPadrao = `Começando em ${identificadorNoTexto} ...`; 
    //atualizamos o texto a cada segundo
    const atualizarTexto = () => (contador.innerHTML) = textoPadrao.replace(identificadorNoTexto, contar--);
    atualizarTexto();
    //a cada segundo diminui um chamando a função, com setInterval
    const idDoIntervalo = setInterval(atualizarTexto, 1000);
    return idDoIntervalo;
  }

  static limparIntervalo(idDoIntervalo) {
    clearInterval(idDoIntervalo);
    document.getElementById(ID_CONTADOR).innerText = "";
  }

  static configurarBotaoMostrarTudo(funçãoonClick) {
    const btnMostrarTudo = document.getElementById(BTN_MOSTRAR_TUDO);
    btnMostrarTudo.onclick = funçãoonClick;
  }
}
