class Game{
    constructor() {
        this.score=document.querySelector(".score > .current");
        this.toWin=document.querySelector(".score > .toWin");
        this.start=document.querySelector("#startBtn");
        this.pause=document.querySelector("#pauseBtn");
    }
    init(settings, render, snake){
        this.settings=settings;
        this.render=render;
        this.snake=snake;
        this.stepIdentifier="";
    }
    gameStart(){
        this.toWin.innerText=this.settings.winLength;
        this.render.renderBoard();
        this.render.renderSnake();
        this.render.generateFood();
        this.eventList();
    }
    eventList(){
        this.start.addEventListener("click", this.run.bind(this));
        this.pause.addEventListener("click", this.stop.bind(this));
        this.snake.chooseDirection();
    }
    run(){
        if(this.settings.gameStatus==="paused"){
            this.settings.gameStatus="play";
            this.stepIdentifier=setInterval(this.doTick.bind(this), 1000/this.settings.speed)
        }
    }
    stop(){
        if(this.settings.gameStatus==="play"){
            this.settings.gameStatus="paused";
            clearInterval(this.stepIdentifier);
        }
    }
    doTick(){
        this.render.eatFood();
        //this.snake.wallBreaker();
        this.snake.moveSnake();
        if(this.snake.isSnakeEatHerself())
            this.loseGame();
        this.wingame();
        this.render.removeClass(this.snake.snakeEnd.col, this.snake.snakeEnd.row, this.snake.snakeClass)
        this.render.renderSnake();
        this.score.innerText=this.render.count;
    }
    loseGame(){
        this.stop();
        this.settings.gameStatus="lose";
        let message=document.querySelector("#message");
        message.innerHTML="Вы проиграли";
    }
    wingame(){
        if(this.snake.snakeCoordinates.length===this.settings.winLength+3){
            this.stop();
            this.settings.gameStatus="win";
            let message=document.querySelector("#message");
            message.innerHTML="Вы выиграли";
        }
    }
}