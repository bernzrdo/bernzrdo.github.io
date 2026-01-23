
export interface Position { x: number, y: number }

export function dist(a: Position, b: Position){
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

export function clamp(min: number, value: number, max: number){
    return Math.min(Math.max(value, min), max)
}

export function mod(a: number, n: number) {
    return ((a % n) + n) % n
}

export function lerp(a: number, b: number, t: number){
    return a + t * (b - a)
}

export function ease(a: number, b: number, t: number) {
    const u = t * t * (3 - 2 * t)
    return a + u * (b - a)
}

export function cubicBezier(p0: number, p1: number, p2: number, p3: number){

    function sampleCurve(t: number, a: number, b: number){
        const invT = 1 - t
        return 3 * invT * invT * t * a +
               3 * invT * t * t * b +
               t * t * t
    }

    function sampleCurveY(x: number){

        // solve for t
        let t = x
        for(let i = 0; i < 5; i++){
            
            const xEst = sampleCurve(t, p0, p2) - x

            const invT = 1 - t
            
            const dx =  3 * invT * invT * p0 +
                        6 * invT * t * (p2 - p0) +
                        3 * t * t * (1 - p2)

            if(Math.abs(xEst) < 1e-6 || dx === 0) break
            t = t - xEst / dx
        }

        return sampleCurve(t, p1, p3)
    }

    return (a: number, b: number, t: number)=>a + (b - a) * sampleCurveY(t)
}

export function toRad(deg: number){
    return deg * Math.PI / 180
}