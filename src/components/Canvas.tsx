import * as React from 'react';
import * as THREE from 'three';

import RenderContext from '../RenderContext';

const useThreeRenderer = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const rendererMount = ref.current;

        RenderContext.initialize(rendererMount.offsetWidth, rendererMount.offsetHeight);
        const { renderer, camera } = RenderContext;

        const onResize = () => {
            camera.aspect = rendererMount.offsetWidth / rendererMount.offsetHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(rendererMount.offsetWidth, rendererMount.offsetHeight);
        };

        window.addEventListener('resize', onResize);

        renderer.setSize(rendererMount.offsetWidth, rendererMount.offsetHeight);
        ref.current.appendChild(renderer.domElement);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return ref;
};

interface CanvasProps {}

export const Canvas = (props: CanvasProps) => {
    const ref = useThreeRenderer();

    return <div className="canvas" ref={ref} />;
};
