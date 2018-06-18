MazeGame.game = (function() {

    let highScores = [];

    for(let i = 0; i < 10; i++) {
        highScores.push({score: 0, time: {
            minutes: 99,
            seconds: 59
        }});
    }

    function gotoscreen(fromId, toId) {
        document.getElementById(fromId).style.display = "none";
        document.getElementById(toId).style.display = "block";
    }

    function updateHS(newScore) {
        highScores.push(newScore);
        highScores.sort(function(a,b){
            if(a.score === b.score) {
                if(a.time.minutes === b.time.minutes) {
                    return a.time.seconds-b.time.seconds;
                }
                else return a.time.minutes-b.time.minutes;
            }
            else return b.score - a.score;
        });
        console.log(highScores[highScores.length-1]);
        highScores.splice(highScores.length - 1, 1);        
    }

    function getHighScores() {
        return highScores;
    }

    return {
        goto: gotoscreen,
        updateHS: updateHS,
        highScores: getHighScores
    };

})();

document.getElementById('game-main').onclick = function(){
    MazeGame.game.goto('game-div','main-menu-div');
};

document.getElementById('btnStart').onclick = function() {
    MazeGame.game.goto('main-menu-div','size-menu-div');
}

document.getElementById('btnHighScores').onclick = function() {
    let hs = MazeGame.game.highScores();
    let filler = document.getElementById('highscores');
    filler.innerHTML = '<h2>SCORE&nbsp&nbspTIME</h2>';
    for(let s in hs) {
        let score = hs[s];
        let mbuf = '0';
        let tab = '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + 
        '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
        if(score.time.minutes >= 10) mbuf = '';
        let sbuf = '0';
        if(score.time.seconds >= 10) sbuf = '';
        filler.innerHTML +=  '<h3>' + score.score + tab +
        mbuf + score.time.minutes + ':' + sbuf + 
        score.time.seconds + 
        '<h3>';
    }
    MazeGame.game.goto('main-menu-div','high-score-div');
}

document.getElementById('btnCredits').onclick = function() {
    MazeGame.game.goto('main-menu-div','credits-div');
}

document.getElementById('credits-main').onclick = function(){
    MazeGame.game.goto('credits-div','main-menu-div');
};

document.getElementById('hs-main').onclick = function(){
    MazeGame.game.goto('high-score-div','main-menu-div');
};

document.getElementById('size-main').onclick = function(){
    MazeGame.game.goto('size-menu-div','main-menu-div');
};

document.getElementById('5x5').onclick = function() {
    MazeGame.game.goto('size-menu-div','game-div');
    MazeGame.main.init(5);
}

document.getElementById('10x10').onclick = function() {
    MazeGame.game.goto('size-menu-div','game-div');
    MazeGame.main.init(10);
}

document.getElementById('15x15').onclick = function() {
    MazeGame.game.goto('size-menu-div','game-div');
    MazeGame.main.init(15);
}

document.getElementById('20x20').onclick = function() {
    MazeGame.game.goto('size-menu-div','game-div');
    MazeGame.main.init(20);
}

document.getElementById('finish-main').onclick = function() {
    MazeGame.game.goto('finish-div','main-menu-div');
}