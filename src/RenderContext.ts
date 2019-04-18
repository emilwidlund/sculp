import * as OrbitControls from 'three-orbitcontrols';
import { WebGLRendererParameters, PerspectiveCamera } from 'three';

const THREE = (window as any).THREE;

class RenderContext {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    orbitControls: any;
    transformControls: any;

    initialized: boolean = false;

    initialize(width: number, height: number) {
        this.renderer = this.createWebGLRenderer({ antialias: true });
        this.scene = this.createScene();
        this.camera = this.createCamera(width, height);
        this.orbitControls = this.createOrbitControls(this.camera, this.renderer.domElement);
        this.transformControls = this.createTransformControls(this.camera, this.renderer.domElement);

        this.setupScene();

        this.initialized = true;
    }

    setupScene() {
        this.scene.add(this.transformControls);

        const gridHelper = new THREE.GridHelper(100, 100, 0x333333, 0x333333);
        this.scene.add(gridHelper);

        const light = new THREE.PointLight();
        light.position.set(0, 20, 0);
        this.scene.add(light);

        const geometry = new THREE.BoxGeometry(10, 0.2, 10);
        const material = new THREE.MeshPhongMaterial();
        const cube = new THREE.Mesh(geometry, material);

        this.scene.add(cube);

        this.transformControls.attach(cube);

        this.camera.position.set(20, 10, 20);
        this.camera.lookAt(cube.position);

        this.tick(cube);
    }

    tick(cube: THREE.Mesh) {
        requestAnimationFrame(() => this.tick(cube));

        // cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    }

    createWebGLRenderer(options: WebGLRendererParameters) {
        const renderer = new THREE.WebGLRenderer(options);
        renderer.setPixelRatio(window.devicePixelRatio);

        return renderer;
    }

    createScene() {
        return new THREE.Scene();
    }

    createCamera(width: number, height: number, fov: number = 35) {
        return new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
    }

    createOrbitControls(camera: PerspectiveCamera, domElement: HTMLCanvasElement) {
        const orbitControls = new OrbitControls(camera, domElement);
        orbitControls.update();

        return orbitControls;
    }

    createTransformControls(camera: PerspectiveCamera, domElement: HTMLCanvasElement) {
        const transformControls = new THREE.TransformControls(camera, domElement);

        transformControls.addEventListener('dragging-changed', (event: THREE.Event) => {
            this.orbitControls.enabled = !event.value;
        });

        transformControls.setSpace('local');
        transformControls.setMode('rotate');

        return transformControls;
    }
}

export default new RenderContext();
