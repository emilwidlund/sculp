import * as React from 'react';
import * as _ from 'lodash';

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
                <div
                    style={{
                        height: 250,
                        backgroundImage: `url(${heightMap})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                    }}
                />
                <div className="section-content">
                    <NumberControl
                        title="Width"
                        min={10}
                        max={1000}
                        step={1}
                        defaultValue={width}
                        onChange={setWidth}
                    />
                    <NumberControl
                        title="Height"
                        min={10}
                        max={1000}
                        step={1}
                        defaultValue={height}
                        onChange={setHeight}
                    />
                    <NumberControl title="Seed" min={0} max={9999} step={1} defaultValue={seed} onChange={setSeed} />
                    <NumberControl
                        title="Scale"
                        min={0}
                        max={100}
                        step={0.1}
                        defaultValue={scale}
                        onChange={setScale}
                    />
                    <NumberControl
                        title="Octaves"
                        min={0}
                        max={10}
                        step={1}
                        defaultValue={octaves}
                        onChange={setOctaves}
                    />
                    <NumberControl
                        title="Persistance"
                        min={0}
                        max={10}
                        step={0.1}
                        defaultValue={persistance}
                        onChange={setPersistance}
                    />
                    <NumberControl
                        title="Lacunarity"
                        min={0}
                        max={10}
                        step={1}
                        defaultValue={lacunarity}
                        onChange={setLacunarity}
                    />
                    <NumberControl
                        title="Offset X"
                        min={0}
                        max={1000}
                        step={1}
                        defaultValue={offsetX}
                        onChange={setOffsetX}
                    />
                    <NumberControl
                        title="Offset Y"
                        min={10}
                        max={1000}
                        step={1}
                        defaultValue={offsetY}
                        onChange={setOffsetY}
                    />

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
