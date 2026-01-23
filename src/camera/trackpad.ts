import { RESOLUTION_SCALE } from '../const'
import { clamp } from '../util'
import { camera, toWorld, ZOOM_MAX, ZOOM_MIN, ZOOM_SENSITIVITY } from './main'

const mouse = {
    x: (innerWidth / 2) * RESOLUTION_SCALE,
    y: (innerHeight / 2) * RESOLUTION_SCALE
}

addEventListener('mousemove', e=>{
    mouse.x = e.pageX * RESOLUTION_SCALE
    mouse.y = e.pageY * RESOLUTION_SCALE
})

addEventListener('wheel', e=>{
    e.preventDefault()

    // zoom
    if(e.ctrlKey || e.metaKey){

        // save mouse pos before zoom
        const before = toWorld(mouse)
        

        // apply zoom
        const zoom = e.deltaY != 0 ? e.deltaY : e.deltaX
        camera.zoom -= zoom * ZOOM_SENSITIVITY * camera.zoom
        camera.zoom = clamp(ZOOM_MIN, camera.zoom, ZOOM_MAX)

        // get mouse pos after zoom
        const after = toWorld(mouse)

        // adjust camera
        camera.x += after.x - before.x
        camera.y += after.y - before.y

        return
    }

    // move
    camera.x -= e.deltaX * (1 / camera.zoom) * RESOLUTION_SCALE
    camera.y -= e.deltaY * (1 / camera.zoom) * RESOLUTION_SCALE

}, { passive: false })