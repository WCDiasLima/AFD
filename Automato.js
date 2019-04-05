class Autonomo {
  constructor(arq) {
    this.alfabeto = arq.alfabeto;
    this.qtdEstados = arq.qtdEstados;
    this.estadoAtual = arq.estadoInicial;
    this.estadosFinais = new Set(arq.estadosFinais);
    this.delta = arq.delta;
  }
  
  passo(letra) {
    this.estadoAtual = this.delta[this.estadoAtual][this.posAlfa(letra)];
  }
  posAlfa(letra) {
    for(let i = 0; i < this.alfabeto.length; i++) {
      if(this.alfabeto[i] == letra) return i;
    }
    return -1;
  }
  mostrar() {
    let raio = height / 2 - 80, x, y;
    noStroke();
    for(let i = 0; i < this.qtdEstados; i++) {
      x = raio * cos(map(i, 0, this.qtdEstados, 0, TAU)) + width / 2;
      y = raio * sin(map(i, 0, this.qtdEstados, 0, TAU)) + height / 2 - 50;
      if(i == this.estadoAtual) fill(255, 22, 84);
      else fill(243, 255, 189);
      circle(x, y, 25);
      fill(0);
      text(i, x - 15, y+2);
    }
  }
}
