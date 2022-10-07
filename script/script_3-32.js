//movimentação do coletor
function move(direcao){
    if (contador != 0){
        para();
    }
    if (direcao == "esquerda"){
        timer = setInterval("esquerda()", 15);
        contador ++;
    }
    if (direcao == "direita"){
        timer = setInterval("direita()", 15);
        contador ++;
    }
}

function direita(){
    let coletorLeft = parseInt(getComputedStyle(coletor).left);
    let jogoWidth = parseInt(getComputedStyle(jogo).width);
    let coletorWidth = parseInt(getComputedStyle(coletor).width);

    coletor.style.transform = 'scaleX(-1)';
    coletor.style.left = coletorLeft + 6;
    if (coletorLeft >= jogoWidth - coletorWidth){
        clearInterval(timer);
        timer = setInterval ("esquerda()", 15);
    }
}

function esquerda(){
    let coletorLeft = parseInt(getComputedStyle(coletor).left);
    
    coletor.style.transform = 'scaleX(1)';
    coletor.style.left = coletorLeft - 6;
    if (coletorLeft <= 0){
        clearInterval(timer);
        timer = setInterval ("direita()", 15);
    }
}

function control(e){
    if(e.key == "ArrowLeft"){
        move("esquerda");
    }
    if(e.key == "ArrowRight"){
        move("direita");
    }
}

//geração de itens
function gerarItens(){
    let itemTop = 0;
    let jogoWidth = parseInt(getComputedStyle(jogo).width);
    let itemLeft = Math.floor(Math.random() * (jogoWidth - 50));
    let itens = document.querySelector(".itens");
    let item = document.createElement("div");
    item.setAttribute("class", "item");
    itens.appendChild(item);

    function cairItens(){
        if(itemTop > coletorTop + 100){
            item.remove();
        }
        itemTop += 5;
        item.style.top = itemTop;
    }
    
    let cairItensInterval = setInterval(cairItens, 20);
    setTimeout(gerarItens, 2000);
    item.style.top = itemTop;
    item.style.left = itemLeft;
}

function para(){
    clearInterval(timer);
}

//colisoes
function colisao(){
    if (((coletorLeft >= itemLeft) && (coletorLeft <= itemLeft + itemWidth)) &&
        ((coletorTop >= itemTop) && (coletorTop <= itemTop + itemHeight))){
            para2();
            para();
    }
    if (((itemLeft >= coletorLeft) && (itemLeft <= coletorLeft + coletorWidth)) &&
        ((itemTop >= coletorTop) && (itemTop <= coletorTop + coletorHeight))){
            para2();
            para();
    }
}

//iniciar
function iniciar(){
    let jogo = document.querySelector(".jogo");
    let item = document.querySelector(".item");
    let chao = document.querySelector(".chao");
    let coletor = document.getElementById("coletor");
    let startButton = document.querySelector(".startButton");
    let painel = document.querySelector(".painel");
    let buttonControleEsquerda = document.getElementById("esquerda");
    let buttonControleDireita = document.getElementById("direita");
    jogo.style.height = "100%";
    item.style.opacity = "0";
    chao.style.visibility = "hidden";
    coletor.style.opacity = "0";
    buttonControleEsquerda.style.opacity = "0";
    buttonControleDireita.style.opacity = "0";
    painel.style.visibility = "hidden";
    
    document.querySelector(".startButton").onclick = function(){
        item.remove();
        chao.style.visibility = "visible";
        coletor.style.opacity = "1";
        buttonControleEsquerda.style.opacity = "1";
        buttonControleDireita.style.opacity = "1";
        painel.style.visibility = "visible";
        gerarItens();
        startButton.remove();
    }
}

iniciar();

let coletorTop = parseInt(getComputedStyle(coletor).top);
let coletorBottom = parseInt(getComputedStyle(coletor).bottom);
let coletorLeft = parseInt(getComputedStyle(coletor).left);
let coletorWidth = parseInt(getComputedStyle(coletor).width);
let coletorHeight = parseInt(getComputedStyle(coletor).height);

let item = document.querySelector(".item");
let itemTop = parseInt(getComputedStyle(item).top);
let itemLeft = parseInt(getComputedStyle(item).left);
let itemWidth = parseInt(getComputedStyle(item).width);
let itemHeight = parseInt(getComputedStyle(item).height);

let jogoWidth = parseInt(getComputedStyle(jogo).width);
let jogoHeight = parseInt(getComputedStyle(jogo).height);

let contador = 0;
let cont = 0;

document.addEventListener("keydown", control);
document.querySelector("#esquerda").addEventListener("click",() => { move('esquerda') });
document.querySelector("#direita").addEventListener("click",() => { move('direita') });