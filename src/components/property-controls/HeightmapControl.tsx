import * as React from 'react';

import { PropertyControl } from './PropertyControl';
import { MapGenerator } from '../../MapGenerator';

interface HeightmapControlProps {
    onHeightmapLoaded(data: string): void;
}

const mg = new MapGenerator(100);

export const HeightmapControl = ({ onHeightmapLoaded }: HeightmapControlProps) => {
    const [heightMapSeed, setHeightMapSeed] = React.useState(0);
    const [heightMap, setHeightMap] = React.useState(null);

    const generateHeightMap = () => {
        const map = mg.generateHeightMap(heightMapSeed, 1);

        setHeightMap(map);
        setHeightMapSeed(heightMapSeed + 1);

        return map;
    };

    return (
        <PropertyControl title="Perlin Map">
            <div className="image" style={{ backgroundImage: `url(${heightMap})` }} />
            <button
                onClick={() => {
                    onHeightmapLoaded(generateHeightMap());
                }}
            >
                Generate
            </button>
        </PropertyControl>
    );
};
