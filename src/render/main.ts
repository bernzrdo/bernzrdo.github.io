import { RESOLUTION_SCALE } from '../const'
import renderPhoto from '../elements/photo'
import renderTitle from '../elements/title'
import { renderGrid } from './grid'

export const $canvas: HTMLCanvasElement = document.querySelector('canvas')!
export const ctx = $canvas.getContext('2d')!

;(function update(){

    renderGrid()
    
    renderPhoto()
    renderTitle()
    
    requestAnimationFrame(update)
})()

function resize(){
    $canvas.width = innerWidth * RESOLUTION_SCALE
    $canvas.height = innerHeight * RESOLUTION_SCALE
}
addEventListener('resize', resize)
resize()