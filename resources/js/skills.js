const Matter = require('matter-js');
const { Engine, Render, Runner, Bodies, Body, World, Events, Query } = Matter;
Matter.use(require('matter-attractors'));

const engine = Engine.create();

const element = document.getElementById('skills'); 

// ----- RESIZE -----

let { width, height } = element.getBoundingClientRect();

const render = Render.create({
    element, engine,
    options: {
        width, height,
        wireframes: false,
        background: '#0000'
    }
});

addEventListener('resize', ()=>{

    ({ width, height } = element.getBoundingClientRect())

    render.options.width = render.canvas.width = width;
    render.options.height = render.canvas.height = height;

});

const runner = Runner.create();

Runner.run(runner, engine);
Render.run(render);

// ----- ATTRACTIVE BODY -----

engine.gravity.scale = 0;

const attractiveBody = Bodies.circle(width / 2, height / 2, 0, {
    isStatic: true,
    plugin: {
        attractors: [
            (a, b)=>({
                x: (a.position.x - b.position.x) * .00001,
                y: (a.position.y - b.position.y) * .00001
            })
        ]
    }
});
World.add(engine.world, attractiveBody);

// ----- CIRCLES -----

function sprite(src, radius){
    return Bodies.circle(0, 0, radius, {
        label: src,
        render: {
            sprite: {
                texture: `/img/${src}.png`,
                xScale: radius * 2 / 512 - .01,
                yScale: radius * 2 / 512 - .01
            }
        }
    });
}

const circles = [
    sprite('javascript', 100),
    sprite('nodejs', 80),
    sprite('css', 70),
    sprite('html', 70),
    sprite('laravel', 60),
    sprite('php', 60),
    sprite('mysql', 60),
    sprite('jquery', 60),
    sprite('figma', 50),
    sprite('notion', 50),
    sprite('socket-io', 40),
    sprite('unity', 40),
    sprite('c-sharp', 40),
    sprite('flutter', 40),
    sprite('postgresql', 40),
    sprite('java', 30),
    sprite('c', 30),
];

// ----- SCROLL -----

let state = false;
const distance = 500;

let gyro = { beta: 0, gamma: 0 }
let initialGyro = { beta: 0, gamma: 0 }

function show(){

    World.add(engine.world, circles);
        
    for(let circle of circles){
        Body.setPosition(circle, {
            x: Math.random() < .5 ? -distance : width + distance,
            y: Math.random() * height
        });
    }

    initialGyro = {
        beta: gyro.beta,
        gamma: gyro.gamma
    };
    
    state = true;
}

function hide(){

    World.remove(engine.world, circles);

    state = false;
}

const triggerPercent = .5;
function scroll(){

    let { top, bottom } = element.getBoundingClientRect();
    
    // show when partially on-screen
    if((
        (innerHeight - top > height * triggerPercent && bottom > innerHeight) ||
        (bottom > height * triggerPercent && top < 0)
    ) && !state) show();

    // hide when fully off-screen
    if((innerHeight - top < 0 || bottom < 0) && state) hide();

}
addEventListener('scroll', scroll);
scroll();

// ----- FOLLOW MOUSE / GYROSCOPE -----

const targetScale = 5;
let targetX;
let targetY;

if(!('ontouchstart' in window)){

    addEventListener('mousemove', ({ x, y })=>{
        
        targetX = x / targetScale + (width - (width / targetScale)) / 2;
        
        y -= element.getBoundingClientRect().y;
        if(y < 0) y = 0;
        targetY = y / targetScale + (height - (height / targetScale)) / 2;
    
    });

}else if('ondeviceorientation' in window){

    addEventListener('deviceorientation',
        ({ beta, gamma })=> initialGyro = { beta, gamma },
        { once: true }
    );

    const gyroRange = 80;

    addEventListener('deviceorientation', ({ beta, gamma })=>{
        
        gyro = { beta, gamma }

        gamma -= initialGyro.gamma;
        gamma = Math.min(Math.max(gamma, -gyroRange), gyroRange);
        targetX = gamma / gyroRange * (width / targetScale);
        targetX += width / 2;

        beta -= initialGyro.beta;
        beta = Math.min(Math.max(beta, -gyroRange), gyroRange);
        targetY = beta / gyroRange * (width / targetScale);
        targetY += height / 2;

    });

}

Events.on(engine, 'afterUpdate', ()=>{

    Body.translate(attractiveBody, {
        x: ((targetX ?? width / 2) - attractiveBody.position.x) * .25,
        y: ((targetY ?? height / 2) - attractiveBody.position.y) * .25
    });

    for(let circle of circles) Body.setAngle(circle, 0);

});

// ----- CLICK -----

function isDialogOpen(){
    return !!document.querySelector('dialog:not(.off)');
}

addEventListener('mousemove', ({ x, y })=>{
    if(isDialogOpen()) return;

    y -= element.getBoundingClientRect().y;

    let [circle] = Query.point(circles, { x, y });

    if(circle) element.style.cursor = 'pointer';
    else element.style.removeProperty('cursor');

});

addEventListener('click', ({ x, y })=>{
    if(isDialogOpen()) return;

    y -= element.getBoundingClientRect().y;

    let [circle] = Query.point(circles, { x, y });
    if(!circle) return;

    /** @type {HTMLDialogElement} */
    let $dialog = document.querySelector(`dialog.skill-${circle.label}`);
    if(!$dialog) throw `No skill dialog found for "${circle.label}"`;

    openDialog($dialog);
    element.style.removeProperty('cursor');

});