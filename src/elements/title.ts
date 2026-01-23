import { camera, toScreen } from '../camera/main'
import { isDarkMode } from '../colors'
import { RESOLUTION_SCALE } from '../const'
import { ctx } from '../render/main'
import { cubicBezier, mod } from '../util'

const TITLES = [
    'instrument-serif.svg',
    'gaegu.svg',
    'ranchers.svg',
    'chokokutai.svg',
    'unifrakturmaguntia.svg',
    'vampiro-one.svg',
    'bagel-fat-one.svg',
    'doto.svg',
    'workbench.svg',
    'climate-crisis.svg',
]

let readyCount = 0
let allCount = TITLES.length * 2
let isReady = false

function loadImgs(color: 'white' | 'black'){
    return TITLES.map(file=>{
        const img = new Image()
        img.onload = ()=>++readyCount == allCount && allReady()
        img.src = `/img/title/${color}/${file}`
        return img
    })
}

const imgs = {
    white: loadImgs('white'),
    black: loadImgs('black')
} 

let maxWidth: number
function allReady(){
    isReady = true
    maxWidth = Math.max(...Object.values(imgs).flatMap(i=>i.map(i=>i.width)))
}

const DURATION = 2e3
const TRANSITION = 500

const ease = cubicBezier(.75, -.5, .25, 1.5)

export default function renderTitle(){
    if(!isReady) return

    const time = Date.now() % DURATION
    const i = Math.floor(Date.now() / DURATION)

    const color = isDarkMode() ? 'white' : 'black'

    const img = imgs[color][mod(i, TITLES.length)]

    const scale = Math.min(innerWidth - 50, 800) / maxWidth

    let width = img.width

    if(time < TRANSITION / 2){
        // from previous
        const prev = imgs[color][mod(i - 1, TITLES.length)]
        width = ease(prev.width, img.width, time / TRANSITION + .5)
    }

    if(time > DURATION - TRANSITION / 2){
        // to next
        const next = imgs[color][mod(i + 1, TITLES.length)]
        width = ease(img.width, next.width, (time - (DURATION - TRANSITION / 2)) / TRANSITION)
    }

    const pos = toScreen({
        x: (innerWidth - width * scale) / 2 * RESOLUTION_SCALE,
        y: (innerHeight - img.height * scale) / 2 * RESOLUTION_SCALE
    })

    if(isDarkMode()){
        ctx.shadowColor = '#0008'
        ctx.shadowBlur = 10
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 5
    }

    ctx.drawImage(
        img,
        pos.x, pos.y,
        width * scale * camera.zoom * RESOLUTION_SCALE, img.height * scale * camera.zoom * RESOLUTION_SCALE
    )

    ctx.shadowColor = '#0000'

}