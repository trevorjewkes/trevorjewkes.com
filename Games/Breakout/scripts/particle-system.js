Game.ParticleSystem = (function(){

    let context = Game.context;
    let particles = [];

    function drawParticle(p) {		
        context.save();
        context.translate(p.position.x + p.size / 2, p.position.y + p.size / 2);
        context.rotate(p.rotation);
        context.translate(-(p.position.x + p.size / 2), -(p.position.y + p.size / 2));

        context.fillStyle = p.fill;
        context.strokeStyle = p.stroke;
        context.fillRect(p.position.x, p.position.y, p.size, p.size);
        //context.strokeRect(p.position.x, p.position.y, p.size, p.size);
        context.restore();		
	}

    function update(elapsedTime) {
        let keepMe = [];

        for (let particle = 0; particle < particles.length; particle++) {
            particles[particle].alive += elapsedTime;
            particles[particle].position.x += (elapsedTime * particles[particle].speed * particles[particle].direction.x);
            particles[particle].position.y += (elapsedTime * particles[particle].speed * particles[particle].direction.y);
            //particles[particle].rotation += particles[particle].speed / .5;

            if (particles[particle].alive <= particles[particle].lifetime) {
                keepMe.push(particles[particle]);
            }
        }
        particles = keepMe;
    }

    function render() {
        for (let particle = 0; particle < particles.length; particle++) {
            drawParticle(particles[particle]);
        }
    }

    function addParticles(x,y,width,height,color) {
        for(let i = x; i < x+width; i+=2) {
            for(let j = y; j < y+height; j+=2) {
                let p = {
                    position: {x: i, y: j},
                    direction: {x: 0, y: 1},
                    speed: Math.abs(Random.nextGaussian( .02*((j-y)/5), 0.0125 )+.001),	// pixels per millisecond
                    rotation: 0,
                    lifetime: Random.nextGaussian(750, 250),	// milliseconds
                    alive: 0,
                    size: Random.nextGaussian(2, .25),
                    fill: color,
                    stroke: 'rgb(0, 0, 0)'
                };
                particles.push(p);
            }
        }
    }

    function reset() {
        particles.length = 0;
    }

    return {
        update: update,
        render: render,
        add: addParticles,
        reset: reset
    }

})();