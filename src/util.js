//Criada para utilizarmos metodos assincronos
export class Util {
  static timeout(tempo) {
    return new Promise(resolve => setTimeout(resolve, tempo)) 
  }
}
