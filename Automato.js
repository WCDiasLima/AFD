/*
Copyright 2019 Joyce Emanuele, Wellington Cesar
This file is part of AFD.
*/

class Autonomo {
  constructor(arq) {
    this.alfabeto = arq.alfabeto;
    this.qtdEstados = arq.qtdEstados;
    this.estadoInicial = arq.estadoInicial;
    this.estadoAtual = this.estadoInicial;
    this.estadosFinais = new Set(arq.estadosFinais);
    this.delta = arq.delta;
  }
  reiniciar() {this.estadoAtual = this.estadoInicial;}

  passo(letra) {
    this.estadoAtual = this.delta[this.estadoAtual][this.posAlfa(letra)];
  }
  posAlfa(letra) {
    for (let i = 0; i < this.alfabeto.length; i++) {
      if (this.alfabeto[i] === letra) return i;
    }
    return -1;
  }
  
  ligacoes(){
    let raio = height / 2 - 80, x, y;
    let coor = [];
    let alf =[];
    let i,j;
 
    for(i=0;i<this.qtdEstados;i++){
       alf[i]=[];
      for (j=0;j<this.qtdEstados;j++){
        alf[i][j]=[];
    }}
    
    for(i = 0; i < this.qtdEstados; i++) {
      x = raio * cos(map(i, 0, this.qtdEstados, 0, TAU)) + width / 2;
      y = raio * sin(map(i, 0, this.qtdEstados, 0, TAU)) + height / 2 - 50;
      coor[i]=[x,y]; }
    let k=0;
    for(i=0;i<this.qtdEstados;i++){
      for (j=0;j<this.alfabeto.length;j++){
        alf[i][this.delta[i][j]][alf[i][this.delta[i][j]].length] = this.alfabeto[j];
    } }
  
    for(i=0;i<this.qtdEstados;i++){
      for(j=0;j<this.alfabeto.length;j++){
        line(coor[i][k],coor[i][k+1],coor[this.delta[i][j]][k],coor[this.delta[i][j]][k+1])
        if(i===this.delta[i][j]){
          let PointM;
          push();
          
          if(coor[i][k+1]<height/2){
           triangle(coor[i][k], coor[i][k+1]-25, coor[i][k]+10, coor[i][k+1]-35, coor[i][k]-10, coor[i][k+1]-35);
           PointM = createVector(((coor[i][k]+10)+(coor[i][k]-10))/2+15,((coor[i][k+1]-35)+(coor[i][k+1]-35))/2); 
          }  
          else{
           triangle(coor[i][k], coor[i][k+1]+25, coor[i][k]+10, coor[i][k+1]+35, coor[i][k]-10, coor[i][k+1]+35);
           PointM = createVector(((coor[i][k]+10)+(coor[i][k]-10))/2,((coor[i][k+1]+35)+(coor[i][k+1]+35))/2);
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
  
  
  mostrar() {
    let raio = height / 2 - 80;
    let x, y;
    noStroke();
    for (let i = 0; i < this.qtdEstados; i++) {
      x = raio * cos(map(i, 0, this.qtdEstados, 0, TAU)) + width / 2;
      y = raio * sin(map(i, 0, this.qtdEstados, 0, TAU)) + height / 2 - 50;
      if (i === this.estadoAtual) fill(255, 22, 84);
      else fill(243, 255, 189);
      circle(x, y, 25);
      fill(0);
      text(i, x - 15, y + 2);
    }
  }
  termino(fimcadeia) {
  	window.navigator.vibrate(500);
  	if(fimcadeia) {
  		if(this.estadosFinais.has(this.estadoAtual)) alert("Aceito!");
  		else alert("Rejeitado!!");
    }
  }
}
