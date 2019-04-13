/*
Copyright 2019 Joyce Emanuele, Wellington Cesar
This file is part of AFD.
*/

class Autonomo {
	constructor(arq) {
		this.delta = arq.delta;
		this.alfabeto = arq.alfabeto;
		this.qtdEstados = arq.qtdEstados;
		this.estadoInicial = arq.estadoInicial;

		this.estadoAtual = this.estadoInicial;
		this.estadosFinais = new Set(arq.estadosFinais);
	}
	reiniciar() {this.estadoAtual = this.estadoInicial;}

	passo(letra) {
		let posicao = this.posAlfa(letra);
		if(posicao >= 0)  this.estadoAtual = this.delta[this.estadoAtual][posicao];
		else this.termino(false);
	}
	posAlfa(letra) {
		for (let i = 0; i < this.alfabeto.length; i++) {
			if (this.alfabeto[i] === letra) return i;
		}
		return -1;
	}
	mostrar() {
		let raio = height / 2 - 80;
		let x, y;
		for (let i = 0; i < this.qtdEstados; i++) {
			noStroke();
			x = raio * cos(map(i, 0, this.qtdEstados, 0, TAU)) + width / 2;
			y = raio * sin(map(i, 0, this.qtdEstados, 0, TAU)) + height / 2 - 50;
			if (i === this.estadoAtual) fill(255, 22, 84);
			else fill(243, 255, 189);
			circle(x, y, 25);
			fill(0);
			text(i, x - 15, y + 2);
			if(this.estadosFinais.has(i)) {
				stroke(0);
				noFill();
				circle(x, y, 30);
			}
		}
	}
	termino(fimcadeia) {
		window.navigator.vibrate(100);
		if(estado !== 'r') return;
		som.start();
		som.stop(0.5);
		if(fimcadeia && this.estadosFinais.has(this.estadoAtual)) {
			aceito = true;
			background(20, 200, 95);
			text("Aceito!\n( ͡ ͜ʖ ͡ )",width / 2 - 100, height / 2 - 50);
			som.freq(500);
		}
		else {
			aceito = false;
			background(170, 30, 80);
			som.freq(250);
			if(fimcadeia) text("Rejeitado!\nヽ( ͡ಠ ʖ̯ ͡ಠ)ﾉ",width / 2 - 150, height / 2 - 50);
			else text("Símbolo não\nreconhecido!\n┐( ͡° ʖ̯ ͡°)┌",width / 2 - 170, height / 2 - 50);
		}
		estado = 't';
	}
}
