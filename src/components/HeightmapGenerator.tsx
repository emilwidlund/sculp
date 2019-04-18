import * as React from 'react';

import RenderContext from '../RenderContext';
import { MapGenerator } from '../MapGenerator';

const mg = new MapGenerator(100, 100);

export const HeightmapGenerator = () => {
    const [heightMap, setHeightMap] = React.useState(null);

    return (
        <div>
            <img src={heightMap} width={100} height={100} />
            <button
                onClick={() => {
                    const heightMap = mg.generateHeightMap(4);

                    setHeightMap(heightMap);
                    RenderContext.createTerrainFromHeightMap(heightMap);
                }}
            >
                Generate Map
            </button>
        </div>
    );
};
