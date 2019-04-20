import Noise from 'noisejs';

import { modulate } from './utils/helpers';

export class MapGenerator {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(width: number, height: number = width) {
        this.canvas = document.createElement('canvas');

        this.canvas.width = width;
        this.canvas.height = height;

        this.context = this.canvas.getContext('2d');
    }

    generateHeightMap(
        seed: number = 0,
        scale: number = 1,
        octaves: number = 4,
        persistance: number = 0.5,
        lacunarity: number = 2,
        offsetX: number = 0,
        offsetY: number = 0
    ) {
        const { width, height } = this.canvas;
        const imageData = this.context.createImageData(width, height);

        const noise = new (Noise as any).Noise(seed);

        const octaveOffsets: number[][] = Array(octaves);
        for (let i = 0; i < octaves; i++) {
            octaveOffsets[i] = [offsetX, offsetY];
        }

        let minNoiseHeight = 0;
        let maxNoiseHeight = 0;

        const halfWidth = width / 2;
        const halfHeight = height / 2;

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                let amplitude = 1;
                let frequency = 1;
                let noiseHeight = 0;

                for (let i = 0; i < octaves; i++) {
                    const sampleX = ((x - halfWidth) / 100 / scale) * frequency + octaveOffsets[i][0];
                    const sampleY = ((y - halfHeight) / 100 / scale) * frequency + octaveOffsets[i][1];

                    let perlinValue = noise.perlin2(sampleX, sampleY);

                    noiseHeight += perlinValue * amplitude;
                    amplitude *= persistance;
                    frequency *= lacunarity;
                }

                if (noiseHeight > maxNoiseHeight) {
                    maxNoiseHeight = noiseHeight;
                } else if (noiseHeight < minNoiseHeight) {
                    minNoiseHeight = noiseHeight;
                }

                const pixelValue = modulate(noiseHeight, [minNoiseHeight, maxNoiseHeight], [0, 255]);

                const cell = (x + y * width) * 4;

                imageData.data[cell] = pixelValue;
                imageData.data[cell + 1] = pixelValue;
                imageData.data[cell + 2] = pixelValue;
                imageData.data[cell + 3] = 255;
            }
        }

        this.context.putImageData(imageData, 0, 0);

        const base64 = this.canvas.toDataURL();
        this.context.clearRect(0, 0, width, height);

        return base64;
    }
}
