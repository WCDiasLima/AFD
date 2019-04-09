/*
Copyright 2019 Joyce Emanuele, Wellington Cesar

This file is part of AFD.

AFD is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

AFD is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with AFD. If not, see <https://www.gnu.org/licenses/>.
*/

let fita;
let aut;
let arquivo;

function preload() {
    //Arquivo de autômato disponível para edição em https://www.npoint.io/docs/47de07a0bd5255cdcf78
    arquivo = loadJSON("https://api.npoint.io/47de07a0bd5255cdcf78");
}

function setup() {
    if (windowWidth >= windowHeight - 160) createCanvas(windowWidth, windowHeight);
    else createCanvas(windowWidth, windowWidth + 80);

    textFont("monospace");
    textAlign(LEFT, CENTER);
    textSize(50);

    // frameRate(120);//Letras por segundos
    background(112, 193, 179);
    fita = new Fita("110");
    aut = new Autonomo(arquivo);
}

function draw() {
    fita.mostrar();
    aut.mostrar();
    // aut.passo(fita.letra());
    // fita.passo();
}

function mousePressed() {
    aut.passo(fita.letra());
    fita.passo();
}
