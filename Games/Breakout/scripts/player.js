Game.Player = (function(context){

    let image = new Image();
    image.isReady = false;
    image.onload = function() {
        this.isReady = true;
    };

    let startLoc = null;

    let width = 0;
    let height = 0;

    let shrunk = false;

    let move = {};

    move.left = function(elapsedTime) {
        location.x -= 750 / 1000* elapsedTime; //example here
        if(location.x - width/2 < 10) location.x = 10 + width / 2;
    };

    move.right = function(elapsedTime){
        location.x += 750 / 1000 * elapsedTime; //example here
        if(location.x + width/2 > 990) location.x = 990 - width / 2;
    }

    let location = null;

    function CreatePlayer(spec) {
        image.src = spec.imageSource;
        location = spec.location;
        startLoc = spec.location;
        width = spec.width;
        height = spec.height;
    }

    function drawPlayer() {
        if (image.isReady) {
            context.drawImage(image,location.x - width/2, location.y - height/2, width, height);
        }
    }

    function getPos() {
        return location;
    }

    function getSize() {
        return {
            width: width,
            height: height
        }
    }

    function shrink(flag) {
        if(flag && !shrunk) {
            width = width/2;
            shrunk = true;
        }
    }

    function drawLives() {
        for(let i = 0; i < Game.lives; i++) {
            context.drawImage(image, (i*40) + 20, 975, 30, 15);
        }
    }

    function unshrink() {
        if(shrunk) {
            width *= 2;
            shrunk = false;
        }
    }

    function reset(pos) {
        location = pos;
    }

    return {
        //player: getPlayer,
        makePlayer: CreatePlayer,
        move: move,
        draw: drawPlayer,
        pos: getPos,
        size: getSize,
        shrink: shrink,
        drawLives: drawLives,
        unshrink: unshrink,
        reset: reset
    };

})(Game.context);