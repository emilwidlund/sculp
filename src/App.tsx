import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';

import './scss/main.scss';

const App = () => (
    <div id="app">
        <Sidebar />
        <Canvas />
    </div>
);

ReactDOM.render(<App />, document.getElementById('react-mount'));
