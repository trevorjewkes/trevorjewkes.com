let Game = {};

Game.canvas = document.getElementById('canvas-main');
Game.MaxWidth = screen.width;
Game.MaxHeight = screen.height;

Game.score = 0;

Game.bResize = false;

Game.HighScores = [];

Game.GameOver = false;

NumHighScores = 5;

function getHighScores() {
    Game.HighScores.length = 0;
    let scores = JSON.parse(window.localStorage.getItem('MiniGame.HighScores'));

    if (scores === null) {
        for(let i = 0; i < NumHighScores; i++){
            Game.HighScores.push(0);
        }
        return;
    }
    for(let k in scores) {
        Game.HighScores.push(scores[k]);
    }
}

getHighScores();

function resetScores() {
    Game.HighScores.length = 0;
    for(let i = 0; i < NumHighScores; i++){
        Game.HighScores.push(0);
    }
    let scores = {};
    for(let i = 0; i < Game.HighScores.length; i++) {
        scores[i] = Game.HighScores[i];
    }
    localStorage['MiniGame.HighScores'] = JSON.stringify(scores);
}

function updateHighScores(score) {
    Game.HighScores.push(score);
    Game.HighScores.sort(function(a,b){
        return b > a;
    });
    Game.HighScores.splice(Game.HighScores.length-1,1);
    let scores = {};
    for(let i = 0; i < Game.HighScores.length; i++) {
        scores[i] = Game.HighScores[i];
    }
    localStorage['MiniGame.HighScores'] = JSON.stringify(scores);
}

Game.context = (function() {
    let context =  Game.canvas.getContext('2d');    
    window.addEventListener('resize', () => {
        Game.canvas.width = window.innerWidth;
        Game.canvas.height = window.innerHeight;
        Game.bResize = true;
    }, false);
    
    Game.canvas.width = window.innerWidth;
    Game.canvas.height = window.innerHeight;
    return context;
})();



Game.GameState = 0;
