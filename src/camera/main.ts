import { Position } from '../util'
import './trackpad'
import './touch'

export const ZOOM_SENSITIVITY = .01
export const ZOOM_MIN = 1
export const ZOOM_MAX = 100

export const camera = {
    x: 0,
    y: 0,
    zoom: 1
}

export function toWorld(screen: Position): Position {
    return {
        x: screen.x / camera.zoom - camera.x,
        y: screen.y / camera.zoom - camera.y
    }
}

export function toScreen(world: Position): Position {
    return {
        x: (world.x + camera.x) * camera.zoom,
        y: (world.y + camera.y) * camera.zoom
    }
}

