import Noise from 'noisejs';

const modulate = (value: number, rangeA: number[], rangeB: number[]) => {
    const [fromLow, fromHigh] = rangeA;
    const [toLow, toHigh] = rangeB;

    return toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
};

export class MapGenerator {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(width: number, height: number = width) {
        this.canvas = document.createElement('canvas');

        this.canvas.width = width;
        this.canvas.height = height;

        this.context = this.canvas.getContext('2d');
    }

    generateHeightMap(scale: number = 1, seed?: number) {
        const { width, height } = this.canvas;
        const imageData = this.context.createImageData(width, height);

        const noise = new (Noise as any).Noise(seed);

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                let perlinValue = noise.perlin2((x / 100) * scale, (y / 100) * scale);
                perlinValue = modulate(perlinValue, [-1, 1], [0, 1]) * 255;

                const cell = (x + y * width) * 4;

                imageData.data[cell] = perlinValue;
                imageData.data[cell + 1] = perlinValue;
                imageData.data[cell + 2] = perlinValue;
                imageData.data[cell + 3] = 255;
            }
        }

        this.context.putImageData(imageData, 0, 0);

        const base64 = this.canvas.toDataURL();
        this.context.clearRect(0, 0, width, height);

        return base64;
    }
}
