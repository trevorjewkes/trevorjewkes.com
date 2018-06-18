Game.Ball = (function(){
    let image = new Image();
    image.isReady = false;
    image.onload = function() {
        this.isReady = true;
    };

    let balls = [];

    let playing = true;

    let context = Game.context;

    image.src = 'Resources/ball.png'

    let width = 30;
    let height = 30;
    let ballIdx = 0;

    let speed = 0.25;

    function CreateBall(x, y) {

        let that = {};

        that.idx = ballIdx;
        ballIdx++;
        that.center = {
            x: x,
            y: y
        }
        that.direction = {
            x: 1,
            y: -1
        };
        that.renderBall = function() {
            if (image.isReady) {
                context.drawImage(image,that.center.x - width/2, that.center.y - height/2, width, height);
            }
        }
    
        that.updatePos = function(elapsedTime) {
            that.center.x += that.direction.x*speed*elapsedTime;
            that.center.y += that.direction.y*speed*elapsedTime;
    
            if(that.center.x - 10 <= 10) {
                that.direction.x *= -1;
                that.center.x = 21;  
            }
            if(that.center.x + 10 >= 990) {
                that.direction.x *= -1;
                that.center.x = 979;  
            }
            if(that.center.y - 20 <= 10) {
                that.direction.y *= -1;
                that.center.y = 31;
            }
            if(that.center.y >= 1000) {
                that.direction.y *= -1;
                that.center.y = 980;
                return false;
            }
            return true;
        };
    
        that.setDirection = function(dir) {
            that.direction.x *= dir.x;
            that.direction.y *= dir.y;
        };
    
        that.getPos = function() {
            return that.center;
        };
    
        that.checkPlayerCollide = function(player) {
            let size = player.size();
            let pos = player.pos();
            if(that.center.x + 10  >= pos.x - size.width/2 && that.center.x - 10 <= pos.x + size.width/2) {
                if(that.center.y + 10 >= pos.y - size.height/2 && that.center.y - 10 <= pos.y + size.height/2) {
                    that.direction.y *= -1;
                    that.direction.x = (that.center.x - pos.x)/(size.width/2);
                    that.center.y = pos.y - 25;
                }
            }    
        };

        that.startPos = function(pos) {
            that.center.x = pos.x;
            that.center.y = pos.y - 30;
        };

        return that;
    }

    function addBall(pos) {
        balls.push(CreateBall(pos.x, pos.y - 30));
        console.log("adding ball at ", pos.x, ' ' , pos.y);
    }

    function update(elapsedTime) {
        let keep = [];
        for(let i = 0; i < balls.length; i++) {
            if(balls[i].updatePos(elapsedTime)) {
                keep.push(balls[i]);
            }
        }
        balls = keep;
        if(playing && balls.length === 0)
        {
            Game.lives--;
            if(Game.lives < 0) {
                Game.GameState = 5;
            }
        }

        if(balls.length > 0) {
            playing = true;
        }
        else {
            playing = false;
        }
    }

    function render() {
        for(let i = 0; i < balls.length; i++)
        {
            balls[i].renderBall();
        }
    }
    
    function setSpeed(newSpeed) {
        speed = newSpeed;
    }

    function setDirection(idx, dir) {
        for(let i = 0; i < balls.length; i++)
        {
            if(balls[i].idx === idx) {
                balls[i].setDirection(dir);
            }
        }
    }

    function getPos(idx) {
        for(let i = 0; i < balls.length; i++) {
            if(balls[i].idx == idx) {
                return balls[i].getPos();
            }
        }
    }

    function checkCollisions(player) {
        for(let i = 0; i < balls.length; i++) {
            balls[i].checkPlayerCollide(player);
        }
    }

    function getBalls() {
        return balls;
    }

    function startBall(pos) {
        for(let i = 0; i < balls.length; i++) {
            balls[i].startPos(pos);        
        }
    }

    function reset() {
        balls.length = 0;
    }

    return {
        draw: render,
        update: update,
        speed: setSpeed,
        direction: setDirection,
        pos: getPos,
        checkPlayerCollide: checkCollisions,
        balls: getBalls,
        addBall: addBall,
        startBall: startBall,
        reset: reset
    }
})();