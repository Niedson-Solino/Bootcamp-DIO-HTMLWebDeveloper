let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x : 8 * box,
    y: 8 * box
}
let direction = "right";

// food random no mapa
let food = { 
    x : Math.floor(Math.random() * 15 + 1) * box,
    y : Math.floor(Math.random() * 15 + 1) * box 
}


function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x,snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x , food.y, box, box);
}

document.addEventListener('keydown', update); //pegar o evento do teclado (keydown) e att o update

function update(event){ // não muda direçao ao contrario
    if(event.keyCode == 37 && direction != "right") direction="left"; // 37 = seta esquerda teclado
    if(event.keyCode == 38 && direction != "down") direction="up";
    if(event.keyCode == 39 && direction != "left") direction="right";
    if(event.keyCode == 40 && direction != "up") direction="down";
}

function iniciarJogo(){ 
    //voltar do outro lado do campo
    if(snake[0].x > 15 * box ) snake[0].x = 0;
    if(snake[0].x < 0 ) snake[0].x = 16 * box;
    if(snake[0].y > 15 * box ) snake[0].y = 0;
    if(snake[0].y < 0 ) snake[0].y = 16 * box;
    
    //bater no corpo
    for(i = 1 ; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game over :(((');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // setando as direçoes
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // alimentando a cobra
    if(snakeX != food.x || snakeY != food.y){
    snake.pop();
    }
    else{   
       food.x = Math.floor(Math.random() * 15 + 1) * box;
       food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // criando a cabeça
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

 // intervalo de 100 ms p att o jogo
let jogo = setInterval(iniciarJogo, 110);
