MazeGame.main = (function(graphics, maze, input) {
    'use strict';
    let prevTime = 0;
    let size = 0;
    let mazeSize = 0;

    let output = null;// = document.getElementById("GameOutput");

    let totalTime = 0;

    let gameTime = {
        minutes: 0,
        seconds: 0,
        totalTime: 0
    };

    let score = 0;

    let context = null;// = graphics.context;

    let bShowShortestPath = false;
    let bShowHint = false;
    let bShowScore = true;
    let bEndGameLoop = false;

    let myKeyboard = null;// = input.Keyboard();

    let imgSP = null;// = new Image();
    //imgSP.isReady = false;
    //imgSP.onload = function() {
    //    this.isReady = true;
    //}
    //imgSP.src = 'Images/sp.png';

    //maze.createMaze(size,size);
    let prevPos = null;// = maze.maze()[0][0];
    let shortestPath = null;// = maze.shortestPath();
    //console.log(shortestPath);

    function processInput(elapsedTime) {
        myKeyboard.processInput(elapsedTime);
    }

    function updateScore() {
        let lastIdx = shortestPath.length;
        if(lastIdx == 0) return;
        let pos = maze.playerPos();
        if(prevPos == pos) return;
        if(pos.visited) return;
        if(pos == shortestPath[lastIdx - 1]) {
            score += pos.points;
        } else {
            score += pos.points;
        }
    }

    function updateShortestPath() {
        let lastIdx = shortestPath.length;
        if(lastIdx === 0) {
            bEndGameLoop = true;
            MazeGame.game.updateHS({
                score: score,
                time: {
                    minutes: gameTime.minutes,
                    seconds: gameTime.seconds
                }
            });
            let mbuf = '0';
            if (gameTime.minutes >= 10) mbuf = '';
            let sbuf = '0';
            if(gameTime.seconds >= 10) sbuf = '';
            document.getElementById('finishText').innerHTML = "You finished the " +
            size + "X" + size + " maze in " + mbuf + gameTime.minutes + ":" +
            sbuf + gameTime.seconds + " with a score of " + score + "!";
            MazeGame.game.goto('game-div','finish-div');
            return;
        } 
        let pos = maze.playerPos();
        if(pos === prevPos) return;
        if(pos === shortestPath[lastIdx-1]) {
            shortestPath.splice(lastIdx - 1,1);
        }
        else {
            shortestPath.push(prevPos);

        }
        prevPos = pos;
        pos.visited = true;
    }

    function update(elapsedTime) {
        gameTime.totalTime += elapsedTime;
        while(gameTime.totalTime >= 1000) {
            gameTime.totalTime -= 1000;
            gameTime.seconds++;
        }
        if(gameTime.seconds >= 60) {
            gameTime.seconds -= 60;
            gameTime.minutes++;
        }
        updateScore();
        updateShortestPath();        
    }

    function toggleShortestPath(elapsedTime) {
        bShowShortestPath = !bShowShortestPath;
    }

    function renderShortestPath() {
        if(bShowShortestPath) {
            for(let cell in shortestPath)
            {
                if (imgSP.isReady) {
                    context.drawImage(imgSP,
                        shortestPath[cell].x * (mazeSize / size), shortestPath[cell].y * (mazeSize / size),
                    mazeSize / size, mazeSize / size);
                }
            }
        }
    }

    function renderScore() {
        if(bShowScore) {
            output.innerHTML += "Score: " + score + "<br><br>";
        }
    }

    function renderHint() {
        if(bShowHint) {
            if (imgSP.isReady) {
                let lastIdx = shortestPath.length;
                if(lastIdx === 0) return;
                lastIdx--;
                context.drawImage(imgSP,
                    shortestPath[lastIdx].x * (mazeSize / size),
                     shortestPath[lastIdx].y * (mazeSize / size),
                mazeSize / size, mazeSize / size);
            }
        }
    }
    
    function render(elapsedTime) {
        output.innerHTML = "";
        
        graphics.clear();
        maze.drawMaze();
        
        renderShortestPath();
        renderScore();
        renderHint();
        maze.drawPlayer();

        let secondBuf = "0";
        if(gameTime.seconds >= 10) secondBuf = "";
        let minuteBuf = "0";
        if(gameTime.minutes >= 10) minuteBuf = "";

        output.innerHTML += "Time: " + minuteBuf + gameTime.minutes + ":" + secondBuf + gameTime.seconds + "<br>";

        output.innerHTML += "<br>  Controls:<br><br>  Movement: WASD or IJKL<br> or Arrow Keys<br><br> Toggle Hint: H<br> Toggle Breadcrumbs: B<br>  " + 
        "Toggle Path to Finish: P<br>  Toggle Score Display: Y<br>";

    }

    function gameLoop(time) {
        let elapsedTime = time - prevTime;
        prevTime = time;
        processInput(elapsedTime);
        update(elapsedTime);
        render(elapsedTime);
        if(bEndGameLoop) return;
        requestAnimationFrame(gameLoop);
    }

    function toggleHint(e) {
        bShowHint = !bShowHint;
    }

    function toggleScore(e) {
        bShowScore = !bShowScore;
    }

    function init(sizeOfMaze) {
        size = sizeOfMaze;
        mazeSize = 1000;

        prevTime = performance.now();

        output = document.getElementById("GameOutput");

        totalTime = 0;

        gameTime.minutes = 0;
        gameTime.seconds = 0;
        gameTime.totalTime = 0;

        score = 0;

        context = graphics.context;

        bShowShortestPath = false;
        bShowHint = false;
        bShowScore = true;
        bEndGameLoop = false;

        myKeyboard = input.Keyboard();

        imgSP = new Image();
        imgSP.isReady = false;
        imgSP.onload = function() {
            this.isReady = true;
        }
        imgSP.src = 'Images/sp.png';

        maze.createMaze(size,size);
        prevPos = maze.maze()[0][0];
        shortestPath = maze.shortestPath();

        myKeyboard.registerCommand(KeyEvent.DOM_VK_W,maze.playerUp);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_S,maze.playerDown);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_A,maze.playerLeft);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_D,maze.playerRight);

        myKeyboard.registerCommand(KeyEvent.DOM_VK_I,maze.playerUp);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_K,maze.playerDown);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_J,maze.playerLeft);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_L,maze.playerRight);

        myKeyboard.registerCommand(KeyEvent.DOM_VK_UP,maze.playerUp);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_DOWN,maze.playerDown);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_LEFT,maze.playerLeft);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_RIGHT,maze.playerRight);

        myKeyboard.registerCommand(KeyEvent.DOM_VK_P,toggleShortestPath);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_H,toggleHint);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_B,maze.toggleBreadCrumbs);
        myKeyboard.registerCommand(KeyEvent.DOM_VK_Y,toggleScore);
        requestAnimationFrame(gameLoop);
    }

    //init(20);    
    

    return {
        init: init
    };

})(MazeGame.graphics, MazeGame.maze, MazeGame.input);