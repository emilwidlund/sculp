import * as React from 'react';

import { Control } from './Control';
import { MapGenerator } from '../../MapGenerator';

interface HeightmapGeneratorProps {
    onHeightmapLoaded(data: string): void;
}

const mg = new MapGenerator(100);

export const HeightmapGenerator = ({ onHeightmapLoaded }: HeightmapGeneratorProps) => {
    const [heightMapSeed, setHeightMapSeed] = React.useState(0);
    const [heightMap, setHeightMap] = React.useState(null);

    return (
        <Control title="Perlin Map">
            <div className="image" style={{ backgroundImage: `url(${heightMap})` }} />
            <button
                onClick={() => {
                    const heightMap = mg.generateHeightMap(4, heightMapSeed);

                    setHeightMap(heightMap);
                    setHeightMapSeed(heightMapSeed + 1);

                    onHeightmapLoaded(heightMap);
                }}
            >
                Generate
            </button>
        </Control>
    );
};
