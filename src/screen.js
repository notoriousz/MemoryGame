const ID_CONTENT = 'content'

export class ScreenHTML {
  static initContentHTML(item) {
    return `
    <div class="col-md-3">
    <div class="card" style="width: 50%;">
      <img src="${item.img}" name="${item.name}" class="card-img-top" alt="...">
    </div>
    </div>
   `
  }

  static setContentHTML(htmlCode) {
    const conteudo = document.getElementById(ID_CONTENT);
    conteudo.innerHTML = htmlCode;
  }

  static stringForImageGeneretor(itens) {
    //para cada item da lista vai exercutar a função para gerar o HTML
    //e concatena tudo em uma unica string
    //muda de array para string
    return itens.map(ScreenHTML.initContentHTML().join(''))
  }

  static attImagens(itens) {
    const codeHtml = ScreenHTML.stringForImageGeneretor(itens);
    ScreenHTML.setContentHTML(codeHtml);
  }
}