import { camera } from '../camera/main'
import getColors from '../colors'
import { $canvas, ctx } from './main'

const GRID_SIZE = 3
const GRID_SPACING = 100

export function renderGrid(){

    const colors = getColors()

    // background
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, $canvas.width, $canvas.height)

    // grid
    ctx.fillStyle = colors.grid
    for(let x = (camera.x * camera.zoom) % (GRID_SPACING * camera.zoom); x < $canvas.width; x += GRID_SPACING * camera.zoom){
        for(let y = (camera.y * camera.zoom) % (GRID_SPACING * camera.zoom); y < $canvas.height; y += GRID_SPACING * camera.zoom){
            
            ctx.beginPath()
            ctx.arc(
                x - GRID_SIZE / 2,
                y - GRID_SIZE / 2,
                GRID_SIZE,
                0, 2 * Math.PI
            )
            ctx.fill()

        }
    }

}