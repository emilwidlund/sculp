import * as React from 'react';
import * as ReactDOM from 'react-dom';

import RenderContext from './RenderContext';

import { Toolbar } from './components/Toolbar';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';

import './scss/main.scss';

const App = () => (
    <div id="app">
        <Toolbar
            tools={[
                {
                    icon: 'navigation',
                    onClick: () => {
                        RenderContext.transformControls.detach();
                    }
                },
                {
                    icon: 'swap_vert',
                    onClick: () => {
                        RenderContext.transformControls.attach(RenderContext.terrainMesh);
                        RenderContext.transformControls.setMode('translate');
                    }
                },
                {
                    icon: '3d_rotation',
                    onClick: () => {
                        RenderContext.transformControls.attach(RenderContext.terrainMesh);
                        RenderContext.transformControls.setMode('rotate');
                    }
                },
                {
                    icon: 'fullscreen',
                    onClick: () => {
                        RenderContext.transformControls.attach(RenderContext.terrainMesh);
                        RenderContext.transformControls.setMode('scale');
                    }
                }
            ]}
        />
        <Canvas />
        <Sidebar />
    </div>
);

ReactDOM.render(<App />, document.getElementById('react-mount'));
