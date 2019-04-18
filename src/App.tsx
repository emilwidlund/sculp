import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Navigation } from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';

import './scss/main.scss';

const App = () => (
    <div id="app">
        <Navigation routes={[{ path: '/', icon: 'face' }]} />
        <Canvas />
        <Sidebar routes={[{ path: '/', icon: 'face' }]} />
    </div>
);

ReactDOM.render(<App />, document.getElementById('react-mount'));
