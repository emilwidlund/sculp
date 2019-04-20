import * as React from 'react';

import RenderContext from '../RenderContext';
import { MapGenerator } from '../MapGenerator';

import { NumberControl } from './property-controls/NumberControl';
import { HeightmapControl } from './property-controls/HeightmapControl';
import { ImageControl } from './property-controls/ImageControl';

interface SidebarProps {}

export const Sidebar = (props: SidebarProps) => {
    const [seed, setSeed] = React.useState(0);
    const [scale, setScale] = React.useState(1);
    const [octaves, setOctaves] = React.useState(4);
    const [persistance, setPersistance] = React.useState(0.5);
    const [lacunarity, setLacunarity] = React.useState(2);
    const [offsetX, setOffsetX] = React.useState(0);
    const [offsetY, setOffsetY] = React.useState(0);

    React.useEffect(() => {
        const mapGenerator = new MapGenerator(400);
        const heightMap = mapGenerator.generateHeightMap(
            seed,
            scale,
            octaves,
            persistance,
            lacunarity,
            offsetX,
            offsetY
        );

        RenderContext.loadTerrainMesh(heightMap);
    });

    return (
        <div className="sidebar">
            <div className="section">
                <div className="header">
                    <span className="title">Visual Properties</span>
                </div>
                <div className="section-content">
                    <NumberControl title="Seed" defaultValue={seed} onChange={setSeed} />
                    <NumberControl title="Scale" defaultValue={scale} onChange={setScale} />
                    <NumberControl title="Octaves" defaultValue={octaves} onChange={setOctaves} />
                    <NumberControl title="Persistance" defaultValue={persistance} onChange={setPersistance} />
                    <NumberControl title="Lacunarity" defaultValue={lacunarity} onChange={setLacunarity} />
                    <NumberControl title="Offset X" defaultValue={offsetX} onChange={setOffsetX} />
                    <NumberControl title="Offset Y" defaultValue={offsetY} onChange={setOffsetY} />

                    <HeightmapControl
                        onHeightmapLoaded={heightMap => {
                            RenderContext.loadTerrainMesh(heightMap);
                        }}
                    />
                    <ImageControl
                        onImageLoaded={image => {
                            RenderContext.loadTerrainMesh(image);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
