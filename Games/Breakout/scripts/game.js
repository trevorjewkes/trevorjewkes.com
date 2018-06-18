let Game = {};

Game.context = (function() {
    let canvas = document.getElementById('canvas-main');
    return canvas.getContext('2d');
})();

Game.GameState = 0;

Game.score = 0;

Game.lives = 2;

Game.MainMenu = (function() {
    let context = Game.context;

    let colors = {
        regular: 'rgb(255,255,255)',
        highlighted: 'rgb(255,255,0)'
    }

    let text = [];

    let choices = [false, false, false, false, false];
    
    (function setText() {
        context.font = '80px Georgia';
        let msg = 'BREAKOUT';
        let width = context.measureText(msg).width;
        let height = context.measureText('m').width;

        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 200,
            font: context.font
        });


        context.font = '60px Georgia';
        msg = 'NEW GAME';
        width = context.measureText(msg).width;
        height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 500,
            font: context.font
        });

        msg = 'CONTROLS';
        width = context.measureText(msg).width;
        height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 600,
            font: context.font
        });

        msg = 'HIGH SCORES';
        width = context.measureText(msg).width;
        height = context.measureText("m").width;
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 700,
            font: context.font
        });

        msg = 'CREDITS';
        width = context.measureText(msg).width;
        height = context.measureText("m").width;
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 800,
            font: context.font
        });
    })();

    function render()
    {
        //Draw Background
        context.save();
        context.strokeStyle = 'rgb(0,0,0)';
        for(let i = 0; i < text.length; i++) {
            context.font = text[i].font;
            context.fillStyle = colors.regular;
            if(choices[i]) context.fillStyle = colors.highlighted;
            context.strokeText(text[i].text,text[i].x,text[i].y);
            context.fillText(text[i].text,text[i].x,text[i].y);
        }
        context.restore();
    }

    function update(elapsedTime) {

    }

    function handleMousePos(e, elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        
        let x = (e.clientX - rect.x)*(1000/rect.width);
        let y = (e.clientY - rect.y)*(1000/rect.height);
        for(let i = 1; i < text.length; i++) {
            let t = text[i];
            if(x <= t.x + t.width && x >= t.x && y <= t.y && y >= t.y - t.height) {
                choices[i] = true;
            }
            else choices[i] = false;
        }

    }

    function handleMouseDown(e, elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        
        let x = (e.clientX - rect.x)*(1000/rect.width);
        let y = (e.clientY - rect.y)*(1000/rect.height);
        for(let i = 1; i < text.length; i++) {
            let t = text[i];
            if(x <= t.x + t.width && x >= t.x && y <= t.y && y >= t.y - t.height) {
                if(i === 1) Game.GameState = 3;
                if(i === 2) Game.GameState = 6;
                if(i === 3) Game.GameState = 1;
                if(i === 4) Game.GameState = 2;
            }
        }
    }

    function reset() {
        choices = [false, false, false];
    }

    return {
        render: render,
        update: update,
        mouseMove: handleMousePos,
        mouseDown: handleMouseDown,
        reset: reset
    }
})();

Game.CreditsMenu = (function(){

    let context = Game.context; 

    let colors = {
        regular: 'rgb(255,255,255)',
        highlighted: 'rgb(255,255,0)'
    }

    let text = [];

    let choices = [false, false, false];

    (function setText() {
        context.font = '80px Georgia';
        let msg = 'CREDITS';
        let width = context.measureText(msg).width;
        let height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 200,
            font: context.font
        });

        context.font = '70px Georgia';
        msg = 'Game created by Trevor Jewkes';
        width = context.measureText(msg).width;
        height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 400,
            font: context.font
        });

        context.font = '60px Georgia';
        msg = 'BACK';
        width = context.measureText(msg).width;
        height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 800,
            font: context.font
        });
    })();
    

    function render()
    {
        context.save();
        
        context.strokeStyle = 'rgb(0,0,0)';
        for(let i = 0; i < text.length; i++) {
            context.font = text[i].font;
            context.fillStyle = colors.regular;
            if(choices[i]) context.fillStyle = colors.highlighted;
            context.strokeText(text[i].text,text[i].x,text[i].y);
            context.fillText(text[i].text,text[i].x,text[i].y);
        }
        context.restore();
    }

    function update() {

    }

    function handleMousePos(e, elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        
        let x = (e.clientX - rect.x)*(1000/rect.width);
        let y = (e.clientY - rect.y)*(1000/rect.height);
        for(let i = 2; i < text.length; i++) {
            let t = text[i];
            if(x <= t.x + t.width && x >= t.x && y <= t.y && y >= t.y - t.height) {
                choices[i] = true;
            }
            else choices[i] = false;
        }
    }

    function handleMouseDown(e, elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        
        let x = (e.clientX - rect.x)*(1000/rect.width);
        let y = (e.clientY - rect.y)*(1000/rect.height);
        for(let i = 2; i < text.length; i++) {
            let t = text[i];
            if(x <= t.x + t.width && x >= t.x && y <= t.y && y >= t.y - t.height) {
                Game.GameState = 0;
            }
        }
    }

    function reset() {
        choices = [false, false, false]
    }

    return {
        render: render,
        update:update,
        mouseMove: handleMousePos,
        mouseDown: handleMouseDown,
        reset: reset
    }
})();

Game.HighScoreMenu = (function(){

    let colors = {
        regular: 'rgb(255,255,255)',
        highlighted: 'rgb(255,255,0)'
    }

    let text = [];

    let choices = [false, false, false];

    let highScores = [];

    let context = Game.context; 

    (function setText() {
        context.font = '80px Georgia';
        let msg = 'HIGH SCORES';
        let width = context.measureText(msg).width;
        let height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 200,
            font: context.font
        });

        context.font = '60px Georgia';
        msg = 'BACK';
        width = context.measureText(msg).width;
        height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 800,
            font: context.font
        });

        context.font = '30px Georgia';
        msg = 'RESET SCORES';
        width = context.measureText(msg).width;
        height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 900,
            font: context.font
        });

    })();

    function render() {
        context.save();
        
        context.strokeStyle = 'rgb(0,0,0)';
        for(let i = 0; i < text.length; i++) {
            context.font = text[i].font;
            context.fillStyle = colors.regular;
            if(choices[i]) context.fillStyle = colors.highlighted;
            context.strokeText(text[i].text,text[i].x,text[i].y);
            context.fillText(text[i].text,text[i].x,text[i].y);
        }

        context.fillStyle = colors.regular;
        context.font = "60px Georgia";
        for(let i = 0; i < highScores.length; i++) {
            let msg = ' ' + (i+1) + ':     ' + highScores[i];
            let width = context.measureText(msg).width;
            context.strokeText(msg, 500 - (width/2), (i*75) + 350);
            context.fillText(msg, 500 - (width/2), (i*75) + 350);
        }

        context.restore();
    }

    function update() {

    }

    function handleMousePos(e, elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        
        let x = (e.clientX - rect.x)*(1000/rect.width);
        let y = (e.clientY - rect.y)*(1000/rect.height);
        for(let i = 1; i < text.length; i++) {
            let t = text[i];
            if(x <= t.x + t.width && x >= t.x && y <= t.y && y >= t.y - t.height) {
                choices[i] = true;
            }
            else choices[i] = false;
        }
    }

    function handleMouseDown(e, elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        
        let x = (e.clientX - rect.x)*(1000/rect.width);
        let y = (e.clientY - rect.y)*(1000/rect.height);
        for(let i = 1; i < text.length; i++) {
            let t = text[i];
            if(x <= t.x + t.width && x >= t.x && y <= t.y && y >= t.y - t.height) {
                if(i===1) Game.GameState = 0;
                if(i===2) resetScores();
            }
        }
    }

    function reset() {
        choices = [false, false, false];
        highScores.length = 0;
        let scores = JSON.parse(localStorage.getItem('Game.HighScores'));
        
        if (scores === null) {
            highScores = [0,0,0,0,0];
            return;
        }
        for(let k in scores) {
            highScores.push(scores[k]);
        }
    }

    function resetScores() {
        highScores = [0,0,0,0,0];
        let scores = {};
        for(let i = 0; i < highScores.length; i++) {
            scores[i] = highScores[i];
        }
        localStorage['Game.HighScores'] = JSON.stringify(scores);
    }

    function updateHighScores(score) {
        highScores.push(score);
        highScores.sort(function(a,b){
            return b > a;
        });
        highScores.splice(highScores.length-1,1);
        let scores = {};
        for(let i = 0; i < highScores.length; i++) {
            scores[i] = highScores[i];
        }
        localStorage['Game.HighScores'] = JSON.stringify(scores);
    }

    reset();

    return {
        render: render,
        update:update,
        mouseMove: handleMousePos,
        mouseDown: handleMouseDown,
        reset: reset,
        updateHighScores: updateHighScores
    }
})();

Game.PauseMenu = (function() {

    let context = Game.context;

    let choices = [false, false];

    let text = [];

    let colors = {
        regular: 'rgb(255,255,255)',
        highlighted: 'rgb(255,255,0)'
    };

    (function setText() {
        context.font = '60px Georgia';
        let msg = 'CONTINUE';
        let width = context.measureText(msg).width;
        let height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 400,
            font: context.font
        });

        context.font = '60px Georgia';
        msg = 'QUIT';
        width = context.measureText(msg).width;
        height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 500,
            font: context.font
        });
    })();

    function render() {
        context.save();
        
        context.strokeStyle = 'rgb(0,0,0)';
        for(let i = 0; i < text.length; i++) {
            context.font = text[i].font;
            context.fillStyle = colors.regular;
            if(choices[i]) context.fillStyle = colors.highlighted;
            context.strokeText(text[i].text,text[i].x,text[i].y);
            context.fillText(text[i].text,text[i].x,text[i].y);
        }

        context.restore();
    }

    function update() {

    }

    function handleMousePos(e, elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        
        let x = (e.clientX - rect.x)*(1000/rect.width);
        let y = (e.clientY - rect.y)*(1000/rect.height);
        for(let i = 0; i < text.length; i++) {
            let t = text[i];
            if(x <= t.x + t.width && x >= t.x && y <= t.y && y >= t.y - t.height) {
                choices[i] = true;
            }
            else choices[i] = false;
        }
    }

    function handleMouseDown(e, elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        
        let x = (e.clientX - rect.x)*(1000/rect.width);
        let y = (e.clientY - rect.y)*(1000/rect.height);
        for(let i = 0; i < text.length; i++) {
            let t = text[i];
            if(x <= t.x + t.width && x >= t.x && y <= t.y && y >= t.y - t.height) {
                if(i===0) Game.GameState = 3;
                if(i===1) Game.GameState = 0;
            }
        }
    }

    function reset() {
        choices = [false, false];
    }

    return {
        update: update,
        render: render,
        mouseDown: handleMouseDown,
        mouseMove: handleMousePos,
        reset: reset
    }
})();

Game.EndGameMenu = (function() {
    let context = Game.context;
    let color = 'rgb(255,255,255)';
    function update(elapsedTime) {

    }
    function render() {
        let msg = "GAME OVER";
        

        if(Game.lives >= 0) {
            msg = "CONGRATULATIONS!!!";
        }
        context.save();
        context.font = "80px Georgia";
        let width = context.measureText(msg).width;
        context.fillStyle = 'rgb(255,255,255)';
        context.strokeStyle = 'rgb(0,0,0)';
        context.strokeText(msg,500-(width/2),200);
        context.fillText(msg,500-(width/2),200);        

        context.font = "60px Georgia";
        msg = 'Your score is: ' + Game.score;
        width = context.measureText(msg).width;
        context.strokeText(msg,500 - (width/2),400);
        context.fillText(msg,500 - (width/2),400);

        context.font = "60px Georgia";
        context.fillStyle = color;
        context.strokeStyle = 'rgb(0,0,0)';
        msg = "BACK";
        width = context.measureText(msg).width;
        context.strokeText(msg, 500 - (width/2),800);
        context.fillText(msg, 500 - (width/2),800);

        context.restore();
    }
    function handleMousePos(e, elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        
        let x = (e.clientX - rect.x)*(1000/rect.width);
        let y = (e.clientY - rect.y)*(1000/rect.height);

        context.font = "60px Georgia";

        let width = context.measureText('BACK').width;
        let height = context.measureText('m').width;
        let x1 = 500 - (width/2);
        if(x <= x1 + width && x >= x1 && y <= 800 && y >= 800-height) {
            color = 'rgb(255,255,0)';
        }
        else color = 'rgb(255,255,255)';
    }
    function handleMouseDown(e, elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        
        let x = (e.clientX - rect.x)*(1000/rect.width);
        let y = (e.clientY - rect.y)*(1000/rect.height);

        context.font = "60px Georgia";

        let width = context.measureText('BACK').width;
        let height = context.measureText('m').width;
        let x1 = 500 - (width/2);
        if(x <= x1 + width && x >= x1 && y <= 800 && y >= 800-height) {
            Game.GameState = 0;
        }
    }
    function reset() {
        color = 'rgb(255,255,255)';
    }

    return {
        update: update,
        render: render,
        mouseMove: handleMousePos,
        mouseDown: handleMouseDown,
        reset: reset
    };
})();

Game.ControllsMenu = (function(){

    let context = Game.context; 

    let colors = {
        regular: 'rgb(255,255,255)',
        highlighted: 'rgb(255,255,0)'
    }

    let text = [];

    let choices = [false, false, false, false];

    (function setText() {
        context.font = '80px Georgia';
        let msg = 'CONTROLS';
        let width = context.measureText(msg).width;
        let height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 200,
            font: context.font
        });

        context.font = '70px Georgia';
        msg = 'Left/Right arrow keys to move';
        width = context.measureText(msg).width;
        height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 400,
            font: context.font
        });

        msg = 'ESC to pause';
        width = context.measureText(msg).width;
        height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 500,
            font: context.font
        });

        context.font = '60px Georgia';
        msg = 'BACK';
        width = context.measureText(msg).width;
        height = context.measureText("m").width;
        
        text.push({
            text: msg,
            width: width,
            height: height,
            x: 500 - (width/2),
            y: 800,
            font: context.font
        });
    })();
    

    function render()
    {
        context.save();
        
        context.strokeStyle = 'rgb(0,0,0)';
        for(let i = 0; i < text.length; i++) {
            context.font = text[i].font;
            context.fillStyle = colors.regular;
            if(choices[i]) context.fillStyle = colors.highlighted;
            context.strokeText(text[i].text,text[i].x,text[i].y);
            context.fillText(text[i].text,text[i].x,text[i].y);
        }
        context.restore();
    }

    function update() {

    }

    function handleMousePos(e, elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        
        let x = (e.clientX - rect.x)*(1000/rect.width);
        let y = (e.clientY - rect.y)*(1000/rect.height);
        for(let i = 3; i < text.length; i++) {
            let t = text[i];
            if(x <= t.x + t.width && x >= t.x && y <= t.y && y >= t.y - t.height) {
                choices[i] = true;
            }
            else choices[i] = false;
        }
    }

    function handleMouseDown(e, elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        
        let x = (e.clientX - rect.x)*(1000/rect.width);
        let y = (e.clientY - rect.y)*(1000/rect.height);
        for(let i = 3; i < text.length; i++) {
            let t = text[i];
            if(x <= t.x + t.width && x >= t.x && y <= t.y && y >= t.y - t.height) {
                Game.GameState = 0;
            }
        }
    }

    function reset() {
        choices = [false, false, false, false]
    }

    return {
        render: render,
        update:update,
        mouseMove: handleMousePos,
        mouseDown: handleMouseDown,
        reset: reset
    }
})();

//OPENGAMEART ==> Site to look at for images.