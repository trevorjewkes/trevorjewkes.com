Game.Keyboard = Game.input.Keyboard();
Game.Mouse = Game.input.Mouse();

function CreateMenu(spec) {
    let that = {};
    let context = spec.context;
    let title = spec.title;
    that.text = spec.text;
    that.bUpdate = true;
    let options = spec.options;
    let colors = spec.colors;
    let choices = [];
    let currentChoice = -1;

    let width = Game.canvas.width;
    let height = Game.canvas.height;

    for(let i = 0; i < options.length; i++) {
        context.font = options[i].font*(Game.canvas.height/Game.MaxHeight).toString() + 'px ' + spec.font;
        options[i].width = context.measureText(options[i].text).width;
        options[i].height = context.measureText("m").width;
        options[i].x = (width/2) - (options[i].width/2);
    }
    for(let i = 0; i < that.text.length; i++) {
        context.font = that.text[i].font*(Game.canvas.height/Game.MaxHeight).toString() + 'px ' + spec.font;
        that.text[i].width = context.measureText(that.text[i].text).width;
        that.text[i].height = context.measureText("m").width;
        that.text[i].x = (width/2) - (that.text[i].width/2);
    }
    context.font = title.font*(Game.canvas.height/Game.MaxHeight).toString() + 'px ' + spec.fonts;
    title.width = context.measureText(title.text).width;
    title.height = context.measureText("m").width;
    title.x = (width/2) - (title.width/2);

    that.init = function() {
        choices.length = 0;
        currentChoice = -1;
        for(let i = 0; i < options.length; i++)
            choices.push(false);

        Game.Keyboard.unregisterAllHandlers();
        Game.Mouse.unregisterAllCommands();
        Game.Keyboard.registerHandler(that.choiceUp,Game.input.KeyEvent.DOM_VK_UP,false);
        Game.Keyboard.registerHandler(that.choiceDown,Game.input.KeyEvent.DOM_VK_DOWN,false);
        Game.Keyboard.registerHandler(that.selectChoice,Game.input.KeyEvent.DOM_VK_RETURN,false);
        Game.Keyboard.registerHandler(that.selectChoice,Game.input.KeyEvent.DOM_VK_ENTER,false);
        Game.Mouse.registerCommand('mousemove',that.handleMouseMove);
        Game.Mouse.registerCommand('mousedown',that.handleMouseDown);

        width = Game.canvas.width;
        height = Game.canvas.height;
        Game.bResize = false;
        for(let i = 0; i < options.length; i++) {
            context.font = options[i].font*(Game.canvas.height/Game.MaxHeight).toString() + 'px ' + spec.font;
            options[i].width = context.measureText(options[i].text).width;
            options[i].height = context.measureText("m").width;
            options[i].x = (width/2) - (options[i].width/2);
        }
        for(let i = 0; i < that.text.length; i++) {
            context.font = that.text[i].font*(Game.canvas.height/Game.MaxHeight).toString() + 'px ' + spec.font;
            that.text[i].width = context.measureText(that.text[i].text).width;
            that.text[i].height = context.measureText("m").width;
            that.text[i].x = (width/2) - (that.text[i].width/2);
        }
        context.font = title.font*(Game.canvas.height/Game.MaxHeight).toString() + 'px ' + spec.font;
        title.width = context.measureText(title.text).width;
        title.height = context.measureText("m").width;
        title.x = (width/2) - (title.width/2);
    }

    that.render = function() {
        context.save();
        context.strokeStyle = spec.stroke;
        context.font = title.font*(Game.canvas.height/Game.MaxHeight).toString() + 'px ' + spec.font;
        context.fillStyle = title.fill;
        context.fillText(title.text,title.x,title.y*(height / Game.MaxHeight));
        context.strokeText(title.text,title.x,title.y*(height / Game.MaxHeight));
        for(let i = 0;  i < that.text.length; i++) {
            context.font = that.text[i].font*(Game.canvas.height/Game.MaxHeight).toString() + 'px ' + spec.font;
            context.fillStyle = that.text[i].fill;     
            context.fillText(that.text[i].text,that.text[i].x, that.text[i].y*(height / Game.MaxHeight));      
            context.strokeText(that.text[i].text,that.text[i].x,that.text[i].y*(height / Game.MaxHeight));
        }
        for(let i = 0; i < options.length; i++) {
            context.font = options[i].font*(Game.canvas.height/Game.MaxHeight).toString() + 'px ' + spec.font;
            context.fillStyle = colors[0];
            context.strokeStyle = spec.stroke;
            if(choices[i])
            {
                context.fillStyle = colors[1];
                context.strokeStyle = colors[0];
            } 
            context.fillText(options[i].text,options[i].x, options[i].y*(height / Game.MaxHeight));
            context.strokeText(options[i].text,options[i].x, options[i].y*(height / Game.MaxHeight));
        }
        context.fill();
        context.stroke();
        context.restore();
    };
    
    that.update = function(elapsedTime) {
        spec.update(elapsedTime,that);
        if(Game.bResize || that.bUpdate) {
            width = Game.canvas.width;
            height = Game.canvas.height;
            Game.bResize = false;
            that.bUpdate = false;
            for(let i = 0; i < options.length; i++) {
                context.font = options[i].font*(Game.canvas.height/Game.MaxHeight).toString() + 'px ' + spec.font;
                options[i].width = context.measureText(options[i].text).width;
                options[i].height = context.measureText("m").width;
                options[i].x = (width/2) - (options[i].width/2);
            }
            for(let i = 0; i < that.text.length; i++) {
                context.font = that.text[i].font*(Game.canvas.height/Game.MaxHeight).toString() + 'px ' + spec.font;
                that.text[i].width = context.measureText(that.text[i].text).width;
                that.text[i].height = context.measureText("m").width;
                that.text[i].x = (width/2) - (that.text[i].width/2);
            }
            context.font = title.font*(Game.canvas.height/Game.MaxHeight).toString() + 'px ' + spec.font;
            title.width = context.measureText(title.text).width;
            title.height = context.measureText("m").width;
            title.x = (width/2) - (title.width/2);
        }        
    }

    that.handleMouseMove = function(e,elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        let x = (e.clientX - rect.left)*(width/rect.width);
        let y = (e.clientY - rect.top)*(height/rect.height);
        for(let i = 0; i < options.length; i++) {
            let t = options[i];
            if(x <= t.x + t.width && x >= t.x && y <= t.y*(height / Game.MaxHeight) && y >= t.y*(height / Game.MaxHeight) - t.height) {
                choices[i] = true;
                currentChoice = i;
            }
            else choices[i] = false;
        }
    }

    that.handleMouseDown = function(e,elapsedTime) {
        let rect = document.getElementById('canvas-main').getBoundingClientRect();
        let x = (e.clientX - rect.left)*(width/rect.width);
        let y = (e.clientY - rect.top)*(height/rect.height);
        for(let i = 0; i < options.length; i++) {
            let t = options[i];
            if(x <= t.x + t.width && x >= t.x && y <= t.y*(height / Game.MaxHeight) && y >= t.y*(height / Game.MaxHeight) - t.height) {
                Game.GameState = t.gameState;
            }
        }
    }

    that.choiceUp = function(elapsedTime) {
        if(currentChoice === -1) currentChoice = 1;
        else choices[currentChoice] = false;
        currentChoice--;
        if(currentChoice < 0) currentChoice += choices.length;        
        choices[currentChoice] = true;
    }

    that.choiceDown = function(elapsedTime) {
        if(currentChoice !== -1) choices[currentChoice] = false;
        currentChoice++;
        if(currentChoice >= choices.length) currentChoice -= choices.length;        
        choices[currentChoice] = true;
    }

    that.selectChoice = function(elapsedTime) {
        if(currentChoice !== -1)
        {
            Game.GameState = options[currentChoice].gameState;
        }
    }

    return that;
}

Game.MainMenu = CreateMenu({
    context: Game.context,
    title: {
        font: 80,
        fill: 'rgb(255,255,255)',
        text: "MiniGame - SNAKE",
        y: 100
    },
    text: [],
    options: [{
        font: 60,
        y: 300,
        text: 'PLAY GAME',
        gameState: 1
    },
    {
        font: 60,
        y: 500,
        text: 'HIGH SCORES',
        gameState: 2
    },
    {
        font: 60,
        y: 700,
        text: 'CREDITS',
        gameState: 3
    }],
    colors: ['rgb(255,255,255)','rgb(0,0,0)'],
    stroke: 'rgb(0,0,0)',
    font: 'Georgia',
    update: that => {}
});

Game.CreditsMenu = CreateMenu({
    context: Game.context,
    title: {
        font: 80,
        fill: 'rgb(255,255,255)',
        text: 'CREDITS',
        y: 100
    },
    text: [{
        font: 60,
        fill: 'rgb(255,255,255)',
        text: 'Game created by Trevor Jewkes',
        y: 400
    }],
    options: [{
        font: 50,
        y:700,
        text: 'BACK',
        gameState: 0
    }],
    colors: ['rgb(255,255,255)','rgb(0,0,0)'],
    stroke: 'rgb(0,0,0)',
    font: 'Georgia',
    update: that => {}
});

Game.HighScoresMenu = CreateMenu({
    context: Game.context,
    title: {
        font: 80,
        fill: 'rgb(255,255,255)',
        text: 'HIGH SCORES',
        y: 100
    },
    text: [],
    options: [{
        font: 50,
        y:800,
        text: 'BACK',
        gameState: 0
    }],
    colors: ['rgb(255,255,255)','rgb(0,0,0)'],
    stroke: 'rgb(0,0,0)',
    font: 'Georgia',
    update: (elapsedTime,that) => {
        that.text.length = 0;
        for(let i = 0; i < Game.HighScores.length; i++)
        {
            that.text.push({
                font: 500/Game.HighScores.length,
                fill: 'rgb(255,255,255)',
                text: (i+1).toString() + ': ' + Game.HighScores[i],
                y: 200 + (i*((500/Game.HighScores.length)+10))
            });
        }
        that.bUpdate = true;
    }
});

Game.GameOverMenu = CreateMenu({
    context: Game.context,
    title: {
        font: 80,
        fill: 'rgb(255,255,255)',
        text: 'GAME OVER',
        y: 100
    },
    text: [{
        font: 60,
        fill: 'rgb(255,255,255)',
        text: '',//'Final score: ' + Game.score.toString(),
        y: 400
    }],
    options: [{
        font: 50,
        y:700,
        text: 'CONTINUE',
        gameState: 0
    }],
    colors: ['rgb(255,255,255)','rgb(0,0,0)'],
    stroke: 'rgb(0,0,0)',
    font: 'Georgia',
    update: (elapsedTime,that) => {
        that.text.length = 0;
        that.text.push({
            font: 70,
            fill: 'rgb(255,255,255)',
            text: 'Final score: ' + Game.score.toString(),
            y: 400
        });
        that.bUpdate = true;
    }
});