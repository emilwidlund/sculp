import * as React from 'react';

import RenderContext from '../RenderContext';
import { Icon } from './Icon';

interface Tool {
    icon: string;
    onClick(): void;
}

interface ToolbarProps {
    tools: Tool[];
}

export const Toolbar = ({ tools }: ToolbarProps) => {
    const [selectedTool, setSelectedTool] = React.useState(0);

    return (
        <div className="toolbar">
            {tools.map((tool, i) => {
                return (
                    <div
                        className={selectedTool === i ? 'tool active' : 'tool'}
                        onClick={() => {
                            if (!RenderContext.terrainMesh) return;

                            setSelectedTool(i);
                            tool.onClick();
                        }}
                    >
                        <Icon name={tool.icon} />
                    </div>
                );
            })}
        </div>
    );
};
