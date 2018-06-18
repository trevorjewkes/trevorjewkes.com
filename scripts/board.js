Game.Board = (function(){
    let numBlocks = 1;
    let direction = 0;

    let player = [];
    let obstacles = [];
    let board = [];
    let playerHead = {
        x: 0,
        y: 0
    };

    let timer = {
        elapsedTime: 0,
        updateRate: 115
    };

    let countDown = {
        elapsedTime: 0,
        seconds: 3
    };

    function init() {
        Game.GameOver = false;
        player.length = 0;
        obstacles.length = 0;
        board.length = 0;
        numBlocks = 1;
        direction = 0;
        timer.elapsedTime = 0;
        timer.updateRate = 115;
        countDown.elapsedTime = 0;
        countDown.seconds = 3;
        for(let i = 0; i < 50; i++)
        {
            for(let j = 0; j < 50; j++) {
                if(i===0 || i===49 || j===0 || j===49) {
                    board.push('BORDER');
                }
                else {
                    board.push('EMPTY');
                }
            }
        }
        for(let i = 0; i < 15; i++) {
            let placed = false;
            while(!placed) {
                let location = Math.floor(Math.random()*2500);
                if(board[location] == 'EMPTY') {
                    board[location] = 'OBSTACLE';
                    placed = true;
                }
            }
        }
        let placed = false;
        while(!placed) {
            let loc = Math.floor(Math.random()*2500);
            if(board[loc] == 'EMPTY') {
                board[loc] = 'PLAYER';
                player.push(loc);
                playerHead.x = loc % 50;
                playerHead.y = Math.floor(loc / 50);
                placed = true;
            }
        }
        placeFood();

        Game.Keyboard.unregisterAllHandlers();
        Game.Mouse.unregisterAllCommands();
        Game.Keyboard.registerHandler(()=>{Game.Board.direction(1);},Game.input.KeyEvent.DOM_VK_UP,false);
        Game.Keyboard.registerHandler(()=>{Game.Board.direction(3);},Game.input.KeyEvent.DOM_VK_DOWN,false);
        Game.Keyboard.registerHandler(()=>{Game.Board.direction(4);},Game.input.KeyEvent.DOM_VK_LEFT,false);
        Game.Keyboard.registerHandler(()=>{Game.Board.direction(2);},Game.input.KeyEvent.DOM_VK_RIGHT,false);

        Game.score = 0; 
    }

    function move() {
        // 1 is up
        // 2 is right
        // 3 is down
        // 4 is left
        let succesfullMove = false;
        let loc = playerHead.x + (playerHead.y*50);
        let startloc = playerHead.x + (playerHead.y*50);
        switch(direction) {
            case 0:
                succesfullMove = true;
                break;
            case 1: 
                loc -= 50;
                if(loc >= 0 && board[loc] === 'EMPTY') succesfullMove = true;
                if(loc >= 0 && board[loc] === 'FOOD') {
                    board[loc] = 'PLAYER';
                    placeFood();
                    succesfullMove = true;
                    numBlocks += 3;
                }
                break;
            case 2: 
                loc ++;
                if(loc <= 2500 && board[loc] === 'EMPTY') succesfullMove = true;
                if(loc <= 2500 && board[loc] === 'FOOD') {
                    board[loc] = 'PLAYER';
                    placeFood();
                    succesfullMove = true;
                    numBlocks += 3;
                }
                break;
            case 3: 
                loc += 50;
                if(loc <= 2500 && board[loc] === 'EMPTY') succesfullMove = true;
                if(loc <= 2500 && board[loc] === 'FOOD') {
                    board[loc] = 'PLAYER';
                    placeFood();
                    succesfullMove = true;
                    numBlocks += 3;
                }
                break;
            case 4: 
                loc--;
                if(loc >= 0 && board[loc] === 'EMPTY') succesfullMove = true;
                if(loc >= 0 && board[loc] === 'FOOD') {
                    board[loc] = 'PLAYER';
                    placeFood();
                    succesfullMove = true;
                    numBlocks += 3;
                }
                break;
        }
        playerHead.x = (loc%50);
        playerHead.y = Math.floor(loc/50);
        if(startloc !== loc)
            player.push(loc);
        board[loc] = 'PLAYER';
        if(player.length > numBlocks) {
            let tmp = player.shift();
            board[tmp] = 'EMPTY';
        }
        return succesfullMove;
    }

    function update(elapsedTime) {
        if(countDown.seconds > 0) {
            countDown.elapsedTime += elapsedTime;
            while(countDown.elapsedTime >= 1000) {
                countDown.seconds--;
                countDown.elapsedTime -= 1000;
            }
            direction = 0;
            return;
        }
        timer.elapsedTime += elapsedTime;
        while(timer.elapsedTime >= timer.updateRate) {
            timer.elapsedTime -= timer.updateRate;
            Game.GameOver = Game.GameOver || (!move());
        }
        if(Game.GameOver)
        {
            Game.score = numBlocks;
            updateHighScores(numBlocks);
            Game.GameState = 4;
        }
    }

    function placeFood() {
        let placed = false;
        while(!placed) {
            let loc = Math.floor(Math.random()*2500);
            if(board[loc] == 'EMPTY') {
                placed = true;
                board[loc] = 'FOOD';
            }
        }
    }

    function render() {
        Game.context.save();
        
        Game.context.fillStyle = 'rgb(0,0,255)';
        Game.context.fillRect(0,0,Game.canvas.width,Game.canvas.height);
        Game.context.fill();
        let subwidth = Game.canvas.width / 50;
        let subheight = Game.canvas.height / 50;
        for(let i = 0; i < board.length; i++) {
            let x = 0;
            let y = 0;
            x = (i % 50)*subwidth;
            y = (Math.floor(i/50))*subheight;
            Game.context.strokeStyle = 'rgb(0,0,0)';
            Game.context.lineWidth = 2;
            switch(board[i]) {
                case 'EMPTY':
                    Game.context.fillStyle = 'rgba()';
                    Game.context.strokeStyle = 'rgb(0,0,255)';
                    break;
                case 'PLAYER':
                    Game.context.fillStyle = 'rgb(255,255,255)';
                    break;
                case 'OBSTACLE':
                    Game.context.fillStyle = 'rgb(0,255,0)';
                    break;
                case 'BORDER':
                    Game.context.fillStyle = 'rgb(255,0,0)';
                    Game.context.strokeStyle = 'rgb(255,0,0)';
                    break;
                case 'FOOD':
                    Game.context.fillStyle = 'rgb(255,150,0)';
            }
            if(board[i] !== 'EMPTY')
            {
                Game.context.fillRect(x,y,subwidth,subheight);
                Game.context.strokeRect(x,y,subwidth,subheight);
                Game.context.stroke();
                Game.context.fill();
            }
        }
        if(countDown.seconds > 0) {
            Game.context.font = "80px Georgia";
            Game.context.fillStyle = 'rgb(255,255,255)';
            Game.context.strokeStyle = 'rgb(0,0,0)';
            Game.context.fillText(countDown.seconds.toString(),Game.canvas.width/2,Game.canvas.height/2);
            Game.context.strokeText(countDown.seconds.toString(),Game.canvas.width/2,Game.canvas.height/2);
            Game.context.fill();
        }
        Game.context.strokeStyle = 'rgb(0,0,0)';
        Game.context.strokeRect(subwidth,subheight,(Game.canvas.width - 2*subwidth), (Game.canvas.height - 2*subheight));
        Game.context.stroke();
        Game.context.restore();
    }

    function changeDirection(newDirection) {
        // 1 is up
        // 2 is right
        // 3 is down
        // 4 is left
        switch(newDirection) {
            case 1:
                if(direction !== 3) direction = newDirection;
                break;
            case 2:
                if(direction !== 4) direction = newDirection;
                break;
            case 3:
                if(direction !== 1) direction = newDirection;
                break;
            case 4:
                if(direction !== 2) direction = newDirection;
                break;
            default:
                direction = newDirection;
                break;
            
        }
    }

    return {
        update: update,
        render: render,
        init: init,
        direction: changeDirection
      }
})();