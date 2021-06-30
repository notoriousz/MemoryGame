const ID_CONTENT = 'content';

//Responsavel apenas por alterar os conteudos
export class Tela {
  static obterCodigoHtml(item) {
    //Base do HTML para cada imagem que vamos colocar
    //Pega cada imagem dinamicamente pelo template string
    return `
    <div class="col-md-3">
    <div class="card" style="width: 50%;">
      <img src="${item.img}" name="${item.name}" class="card-img-top" alt="...">
    </div>
    </div>
   `
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

  static atualizarImagens(itens) {
    const codeHtml = Tela.gerarStringPorImagem(itens);
    Tela.alterarConteudoHtml(codeHtml);
  }
}
