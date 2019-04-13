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

		if(width > height - 80) this.raio = height / 2 - 80;
		else this.raio = width / 2 - 25;
	}

	reiniciar() {
		this.estadoAtual = this.estadoInicial;
	}

	passo(letra) {
		let posicao = this.posAlfa(letra);
		if (posicao >= 0) this.estadoAtual = this.delta[this.estadoAtual][posicao];
		else this.termino(false);
	}

	posAlfa(letra) {
		for (let i = 0; i < this.alfabeto.length; i++) {
			if (this.alfabeto[i] === letra) return i;
		}
		return -1;
	}
	mostrar() {
		let x, y;

		strokeWeight(1);
		noStroke();
		fill(0);
		if (estado === 'a') {
			background(20, 200, 95);
			text("Aceito!\n( ͡ ͜ʖ ͡ )", width / 2 - 100, height / 2 - 50)
		} else if (estado === 'r') {
			background(170, 30, 80);
			text("Rejeitado!\nヽ( ͡ಠ ʖ̯ ͡ಠ)ﾉ", width / 2 - 150, height / 2 - 50);
		} else if (estado === 's') {
			background(170, 30, 80);
			text("Símbolo não\nreconhecido!\n┐( ͡° ʖ̯ ͡°)┌", width / 2 - 170, height / 2 - 50);
		}
		this.ligacoes();

		for (let i = 0; i < this.qtdEstados; i++) {
			x = this.raio * cos(map(i, 0, this.qtdEstados, 0, TAU)) + width / 2;
			y = this.raio * sin(map(i, 0, this.qtdEstados, 0, TAU)) + height / 2 - 50;
			if (i === this.estadoAtual) fill(255, 22, 84);
			else fill(243, 255, 189);
			noStroke();

			circle(x, y, 25);
			fill(0);
			text(i, x - 15, y + 2);
			if (this.estadosFinais.has(i)) {
				stroke(0);
				noFill();
				circle(x, y, 30);
			}
		}
	}
	termino(fimcadeia) {
		window.navigator.vibrate(400);
		if (estado !== 'e') return;
		som.start();
		som.stop(0.5);
		if (fimcadeia && this.estadosFinais.has(this.estadoAtual)) {
			estado = 'a';
			som.freq(500);
		} else {
			som.freq(250);
			if (fimcadeia) estado = 'r';
			else estado = 's';
		}
	}
ligacoes() {
    let coor = [];
    let alf =[];
    let i,j;

    for(i=0;i<this.qtdEstados;i++){
       alf[i]=[];
      for (j=0;j<this.qtdEstados;j++){
        alf[i][j]=[];
    }}

    for(i = 0; i < this.qtdEstados; i++) {
      x = this.raio * cos(map(i, 0, this.qtdEstados, 0, TAU)) + width / 2;
      y = this.raio * sin(map(i, 0, this.qtdEstados, 0, TAU)) + height / 2 - 50;
      coor[i]=[x,y]; }
    let k=0;
    for(i=0;i<this.qtdEstados;i++){
      for (j=0;j<this.alfabeto.length;j++){
        alf[i][this.delta[i][j]][alf[i][this.delta[i][j]].length] = this.alfabeto[j];
    } }

    for(i=0;i<this.qtdEstados;i++){
      for(j=0;j<this.alfabeto.length;j++){
        line(coor[i][k],coor[i][k+1],coor[this.delta[i][j]][k],coor[this.delta[i][j]][k+1])

		  if(i===this.estadoInicial) {///estado inicial
			  push();
			  line(coor[i][k],coor[i][k+1],coor[i][k],coor[i][k+1]+60);
			  fill(color(100, 100, 100));
			  triangle(coor[i][k],coor[i][k+1]+30,coor[i][k]+10,coor[i][k+1]+50,coor[i][k]-10,coor[i][k+1]+50);
			  pop();
		  }

        if(i===this.delta[i][j]){
          let PointM;

          push();
          if(coor[i][k+1]<height/2){
			  if(this.estadosFinais.has(i)){
				  triangle(coor[i][k], coor[i][k+1]-35, coor[i][k]+10, coor[i][k+1]-45, coor[i][k]-10, coor[i][k+1]-45);
				  if(coor[i][k]<width/2){
					  PointM = createVector(((coor[i][k]+10)+(coor[i][k]-10))/2-35,((coor[i][k+1]-45)+(coor[i][k+1]-45))/2-15);
				  }
				  else {
					  PointM = createVector(((coor[i][k] + 10) + (coor[i][k] - 10)) / 2 + 35, ((coor[i][k + 1] - 45) + (coor[i][k + 1] - 45)) / 2-15);
				  }
			  }
			  else {
				  triangle(coor[i][k], coor[i][k + 1] - 25, coor[i][k] + 10, coor[i][k + 1] - 35, coor[i][k] - 10, coor[i][k + 1] - 35);
				  PointM = createVector(((coor[i][k] + 10) + (coor[i][k] - 10)) / 2 + 15, ((coor[i][k + 1] - 35) + (coor[i][k + 1] - 35)) / 2);
			  }
          }  
          else{
			  if(this.estadosFinais.has(i)){
				  triangle(coor[i][k], coor[i][k+1]+35, coor[i][k]+10, coor[i][k+1]+45, coor[i][k]-10, coor[i][k+1]+45);
				  if(coor[i][k]<width/2){
					  PointM = createVector(((coor[i][k]+10)+(coor[i][k]-10))/2-35,((coor[i][k+1]+45)+(coor[i][k+1]+45))/2+15);
				  }
				  else{
					  PointM = createVector(((coor[i][k]+10)+(coor[i][k]-10))/2+35,((coor[i][k+1]+45)+(coor[i][k+1]+45))/2+15);
				  }
			  }
			  else{
				  triangle(coor[i][k], coor[i][k+1]+25, coor[i][k]+10, coor[i][k+1]+35, coor[i][k]-10, coor[i][k+1]+35);
				  PointM = createVector(((coor[i][k]+10)+(coor[i][k]-10))/2,((coor[i][k+1]+35)+(coor[i][k+1]+35))/2);
			  }

          }  

          push();
          textSize(20);
          text(alf[i][this.delta[i][j]],PointM.x,PointM.y+10);
          pop(); 
          pop();
        }
        else{
        push();
        var angulo = atan2(coor[i][k+1]-coor[this.delta[i][j]][k+1],coor[i][k]-coor[this.delta[i][j]][k]);
        let pM = createVector((coor[i][k]+coor[this.delta[i][j]][k])/2,(coor[i][k+1]+coor[this.delta[i][j]][k+1])/2);
        translate((pM.x+coor[this.delta[i][j]][k])/2,(pM.y+coor[this.delta[i][j]][k+1])/2);  
        rotate(angulo-HALF_PI);
        triangle(-10*0.5, 10, 10*0.5, 10, 0, -10/2);  
        pop();

        push();
        textSize(20);
        text(alf[i][this.delta[i][j]],(pM.x+coor[this.delta[i][j]][k])/2,(pM.y+coor[this.delta[i][j]][k+1])/2+20);
        pop(); }
    } }
  }
}
