import * as React from 'react';

import { MapGenerator } from '../MapGenerator';

interface HeightmapGeneratorProps {
    onHeightmapLoaded(data: string): void;
}

const mg = new MapGenerator(100);

export const HeightmapGenerator = ({ onHeightmapLoaded }: HeightmapGeneratorProps) => {
    const [heightMapSeed, setHeightMapSeed] = React.useState(0);
    const [heightMap, setHeightMap] = React.useState(null);

    return (
        <div>
            <img src={heightMap} width={100} height={100} />
            <button
                onClick={() => {
                    const heightMap = mg.generateHeightMap(4, heightMapSeed);

                    setHeightMap(heightMap);
                    setHeightMapSeed(heightMapSeed + 1);

                    onHeightmapLoaded(heightMap);
                }}
            >
                Generate Map
            </button>
        </div>
    );
};
