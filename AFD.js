let fita;
let aut;
let arquivo;

function preload() {
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
