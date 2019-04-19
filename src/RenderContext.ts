import * as OrbitControls from 'three-orbitcontrols';
import { WebGLRendererParameters, PerspectiveCamera } from 'three';

const THREE = (window as any).THREE;

class RenderContext {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    orbitControls: any;
    transformControls: any;
    raycaster: THREE.Raycaster;

    terrainMesh: THREE.Mesh;

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

        const gridHelper = new THREE.GridHelper(500, 100, 0x333333, 0x333333);
        this.scene.add(gridHelper);

        const light = new THREE.PointLight();

        light.castShadow = true;

        light.shadow.bias = 0.0001;
        light.shadow.radius = 5;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;

        light.position.set(0, 100, 0);
        this.scene.add(light);

        this.camera.position.set(100, 100, 100);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.tick();
    }

    tick() {
        requestAnimationFrame(this.tick.bind(this));

        this.orbitControls.update();

        this.renderer.render(this.scene, this.camera);
    }

    loadTerrainMesh(heightMap: string) {
        this.generateTerrainMesh(
            heightMap,
            new THREE.MeshNormalMaterial({ wireframe: true }),
            (terrainMesh: THREE.Mesh) => {
                if (this.terrainMesh) {
                    this.transformControls.detach();
                    this.scene.remove(this.terrainMesh);
                }

                this.terrainMesh = terrainMesh;
                this.scene.add(this.terrainMesh);
            }
        );
    }

    generateTerrainMesh(heightMap: string, material: THREE.Material, cb: (terrainMesh: THREE.Mesh) => void) {
        this.createTerrainData(heightMap, (terrainData: Float32Array, width: number, height: number) => {
            const geometry = new THREE.PlaneGeometry(width, height, width - 1, height - 1);
            geometry.vertices.forEach((v: THREE.Vector3, index: number) => {
                v.setZ(v.z + terrainData[index]);
            });
            geometry.verticesNeedUpdate = true;
            geometry.computeVertexNormals();
            geometry.computeBoundingSphere();

            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.set(THREE.Math.degToRad(-90), 0, 0);

            cb(mesh);
        });
    }

    createWebGLRenderer(options: WebGLRendererParameters) {
        const renderer = new THREE.WebGLRenderer(options);
        renderer.setPixelRatio(window.devicePixelRatio);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        return renderer;
    }

    createScene() {
        return new THREE.Scene();
    }

    createCamera(width: number, height: number, fov: number = 35) {
        return new THREE.PerspectiveCamera(fov, width / height, 0.1, 10000);
    }

    createOrbitControls(camera: PerspectiveCamera, domElement: HTMLCanvasElement) {
        const orbitControls = new OrbitControls(camera, domElement);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.3;

        return orbitControls;
    }

    createTransformControls(camera: PerspectiveCamera, domElement: HTMLCanvasElement) {
        const transformControls = new THREE.TransformControls(camera, domElement);

        transformControls.addEventListener('dragging-changed', (event: THREE.Event) => {
            this.orbitControls.enabled = !event.value;
        });

        transformControls.setSpace('local');

        return transformControls;
    }

    createTerrainData(heightMap: string, cb: (terrainData: Float32Array, width: number, height: number) => void) {
        const onImageLoad = () => {
            const { width, height } = image;

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var context = canvas.getContext('2d');

            const size = width * height;
            const terrainData = new Float32Array(size);

            context.drawImage(image, 0, 0);

            for (var i = 0; i < size; i++) {
                terrainData[i] = 0;
            }

            var imageData = context.getImageData(0, 0, width, height);

            var j = 0;
            for (let i = 0; i < imageData.data.length; i += 4) {
                terrainData[j++] = imageData.data[i] / 10;
            }

            cb(terrainData, width, height);
        };

        const image = new Image();
        image.onload = onImageLoad;
        image.src = heightMap;
    }
}

export default new RenderContext();
