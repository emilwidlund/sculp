import * as React from 'react';

import { HeightmapGenerator } from './HeightmapGenerator';

interface SidebarProps {}

export const Sidebar = (props: SidebarProps) => {
    return (
        <div className="sidebar">
            <div className="section">
                <div className="header">
                    <span className="title">Visual Properties</span>
                </div>
                <div className="section-content">
                    <HeightmapGenerator />
                </div>
            </div>
        </div>
    );
};
