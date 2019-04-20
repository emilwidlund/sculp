import * as React from 'react';

import RenderContext from '../RenderContext';
import { HeightMap } from '../HeightMapGenerator';

import { NumberControl } from './property-controls/NumberControl';
import { ImageControl } from './property-controls/ImageControl';

interface SidebarProps {}

export const Sidebar = (props: SidebarProps) => {
    const [heightMap, setHeightMap] = React.useState(null);

    const [width, setWidth] = React.useState(100);
    const [height, setHeight] = React.useState(100);
    const [seed, setSeed] = React.useState(0);
    const [scale, setScale] = React.useState(1);
    const [octaves, setOctaves] = React.useState(4);
    const [persistance, setPersistance] = React.useState(0.5);
    const [lacunarity, setLacunarity] = React.useState(2);
    const [offsetX, setOffsetX] = React.useState(0);
    const [offsetY, setOffsetY] = React.useState(0);

    React.useEffect(() => {
        setHeightMap(
            new HeightMap(width, height, seed, scale, octaves, persistance, lacunarity, offsetX, offsetY).base64
        );
    });

    return (
        <div className="sidebar">
            <div className="section">
                <div className="header">
                    <span className="title">Visual Properties</span>
                </div>
                <div className="section-content">
                    <div
                        style={{
                            height: 232,
                            backgroundImage: `url(${heightMap})`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover'
                        }}
                    />

                    <NumberControl title="Width" defaultValue={width} onChange={setWidth} />
                    <NumberControl title="Height" defaultValue={height} onChange={setHeight} />
                    <NumberControl title="Seed" defaultValue={seed} onChange={setSeed} />
                    <NumberControl title="Scale" defaultValue={scale} onChange={setScale} />
                    <NumberControl title="Octaves" defaultValue={octaves} onChange={setOctaves} />
                    <NumberControl title="Persistance" defaultValue={persistance} onChange={setPersistance} />
                    <NumberControl title="Lacunarity" defaultValue={lacunarity} onChange={setLacunarity} />
                    <NumberControl title="Offset X" defaultValue={offsetX} onChange={setOffsetX} />
                    <NumberControl title="Offset Y" defaultValue={offsetY} onChange={setOffsetY} />

                    <button
                        onClick={() => {
                            RenderContext.loadTerrainMesh(heightMap);
                        }}
                    >
                        Generate Terrain
                    </button>

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
