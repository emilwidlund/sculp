import * as React from 'react';

type Route = {
    path: string;
    icon: string;
};

interface NavigationProps {
    routes: Route[];
}

const Navigation = ({ routes }: NavigationProps) => {
    return (
        <div className="navigation">
            {routes.map(route => {
                return <div className="route">{route.icon}</div>;
            })}
        </div>
    );
};

interface SidebarProps {}

export const Sidebar = (props: SidebarProps) => {
    return (
        <div className="sidebar">
            <Navigation
                routes={[
                    {
                        icon: 'face',
                        path: '/layers'
                    },
                    {
                        icon: 'user',
                        path: '/settings'
                    }
                ]}
            />
        </div>
    );
};
