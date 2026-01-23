import { RESOLUTION_SCALE } from '../const'
import { clamp, dist, Position } from '../util'
import { camera, toWorld, ZOOM_MAX, ZOOM_MIN } from './main'

const lastTouches: { [id: number]: Position } = {}

function updateTouch(touch: Touch){
    lastTouches[touch.identifier] = {
        x: touch.clientX,
        y: touch.clientY
    }
}

function updateTouches(e: TouchEvent){
    for(let touch of e.changedTouches)
        updateTouch(touch)
}

addEventListener('touchstart', updateTouches)

addEventListener('touchmove', e=>{
    e.preventDefault()

    const [touchA, touchB] = e.touches
    const lastTouchA = touchA && lastTouches[touchA.identifier]
    const lastTouchB = touchB && lastTouches[touchB.identifier]

    // move
    if(touchA){
        const factor = (1 / camera.zoom) * RESOLUTION_SCALE
        camera.x += (touchA.clientX - lastTouchA.x) * factor
        camera.y += (touchA.clientY - lastTouchA.y) * factor
    }

    // zoom
    if(touchA && touchB){

        // save touch pos before zoom
        const before = toWorld({
            x: touchA.clientX * RESOLUTION_SCALE,
            y: touchA.clientY * RESOLUTION_SCALE
        })

        // apply zoom
        const lastDist = dist(lastTouchA, lastTouchB)
        const currDist = dist(
            { x: touchA.clientX, y: touchA.clientY },
            { x: touchB.clientX, y: touchB.clientY }
        )
        camera.zoom *= currDist / lastDist
        camera.zoom = clamp(ZOOM_MIN, camera.zoom, ZOOM_MAX)

        // get touch pos after zoom
        const after = toWorld({
            x: touchA.clientX * RESOLUTION_SCALE,
            y: touchA.clientY * RESOLUTION_SCALE
        })

        // adjust camera
        camera.x += after.x - before.x
        camera.y += after.y - before.y

    }

    updateTouches(e)

}, { passive: false })

function touchEnd(e: TouchEvent){
    for(let { identifier: id } of e.changedTouches)
        delete lastTouches[id]
}
addEventListener('touchcancel', touchEnd)
addEventListener('touchend', touchEnd)