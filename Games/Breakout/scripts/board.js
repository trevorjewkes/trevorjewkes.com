Game.Board = (function () {
    let context = Game.context;

    let border = [];

    let bricks = [];

    let bricksInRow = [];

    let bricksRemoved = 0;

    let bricksRemaining = 0;

    let images = [];

    (function createImages() {

        let imgGreen = new Image();
        imgGreen.isReady = false;
        imgGreen.onload = function() {
            this.isReady = true;
        };
        imgGreen.src = 'Resources/greenbrick.png';

        images.push(imgGreen);

        let imgBlue = new Image();
        imgBlue.isReady = false;
        imgBlue.onload = function() {
            this.isReady = true;
        };
        imgBlue.src = 'Resources/bluebrick.png';

        images.push(imgBlue);

        let imgOrange = new Image();
        imgOrange.isReady = false;
        imgOrange.onload = function() {
            this.isReady = true;
        };
        imgOrange.src = 'Resources/orangebrick.png';

        images.push(imgOrange);

        let imgYellow = new Image();
        imgYellow.isReady = false;
        imgYellow.onload = function() {
            this.isReady = true;
        };
        imgYellow.src = 'Resources/yellowbrick.png';

        images.push(imgYellow);

        let imgGray = new Image();
        imgGray.isReady = false;
        imgGray.onload = function() {
            this.isReady = true;
        };
        imgGray.src = 'Resources/graybrick.png';

        images.push(imgGray);

    })();

    function CreateBrick(spec) {
        let that = {};

        that.draw = function() {
            if(that.shown) {
                context.drawImage(spec.img,spec.center.x - spec.width/2, spec.center.y - spec.height/2, spec.width, spec.height);                     
            }
        }

        that.points = spec.points;
        that.pos = spec.center;
        that.height = spec.height;
        that.shown = true;
        that.width = spec.width;
        that.color = spec.fillStyle;


        return that;
    }

    (function MakeBorder() {
        for(let i = 1; i < 14; i++)
        {
            border.push(CreateBrick({
                center: {x: 5, y: 1000 - (i*70) - 35},
                width: 10,
                height: 70,
                fillStyle: 'rgb(150,150,150)',
                strokeStyle: 'rgb(0,0,0)',
                img: images[4]
            }))
        }
        for(let i = 1; i < 14; i++)
        {
            border.push(CreateBrick({
                center: {x: 995, y: 1000 - (i*70) - 35},
                width: 10,
                height: 70,
                fillStyle: 'rgb(150,150,150)',
                strokeStyle: 'rgb(0,0,0)',
                img: images[4]
            }))
        }
        for(let i = 0; i < 14; i++)
        {
            border.push(CreateBrick({
                center: {x: (i*70) + 45, y: 15},
                width: 70,
                height: 10,
                fillStyle: 'rgb(150,150,150)',
                strokeStyle: 'rgb(0,0,0)',
                img: images[4]
            }))
        }
    })();

    function MakeBricks() {
        //green blue orange yellow (top to bottom)
        bricks.length = 0;
        let colors = ['rgb(0,255,0)','rgb(0,0,255)','rgb(255,127,0)','rgb(255,255,0)'];
        for(let i = 0; i < 4; i++) {
            let points = 5;
            if (i === 1) points = 3;
            if (i === 2) points = 2;
            if (i === 3) points = 1;
            for(let j = 0; j < 2; j++){
                for(let k = 0; k < 14; k++) {
                    bricks.push(CreateBrick({
                        center: {x: (k*70) + 45, y: (j+(2*i))*35 + 115},
                        width: 65,
                        height: 30,
                        fillStyle: colors[i],
                        strokeStyle: 'rgb(0,0,0)',
                        points: points,
                        img: images[i]
                    }));
                }
                bricksInRow.push(14);
                console.log(bricksInRow);
            }
        }
        bricksRemaining = bricks.length;
    }

    function renderBoard() {
        for(let i = 0; i < border.length; i++) {
            border[i].draw();
        }
        for(let i = 0; i < bricks.length; i++) {
            bricks[i].draw();
        }
        context.fill();
        context.stroke();
    }

    function checkCollision(ball) {
        let pos = ball.getPos();
        let incr = bricks.length / 8;
        let idx = 0;
        let change = { x: 1, y: 1, paddle: false};
        let adjusted = false;
        let changey = false;
        let changex = false;
        let cpad = false;
        if (pos.y + 20 >= bricks[0].pos.y - bricks[0].height/2 && pos.y - 20 <= bricks[bricks.length-1].pos.y + bricks[bricks.length-1].height/2) {
            if(pos.y + 20 >= bricks[idx].pos.y - bricks[idx].height/2 && pos.y - 10 <= bricks[idx+incr].pos.y + bricks[idx+incr].height/2) {
                let val = checkRowCollision(pos,idx,incr,0);
                changey = changey || val.y;
                changex = changex || val.x;
                cpad = cpad || val.paddle;
            }
            idx += incr*2;
            if(pos.y + 20 >= bricks[idx].pos.y - bricks[idx].height/2 && pos.y - 10 <= bricks[idx+incr].pos.y + bricks[idx+incr].height/2) {
                let val = checkRowCollision(pos,idx,incr,2);
                changey = changey || val.y;
                changex = changex || val.x;
                cpad = cpad || val.paddle;
            }
            idx += incr*2;
            if(pos.y + 20 >= bricks[idx].pos.y - bricks[idx].height/2 && pos.y - 10 <= bricks[idx+incr].pos.y + bricks[idx+incr].height/2) {
                let val = checkRowCollision(pos,idx,incr,4);
                changey = changey || val.y;
                changex = changex || val.x;
                cpad = cpad || val.paddle;
            }
            idx += incr*2;
            if(pos.y + 20 >= bricks[idx].pos.y - bricks[idx].height/2 && pos.y - 10 <= bricks[idx+incr].pos.y + bricks[idx+incr].height/2) {
                let val = checkRowCollision(pos,idx,incr,6);
                changey = changey || val.y;
                changex = changex || val.x;
                cpad = cpad || val.paddle;
            }
        }
        if(changey) change.y *= -1;
        if(changex) change.x *= -1;
        change.paddle = cpad;

        if(bricksRemoved >= 4)
        {
            Game.Ball.speed(.4);
        }
        if(bricksRemoved >= 12)
        {
            Game.Ball.speed(.6);
        }
        if(bricksRemoved >= 36)
        {
            Game.Ball.speed(.8);
        }
        if(bricksRemoved >= 62)
        {
            Game.Ball.speed(1);
        }
        if(bricksRemaining === 0) Game.GameState = 5;
        return change;
    }

    function checkRowCollision(pos,idx,incr,rowId) {
        let change = {x: false, y: false, paddle: false};
        if(pos.y + 20 >= bricks[idx].pos.y - bricks[idx].height/2 && pos.y - 10 <= bricks[idx].pos.y + bricks[idx].height/2) {
            for(let i = idx; i < idx+incr; i++) {
                if(pos.x + 10 >= bricks[i].pos.x - bricks[i].width/2 && pos.x - 10 <= bricks[i].pos.x + bricks[i].width/2) {
                    if(bricks[i].shown) {
                        bricks[i].shown = false;
                        bricksRemaining--;
                        Game.ParticleSystem.add(
                            bricks[i].pos.x - bricks[i].width/2, 
                            bricks[i].pos.y - bricks[i].height/2,
                            bricks[i].width,
                            bricks[i].height,
                            bricks[i].color
                        );
                        bricksRemoved++;
                        if(rowId === 0) change.paddle = true;
                        Game.score += bricks[i].points;
                        bricksInRow[rowId]--;
                        console.log(bricksInRow);
                        console.log(bricksRemaining);
                        if(bricksInRow[rowId] === 0) Game.score += 25;
                        if( pos.x <= bricks[i].pos.x + bricks[i].width/2 && pos.x >= bricks[i].pos.x - bricks[i].width/2) change.y = true;
                        else if( pos.y <= bricks[i].pos.y + bricks[i].height/2 && pos.y >= bricks[i].pos.y - bricks[i].height/2) change.x = true;
                        else {
                            change.y = true;
                         }
                    }
                }
                
            }
        }
        idx += incr;
        if(pos.y + 20 >= bricks[idx].pos.y - bricks[idx].height/2 && pos.y - 10 <= bricks[idx].pos.y + bricks[idx].height/2) {
            for(let i = idx; i < idx+incr; i++) {
                if(pos.x + 10 >= bricks[i].pos.x - bricks[i].width/2 && pos.x - 10 <= bricks[i].pos.x + bricks[i].width/2) {
                    if(bricks[i].shown) {
                        bricks[i].shown = false;
                        bricksRemaining--;
                        Game.ParticleSystem.add(
                            bricks[i].pos.x - bricks[i].width/2, 
                            bricks[i].pos.y - bricks[i].height/2,
                            bricks[i].width,
                            bricks[i].height,
                            bricks[i].color    
                        );
                        bricksRemoved++;
                        Game.score += bricks[i].points;
                        bricksInRow[rowId+1]--;
                        if(bricksInRow[rowId+1] === 0) Game.score += 25;
                        if( pos.x <= bricks[i].pos.x + bricks[i].width/2 && pos.x >= bricks[i].pos.x - bricks[i].width/2) change.y = true;
                        else if( pos.y <= bricks[i].pos.y + bricks[i].height/2 && pos.y >= bricks[i].pos.y - bricks[i].height/2) change.x = true;
                        else {
                            change.y = true;
                        }
                    }
                }
                
            }
        }
        return change;
    }

    function resetBricksRemoved() {
        bricksRemoved = 0;
    }

    function reset() {
        bricksRemoved = 0;
        bricksInRow.length = 0;
        MakeBricks();
        
    }

    return {
        //makeBorder: MakeBorder,
        draw: renderBoard,
        collision: checkCollision,
        resetBricksRemoved: resetBricksRemoved,
        reset: reset
    }

})();