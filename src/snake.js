class Snake{
    init(settings){
        this.settings=settings;
        this.snakeCoordinates=[
            {
                col: 1,
                row: 1
            },
            {
                col: 1,
                row: 2
            },
            {
                col: 1,
                row: 3
            },
        ]
        this.snakeClass="snakeBody";
        this.snakehead={
            col: "",
            row: ""
        }
        this.snakePlus={
            col: "",
            row: ""
        }
        this.snakeEnd={
            col: "",
            row: ""
        }
        this.direction="down";
    }
    chooseDirection(){
        document.addEventListener("keydown", this.changeDirection.bind(this))
    }
    isSnakeEatHerself(){
        for(let i=0; i<this.snakeCoordinates.length-1; i++){
            if(this.snakehead.col===this.snakeCoordinates[i].col && this.snakehead.row===this.snakeCoordinates[i].row) {
                return true;
            }
        }
        return false;
    }
    changeDirection(event){
        let direction = this.direction;
        switch (event.key) {
            case "ArrowUp":
                this.direction = "up";
                break;
            case "ArrowLeft":
                this.direction = "left";
                break;
            case "ArrowDown":
                this.direction = "down";
                break;
            case "ArrowRight":
                this.direction = "right";
                break;
        }
        if(this.isReverseDirection(direction)) {
            this.direction=direction;
        }
    }
    isReverseDirection(direction){
        if ((direction==="down" && this.direction==="up") || (direction==="up" && this.direction==="down") || (direction==="left" && this.direction==="right") || (direction==="right" && this.direction==="left") || direction===this.direction){
            return true;
        } else return false;
    }
    snakeGrow(){
        this.snakeCoordinates.unshift(this.snakePlus);
    }
    moveSnake(){
        this.snakehead={
            col: this.snakeCoordinates[this.snakeCoordinates.length-1].col,
            row: this.snakeCoordinates[this.snakeCoordinates.length-1].row
        }
        this.snakeEnd={
            col: this.snakeCoordinates[0].col,
            row: this.snakeCoordinates[0].row
        }
        this.snakeCoordinates.splice(0, 1);
        switch (this.direction){
            case "left":
                this.snakehead.col--;
                break;
            case "up":
                this.snakehead.row--;
                break;
            case "right":
                this.snakehead.col++;
                break;
            case "down":
                this.snakehead.row++;
                break;
        }
        if(this.isNextStepToWall()){
            this.wallBreaker()//не понимаю почему этот метод работает для всей змейки а не только для первого элемента
        }
        this.snakeCoordinates.push(this.snakehead);
        this.snakePlus={
            col: this.snakeCoordinates[0].col,
            row: this.snakeCoordinates[0].row
        }
    }
    wallBreaker(){
        if (this.snakeCoordinates[this.snakeCoordinates.length-1].col===this.settings.width)
            this.snakehead.col=1
        if (this.snakeCoordinates[this.snakeCoordinates.length-1].col===1)
            this.snakehead.col=this.settings.width
        if (this.snakeCoordinates[this.snakeCoordinates.length-1].row===this.settings.height)
            this.snakehead.row=1;
        if (this.snakeCoordinates[this.snakeCoordinates.length-1].row===1)
            this.snakehead.row=this.settings.width;
    }
    isNextStepToWall(){
        if(this.snakehead.col>this.settings.width || this.snakehead.col<1|| this.snakehead.row>this.settings.height || this.snakehead.row<1){
            return true;
        } else return false;
    }
}