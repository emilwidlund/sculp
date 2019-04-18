import * as React from 'react';

import { MapGenerator } from '../MapGenerator';

const mg = new MapGenerator(100, 100);

export const HeightmapGenerator = () => {
    const [heightMap, setHeightMap] = React.useState(mg.generateHeightMap(10));

    return (
        <div>
            <img src={heightMap} width={100} height={100} />
            <button onClick={() => setHeightMap(mg.generateHeightMap(Math.random() * 10))}>Generate Map</button>
        </div>
    );
};
