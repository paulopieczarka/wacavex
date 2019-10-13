import { noise } from './perlin'

class Noise {
  static generateNoiseMap (width, height, scale, octaves, persistance, lacunarity, offset) {
    const noiseMap = Array(width).fill([]).map(() => Array(height).fill(0))

    offset = offset || { x: 0, y: 0 }

    const octaveOffsets = []
    for (let i=0; i < octaves; i++) {
      const xOffset = Math.floor((Math.random() * 100000) - (Math.random() * 100000)) + offset.x
      const yOffset = Math.floor((Math.random() * 100000) - (Math.random() * 100000)) + offset.y
      octaveOffsets[i] = { x: xOffset, y: yOffset }
    }

    if (scale <= 0) {
      scale = 0.0001
    }

    let maxNoiseHeight = Number.MIN_VALUE
    let minNoiseHeight = Number.MAX_VALUE

    const halfWidth = width / 2.0
    const halfHeight = height / 2.0

    for (let i=0; i < width; i++) {
      for (let j=0; j < height; j++) {
        let amplitude = 1
        let frequency = 1
        let noiseHeight = 0

        for (let k=0; k < octaves; k++) {
          const sampleX = (i - halfWidth) / scale * frequency + octaveOffsets[k].x
          const sampleY = (j - halfHeight) / scale * frequency + octaveOffsets[k].y
          const perlinValue = noise.perlin2(sampleX, sampleY) * 2 - 1
          noiseHeight += perlinValue * amplitude
          
          amplitude *= persistance
          frequency *= lacunarity
        }

        if (noiseHeight > maxNoiseHeight) {
          maxNoiseHeight = noiseHeight
        } else if (noiseHeight < minNoiseHeight) {
          minNoiseHeight = noiseHeight
        }

        noiseMap[i][j] = noiseHeight
      }
    }

    // Normalize heights
    for (let i=0; i < width; i++) {
      for (let j=0; j < height; j++) {
        noiseMap[i][j] = invlerp(minNoiseHeight, maxNoiseHeight, noiseMap[i][j])
      }
    }

    return noiseMap
  }
}

const lerp = (x, y, a) => x * (1 - a) + y * a
const invlerp = (a, b, v) => clamp(( v - a ) / ( b - a ))
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))

export default Noise
