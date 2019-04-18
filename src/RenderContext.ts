import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import { WebGLRendererParameters, PerspectiveCamera } from 'three';

class RenderContext {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    orbitControls: any;

    initialized: boolean = false;

    initialize(width: number, height: number) {
        this.renderer = this.createWebGLRenderer({ antialias: true });
        this.scene = this.createScene();
        this.camera = this.createCamera(width, height);
        this.orbitControls = this.createOrbitControls(this.camera, this.renderer.domElement);

        this.initialized = true;
    }

    createWebGLRenderer(options: WebGLRendererParameters) {
        return new THREE.WebGLRenderer(options);
    }

    createScene() {
        return new THREE.Scene();
    }

    createCamera(width: number, height: number, fov: number = 75) {
        return new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
    }

    createOrbitControls(camera: PerspectiveCamera, domElement: HTMLCanvasElement) {
        return new OrbitControls(camera, domElement);
    }
}

export default new RenderContext();
