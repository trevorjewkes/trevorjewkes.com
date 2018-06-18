Game.main = (function(input,player) {

    let context = Game.context;

    let prevTime = 0;

    let backgroundImg = new Image();
    backgroundImg.isReady = false
    backgroundImg.onload = function(){
        this.isReady = true;
    };
    backgroundImg.src = 'Resources/background.png';

    let addBall = true;
    let prevScore =  0;

    let myKeyboard = input.Keyboard();

    let myMouse = input.Mouse();

    let prevState = -1;

    let countDown = true;

    let timer = {remaining: 3000, seconds: 3};

    player.makePlayer({
        imageSource: 'Resources/player.png',
        location: {x: 500, y: 900},
        width: 100,
        height: 25
    });

    function startNewGame() {
        Game.score = 0;
        prevScore = 0;
        Game.lives = 2;
        player.reset({
            x:500, y: 900
        });
        Game.Board.reset();
        Game.Ball.reset();
        Game.ParticleSystem.reset();
    }

    function drawScore() {
        context.save();
        context.font ="20px Georgia";
        context.fillStyle = 'rgb(255,255,255)';
        context.fillText("Score: " + Game.score, 800, 950);
        context.restore();
        
    }

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
        myMouse.update(elapsedTime);
    }

    function updateGameState() {    

        if(prevState === Game.GameState) return;
        

        myMouse.unregisterCommand('mousemove');
        myMouse.unregisterCommand('mouseup');
        myMouse.unregisterCommand('mousedown');

        myKeyboard.unregisterCommand(KeyEvent.DOM_VK_ESCAPE);
        myKeyboard.unregisterCommand(KeyEvent.DOM_VK_LEFT);
        myKeyboard.unregisterCommand(KeyEvent.DOM_VK_RIGHT);
        
        switch(Game.GameState) {
            case 0: {
                subrender = Game.MainMenu.render;
                subupdate = Game.MainMenu.update;
                myMouse.registerCommand('mousemove',Game.MainMenu.mouseMove);
                myMouse.registerCommand('mousedown',Game.MainMenu.mouseDown);
                Game.MainMenu.reset();
                break;
            }
            case 1: {
                subrender = Game.HighScoreMenu.render;
                subupdate = Game.HighScoreMenu.update;
                myMouse.registerCommand('mousemove',Game.HighScoreMenu.mouseMove);
                myMouse.registerCommand('mousedown',Game.HighScoreMenu.mouseDown);
                Game.HighScoreMenu.reset();
                break;
            }
            case 2: {
                subrender = Game.CreditsMenu.render;
                subupdate = Game.CreditsMenu.update;
                myMouse.registerCommand('mousemove', Game.CreditsMenu.mouseMove);
                myMouse.registerCommand('mousedown',Game.CreditsMenu.mouseDown);
                Game.CreditsMenu.reset();
                break;
            }
            case 3: {
                subrender = gameRender;
                subupdate = gameUpdate;
                myKeyboard.registerCommand(KeyEvent.DOM_VK_LEFT,player.move.left);
                myKeyboard.registerCommand(KeyEvent.DOM_VK_RIGHT,player.move.right);
                myKeyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE,pause)
                if(prevState === 0) startNewGame();
                break;
            }
            case 4: {
                subrender = function() {
                                gameRender();
                                Game.PauseMenu.render();
                            }
                subupdate = Game.PauseMenu.update;
                myMouse.registerCommand('mousemove', Game.PauseMenu.mouseMove);
                myMouse.registerCommand('mousedown',Game.PauseMenu.mouseDown);
                Game.PauseMenu.reset();
                break;
            }
            case 5: {
                subrender = Game.EndGameMenu.render;
                subupdate = Game.EndGameMenu.update;
                myMouse.registerCommand('mousemove', Game.EndGameMenu.mouseMove);
                myMouse.registerCommand('mousedown',Game.EndGameMenu.mouseDown);
                Game.EndGameMenu.reset();
                Game.HighScoreMenu.updateHighScores(Game.score);
                break;
            }
            case 6: {
                subrender = Game.ControllsMenu.render;
                subupdate = Game.ControllsMenu.update;
                myMouse.registerCommand('mousemove', Game.ControllsMenu.mouseMove);
                myMouse.registerCommand('mousedown',Game.ControllsMenu.mouseDown);
                Game.ControllsMenu.reset();
                break;
            }
        }
        prevState = Game.GameState;
    }

    let subupdate = function(elapsedTime) {

    };

    function startLife() {
        countDown = true;
        timer.remaining = 3000;
        timer.seconds = 3;
        Game.Ball.addBall(player.pos());
        player.unshrink();
        Game.Ball.speed(0.2);
        Game.Board.resetBricksRemoved();
    }

    let gameUpdate = function(elapsedTime) {
        let balls = Game.Ball.balls();
        Game.ParticleSystem.update(elapsedTime);
        if(balls.length === 0 && Game.lives >= 0) startLife();
        if(countDown) {
            timer.remaining -= elapsedTime;
            timer.seconds = Math.ceil(timer.remaining / 1000);
            if(timer.seconds <= 0) {
                countDown = false;
            }
            Game.Ball.startBall(player.pos());
            return;
        }
        Game.Ball.update(elapsedTime);
        Game.Ball.checkPlayerCollide(player);
        
        let collcheck = null;
        for(let i = 0; i < balls.length; i++) {
            let ball = balls[i];
            let collcheck = Game.Board.collision(ball);
            player.shrink(collcheck.paddle);
            Game.Ball.direction(ball.idx,{x: collcheck.x, y: collcheck.y});
        }
        
        while(Game.score - prevScore >= 100 && Game.score !== 0) {
            
                Game.Ball.addBall(player.pos());
                prevScore += 100;
        }
        if(Game.score - prevScore <= 100) {
            addBall = true;
        }

        
        

    }

    function update(elapsedTime) {
       
        updateGameState();        
        subupdate(elapsedTime);
        
    }

    let gameRender = function(elapsedTime) {
        Game.ParticleSystem.render();
        if(countDown) {
            context.save();
            context.font = "80px Georgia";
            context.fillStyle = 'rgb(255,255,255)';
            context.fillText(timer.seconds,500,500);
            context.restore();
        }

        player.draw();
        Game.Board.draw();
        Game.Ball.draw();
        player.drawLives();
        
        drawScore();
    }

    let subrender = function(elapsedTime) {

    };

    let render = function(elapsedTime) {
        context.clearRect(0,0,1000,1000);
        context.lineWidth = 10;
        if(backgroundImg.isReady) {
            context.drawImage(backgroundImg,0,0,1000,1000);
        }
        context.fill();
        subrender();
    };

    function gameloop(currentTime) {
        let elapsedTime = currentTime - prevTime;
        prevTime = currentTime;
        
        processInput(elapsedTime);

        update(elapsedTime);

        render(elapsedTime);

        requestAnimationFrame(gameloop);
    }

    function pause(e) {
        Game.GameState = 4;
    }    

    requestAnimationFrame(gameloop);


})(Game.input,Game.Player);