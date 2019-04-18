import * as React from 'react';
import * as THREE from 'three';

import RenderContext from '../RenderContext';

const useThreeRenderer = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const rendererMount = ref.current;

        RenderContext.initialize(rendererMount.offsetWidth, rendererMount.offsetHeight);
        const { renderer, scene, camera } = RenderContext;

        renderer.setSize(rendererMount.offsetWidth, rendererMount.offsetHeight);
        ref.current.appendChild(renderer.domElement);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshNormalMaterial();
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        var animate = function() {
            requestAnimationFrame(animate);

            renderer.render(scene, camera);
        };

        animate();
    }, []);

    return ref;
};

interface CanvasProps {}

export const Canvas = (props: CanvasProps) => {
    const ref = useThreeRenderer();

    return <div className="canvas" ref={ref} />;
};
