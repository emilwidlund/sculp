import * as React from 'react';

import { Icon } from './Icon';
import { Route } from '../types';

interface NavigationProps {
    routes: Route[];
}

export const Navigation = ({ routes }: NavigationProps) => {
    return (
        <div className="navigation">
            {routes.map(route => {
                return (
                    <div className="route">
                        <Icon name={route.icon} />
                    </div>
                );
            })}
        </div>
    );
};
