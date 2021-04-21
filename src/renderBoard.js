"use strict";

class RenderBoard {
    constructor() {
        this.board = document.querySelector("#game");
    }

    init(settings, snake) {
        this.count=0;
        this.settings = settings;
        this.snake = snake;
        this.foodClass = "food";
        this.foodCoordinates={
            col: "",
            row: ""
        }
    }

    renderBoard() {
        for (let i = 0; i < this.settings.height; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < this.settings.width; j++) {
                let td = document.createElement("td");
                tr.appendChild(td);
            }
            this.board.appendChild(tr);
        }
    }

    renderSnake() {
        for (let i = 0; i < this.snake.snakeCoordinates.length; i++) {
            this.renderObject(this.snake.snakeCoordinates[i].col, this.snake.snakeCoordinates[i].row, this.snake.snakeClass)
        }
    }

    renderObject(col, row, classname) {
        this.board.querySelector(`tr:nth-child(${row}) td:nth-child(${col})`).classList.add(classname);
    }
    removeClass(col, row, classname){
        this.board.querySelector(`tr:nth-child(${row}) td:nth-child(${col})`).classList.remove(classname);
    }
    isNotSnake(col, row) {
        for (let i = 0; i < this.snake.snakeCoordinates.length; i++) {
            if (this.snake.snakeCoordinates[i].col === col && this.snake.snakeCoordinates[i].row === row) {
                return false;
            }
        }
        return true;
    }
    generateFood() {
        while (true) {
            let col = Math.floor(Math.random() * this.settings.width) + 1;
            let row = Math.floor(Math.random() * this.settings.height) + 1;
            if (this.isNotSnake(col, row)) {
                this.renderObject(col, row, this.foodClass);
                this.foodCoordinates.col=col;
                this.foodCoordinates.row=row;
                return;
            }
        }
    }
    eatFood(){
        if (this.isFoodEaten()) {
            this.removeClass(this.foodCoordinates.col, this.snake.snakehead.row, this.foodClass);
            this.snake.snakeGrow();
            this.count++;
            this.generateFood();
        }
    }
    isFoodEaten(){

        if(this.snake.snakehead.col===this.foodCoordinates.col && this.snake.snakehead.row===this.foodCoordinates.row){
            return true;
        } else return false;
    }
}
