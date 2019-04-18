import * as React from 'react';

import RenderContext from '../RenderContext';

import { HeightmapGenerator } from './controls/HeightmapGenerator';
import { ImageInput } from './controls/ImageInput';

interface SidebarProps {}

export const Sidebar = (props: SidebarProps) => {
    return (
        <div className="sidebar">
            <div className="section">
                <div className="header">
                    <span className="title">Visual Properties</span>
                </div>
                <div className="section-content">
                    <HeightmapGenerator
                        onHeightmapLoaded={heightMap => {
                            RenderContext.loadTerrainMesh(heightMap);
                        }}
                    />
                    <ImageInput
                        onImageLoaded={image => {
                            RenderContext.loadTerrainMesh(image);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
