MazeGame.maze = (function(graphics) {
    let maze = [];
    let context = graphics.context;
    let shortestPath = [];

    let bShowBC = false;

    let size = 0;

    let player = undefined;

    let xOffset = 0;
        let yOffset = 0;
        let mazeSize = 1000;

    let imgFloor = new Image();
    imgFloor.isReady = false;
    imgFloor.onload = function() {
        this.isReady = true;
    };
    imgFloor.src = 'Images/cell.png';

    let imgBC = new Image();
    imgBC.isReady = false;
    imgBC.onload = function() {
        this.isReady = true;
    }
    imgBC.src = 'Images/bc.png';

    let imgEnd = new Image();
    imgEnd.isReady = false;
    imgEnd.onload = function() {
        this.isReady = true;
    }
    imgEnd.src = 'Images/end.png';

    function formMaze() {
        let frontier = [];
        //let x = Math.floor(Math.random()*maze.length);
        //let y = Math.floor(Math.random()*maze.length);
        frontier.push(maze[0][0]);
        
        let idx = Math.floor(Math.random()*frontier.length);
        while(frontier.length > 0) {
            let tmp = [];
            if(frontier[idx].visited) {
                frontier.splice(idx, 1);
                idx = Math.floor(Math.random()*frontier.length);
                continue;
            }
            //console.log("F Idx: " + frontier[idx].x + ' ' + frontier[idx].y + ' ',frontier[idx].visited);
            if(frontier[idx].x - 1 >= 0) {
                if(!maze[frontier[idx].y][frontier[idx].x - 1].visited) {
                    frontier.push(maze[frontier[idx].y][frontier[idx].x - 1]);
                } else if (maze[frontier[idx].y][frontier[idx].x - 1].visited) {
                    tmp.push(maze[frontier[idx].y][frontier[idx].x - 1]);
                }
            }

            if(frontier[idx].y - 1 >= 0) {
                if(!maze[frontier[idx].y - 1][frontier[idx].x].visited) {
                    frontier.push(maze[frontier[idx].y - 1][frontier[idx].x]);
                } else if (maze[frontier[idx].y - 1][frontier[idx].x].visited) {
                    tmp.push(maze[frontier[idx].y - 1][frontier[idx].x]);
                }
            }

            if(frontier[idx].x + 1 < maze.length) {                
                if(!maze[frontier[idx].y][frontier[idx].x + 1].visited) {
                    frontier.push(maze[frontier[idx].y][frontier[idx].x + 1]);
                } else if (maze[frontier[idx].y][frontier[idx].x + 1].visited) {
                    tmp.push(maze[frontier[idx].y][frontier[idx].x + 1]);
                }
            }

            if(frontier[idx].y + 1 < maze.length) {
                if(!maze[frontier[idx].y + 1][frontier[idx].x].visited) {
                    frontier.push(maze[frontier[idx].y + 1][frontier[idx].x]);
                } else if (maze[frontier[idx].y + 1][frontier[idx].x].visited) {
                    tmp.push(maze[frontier[idx].y + 1][frontier[idx].x]);
                }
            }

            let tmpIdx = Math.floor(Math.random()*tmp.length);
            

            if(tmp.length > 0) {
                //console.log("tmp Idx( " + tmpIdx + "): " + tmp[tmpIdx].x + ' ' + tmp[tmpIdx].y);
                if(tmp[tmpIdx].y === undefined) {
                    console.log(tmp[tmpIdx]);
                }
                if(tmp[tmpIdx].x < frontier[idx].x) {
                    tmp[tmpIdx].edges.e = frontier[idx];
                    frontier[idx].edges.w = tmp[tmpIdx];
                } else if(tmp[tmpIdx].x > frontier[idx].x) {
                    tmp[tmpIdx].edges.w = frontier[idx];
                    frontier[idx].edges.e = tmp[tmpIdx];
                } else if(tmp[tmpIdx].y < frontier[idx].y) {
                    tmp[tmpIdx].edges.s = frontier[idx];
                    frontier[idx].edges.n = tmp[tmpIdx];
                } else if(tmp[tmpIdx].y > frontier[idx].y) {
                    tmp[tmpIdx].edges.n = frontier[idx];
                    frontier[idx].edges.s = tmp[tmpIdx];
                }
                frontier[idx].parentNode = tmp[tmpIdx];
            }

            frontier[idx].visited = true;
            frontier.splice(idx, 1);
            idx = Math.floor(Math.random()*frontier.length);
        }
    }

    function computeShortestPath() {
        shortestPath.length = 0;
        let n = maze[size-1][size-1];
        while(true) {
            shortestPath.push(n);
            n.points = 5;
            if(n.edges.e != null){
                if(n.edges.e.points != 5) {
                    n.edges.e.points = -1;
                }
            }
            if(n.edges.w != null){
                if(n.edges.w.points != 5) {
                    n.edges.w.points = -1;
                }
            }
            if(n.edges.s != null){
                if(n.edges.s.points != 5) {
                    n.edges.s.points = -1;
                }
            }
            if(n.edges.n != null){
                if(n.edges.n.points != 5) {
                    n.edges.n.points = -1;
                }
            }
            n = n.parentNode;
            if(n === null) {
                shortestPath.splice(shortestPath.length - 1,1);
                return;
            }
        }
    }

    function createMaze(rows, cols) {
        size = rows;
        maze.length = 0;
        for(let row = 0; row < rows; row++) {
            maze.push([]);
            for(let col = 0; col < cols; col++) {
                maze[row].push({
                    x: col, y: row, visited: false, 
                    edges: {
                        n: null,
                        s: null,
                        w: null,
                        e: null
                    },
                    parentNode: null,
                    points: -2
                });
            }
        }
        formMaze();
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                maze[i][j].visited = false;
            }
        }
        computeShortestPath();
        player = createCharacter('Images/player.png', maze[0][0]);
        maze[0][0].visited = true;
    }

    function getMaze() {
        if(maze.length > 0)
            return maze;
        return null;
    }    

    function drawCell(cell) {        
        if (imgFloor.isReady) {
            context.drawImage(imgFloor,
            cell.x * (mazeSize / size), cell.y * (mazeSize / size),
            mazeSize / size, mazeSize / size);
        }

        if(imgBC.isReady){
            if(bShowBC && cell.visited === true) {
                context.drawImage(imgBC,
                cell.x * (mazeSize / size), cell.y * (mazeSize /size),
            mazeSize /size, mazeSize /size);
            }
        }

        if (cell.edges.n === null) {
            context.moveTo(cell.x * (mazeSize / size), cell.y * (mazeSize / size));
            context.lineTo((cell.x + 1) * (mazeSize / size), cell.y * (mazeSize / size));
        }
    
        if (cell.edges.s === null) {
            context.moveTo(cell.x * (mazeSize / size), (cell.y + 1) * (mazeSize / size));
            context.lineTo((cell.x + 1) * (mazeSize / size), (cell.y + 1) * (mazeSize / size));
        }
 
        if (cell.edges.e === null) {
            context.moveTo((cell.x + 1) * (mazeSize / size), cell.y * (mazeSize / size));
            context.lineTo((cell.x + 1) * (mazeSize / size), (cell.y + 1) * (mazeSize / size));
        }

        if (cell.edges.w === null) {
            context.moveTo(cell.x * (mazeSize / size), cell.y * (mazeSize / size));
            context.lineTo(cell.x * (mazeSize / size), (cell.y + 1) * (mazeSize / size));
        }
        
        
    }

    function renderMaze() {        

        context.strokeStyle = 'rgb(255, 255, 255)';
        context.lineWidth = 6;
        context.moveTo(0,0);
        context.beginPath();
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                drawCell(maze[row][col]);
            }
        }
        context.closePath();
        if(imgEnd.isReady) {
            context.drawImage(imgEnd,
                maze[size-1][size-1].x * (mazeSize / size), maze[size-1][size-1].y * (mazeSize /size),
            mazeSize /size, mazeSize /size);
        }
        context.stroke();

        
    }

    function renderPlayer() {
        if (player.image.isReady) {
            context.drawImage(player.image,
            player.location.x * (mazeSize / size) + xOffset, player.location.y * (mazeSize / size) + yOffset,
            mazeSize / size, mazeSize / size);
        }
    }

    function createCharacter(imageSource, location) {
        let image = new Image();
        image.isReady = false;
        image.onload = function() {
            this.isReady = true;
        };
        image.src = imageSource;
        return {
            location: location,
            image: image
        };
    }

    function movePlayerUp() {
        if (player.location.edges.n) {
            player.location = player.location.edges.n;
		}
    }

    function movePlayerDown() {
        if (player.location.edges.s) {
            player.location = player.location.edges.s;
		}
    }

    function movePlayerLeft() {
        if (player.location.edges.w) {
            player.location = player.location.edges.w;
		}
    }

    function movePlayerRight() {
        if (player.location.edges.e) {
            player.location = player.location.edges.e;
		}
    }

    function getShortestPath() {
        return shortestPath;
    }

    function getPlayerPos() {
        return player.location;
    }

    function toggleBC(e) {
        bShowBC = !bShowBC;
    }

    return {
        maze: getMaze,
        createMaze: createMaze,
        shortestPath: getShortestPath,
        drawMaze: renderMaze,
        drawPlayer: renderPlayer,
        playerUp: movePlayerUp,
        playerDown: movePlayerDown,
        playerLeft: movePlayerLeft,
        playerRight: movePlayerRight,
        playerPos: getPlayerPos,
        toggleBreadCrumbs: toggleBC
    };
})(MazeGame.graphics);