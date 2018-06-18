MazeGame.graphics = (function(){
    'use strict';
    let canvas = document.getElementById('canvas-main');
    let context = canvas.getContext('2d');

    function clear() {
        context.clearRect(0,0,canvas.width, canvas.height);
    }

    return {
        clear: clear,
        context: context
    };
})();