import * as React from 'react';

import { Route } from '../types';

interface SidebarProps {
    routes: Route[];
}

export const Sidebar = (props: SidebarProps) => {
    return (
        <div className="sidebar">
            <div className="section">
                <div className="header">
                    <span className="title">Visual Properties</span>
                </div>
                <div className="section-content" />
            </div>
        </div>
    );
};
