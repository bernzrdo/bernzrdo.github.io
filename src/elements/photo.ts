import { toScreen } from '../camera/main'
import { RESOLUTION_SCALE } from '../const'
import { ctx } from '../render/main'
import { toRad } from '../util'

const START = {
    duration: 2e3,
    angle: -140
}

const HEIGHT = 400
const MARGIN = 25
const BOTTOM_MARGIN = 100
const ANGLE = -10
const X = -500
const Y = -400

let loaded: number | null = null

const img = new Image()
img.onload = ()=>loaded = Date.now()
img.src = '/img/me.jpg'

export default function renderPhoto(){
    if(loaded == null) return

    ctx.save()

    const pos = toScreen({
        x: innerWidth / 2 * RESOLUTION_SCALE,
        y: innerHeight / 2 * RESOLUTION_SCALE
    })

    ctx.translate(pos.x, pos.y)
    ctx.rotate(toRad(ANGLE))

    const ratio = Math.min(innerWidth / innerHeight, 1)

    const height = HEIGHT * ratio
    const width = height * img.width / img.height
    const margin = MARGIN * ratio
    const bottomMargin = BOTTOM_MARGIN * ratio

    const x = -width / 2 + X * ratio
    const y = -height / 2 + Y * ratio

    ctx.shadowColor = '#0003'
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 5

    ctx.fillStyle = '#fff'
    ctx.fillRect(
        x - margin, y - margin,
        margin + width + margin, margin + height + bottomMargin
    )

    ctx.shadowColor = '#0000'

    ctx.drawImage(img, x, y, width, height)

    ctx.restore()

}