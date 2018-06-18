Game.main = (function() {
    let context = Game.context;

    let prevTime = 0;
    let prevState = -1;

    let backgroundImg = new Image();
    backgroundImg.isReady = false
    backgroundImg.onload = function(){
        this.isReady = true;
    };
    backgroundImg.src = 'assets/background.png';

    function updateGameState() {    

        if(prevState === Game.GameState) return;
        switch(Game.GameState) {
            case 0: {
                subRender = Game.MainMenu.render;
                subUpdate = Game.MainMenu.update;
                Game.MainMenu.init();
                break;
            }
            case 1: {
                subRender = Game.Board.render;
                subUpdate = Game.Board.update;
                if(prevState === 0) Game.Board.init();
                break;
            }
            case 2: {
                subRender = Game.HighScoresMenu.render;
                subUpdate = Game.HighScoresMenu.update;
                Game.HighScoresMenu.init();
                break;
            }
            case 3: {
                subRender = Game.CreditsMenu.render;
                subUpdate = Game.CreditsMenu.update;
                Game.CreditsMenu.init();
                break;
            }
            case 4: {
                subRender = Game.GameOverMenu.render;
                subUpdate = Game.GameOverMenu.update;
                Game.GameOverMenu.init();
                break;
            }
        }
        prevState = Game.GameState;
    }

    function mainUpdate(elapsedTime) {
        updateGameState();
        Game.Keyboard.update(elapsedTime);
        Game.Mouse.update(elapsedTime);
        subUpdate(elapsedTime);
    }

    function mainRender(elapsedTime) {
        context.clearRect(0,0,Game.canvas.width,Game.canvas.height);
        context.fillStyle = 'rgb(255,255,255)';
        context.fillRect(0,0,Game.canvas.width,Game.canvas.height);
        context.fill();
        if(Game.GameState !== 1) {
            if(backgroundImg.isReady) {
                context.drawImage(backgroundImg,0,0,Game.canvas.width,Game.canvas.height);
            }
        }
        subRender();
    }

    let subUpdate = function(){};
    let subRender = function(){};

    function gameloop(currentTime) {
        let elapsedTime = currentTime - prevTime;
        prevTime = currentTime;

        mainUpdate(elapsedTime);
        mainRender();
        requestAnimationFrame(gameloop);
    }

    requestAnimationFrame(gameloop);

})();