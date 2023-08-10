
/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('.hyperdrive');

let width, height, maxRadius;
function calcSize(){
    
    ({ width, height } = canvas.getBoundingClientRect());
    canvas.width = width;
    canvas.height = height;
    
    maxRadius = Math.sqrt(
        Math.pow(width / 2, 2) +
        Math.pow(height / 2, 2)
    );

}
addEventListener('resize', calcSize);
calcSize();

const ctx = canvas.getContext('2d');
ctx.lineWidth = 2;

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

class Line {

    #startTime;
    #duration;
    #angle;

    constructor(){
        this.#generate(true);
    }

    #generate(start = false){

        // random duration between 0 and 1s
        this.#duration = Math.random() * 500 + 500;
        if(reducedMotion.matches) this.#duration *= 10;
        
        this.#startTime = Date.now();
        
        // start randomly midway if it's the first time
        if(start)
            this.#startTime -= this.#duration * Math.random();
        
        // random angle
        this.#angle = Math.random() * 360;

    }

    render(){

        let elapsed = Date.now() - this.#startTime;

        // regenerate if it ended
        if(elapsed >= this.#duration)
            return this.#generate();
        
        ctx.beginPath();

        let progress = elapsed / this.#duration;
        var { x, y } = this.#calc(progress);

        ctx.moveTo(x + width / 2, y + height / 2);

        var { x, y } = this.#calc(Math.max(progress + .1, 0));
        ctx.lineTo(x + width / 2, y + height / 2);

        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.pow(progress, 2)})`;
        ctx.stroke();

    }

    #calc(progress){

        let radius = maxRadius * progress;

        return {
            x: radius * Math.cos(this.#angle * Math.PI / 180),
            y: radius * Math.sin(this.#angle * Math.PI / 180)
        };

    }

}

let lines;
let rendered;

function init(){
    
    lines = [];
    rendered = false;
    
    for(let i=0; i < 100; i++){
        lines.push(new Line());
    }

}
addEventListener('focus', init);
reducedMotion.addEventListener('change', init);
init();

(function update(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(line of lines) line.render();

    ctx.strokeStyle = `#f00`;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, maxRadius, 0, 2 * Math.PI);
    ctx.stroke();

    requestAnimationFrame(update);
    
})();