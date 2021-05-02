import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js';


function Scene() {

    const scene = new THREE.Scene();

    scene.background = new THREE.Color('skyblue');

    scene.add(new THREE.AxesHelper(5))

    return scene;
}


function Camera(container) {

    const fov = 45;
    const near = 0.1;
    const far = 10000;
    const aspect = container.clientWidth / container.clientHeight;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(6, 4, 0);

    return camera;
}


function Lights() {

    const ambientLight = new THREE.HemisphereLight(
        'white',
        'darkslategrey',
        0.5,
    );

    const mainLight = new THREE.DirectionalLight('white', 1);
    // const mainLight = new THREE.PointLight('white', 1)
    mainLight.position.set(10, 10, 10);

    mainLight.castShadow = true;

    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;

    const d = 5;

    mainLight.shadow.camera.left = - d;
    mainLight.shadow.camera.right = d;
    mainLight.shadow.camera.top = d;
    mainLight.shadow.camera.bottom = - d;

    mainLight.shadow.camera.far = 1000;

    return { ambientLight, mainLight };
}





function Controls(camera, renderer) {

    const controls = new OrbitControls(camera, renderer.domElement);

    // controls.screenSpacePanning = false;
    // controls.maxPolarAngle = 1.57;
    // controls.minPolarAngle = 1.57
    controls.enableDamping = true;
    // controls.autoRotate = true;
    controls.tick = () => controls.update();

    return controls;
}


function Renderer() {

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // renderer.physicallyCorrectLights = true;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;

    return renderer;
}

function setSize(container, camera, renderer) {

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
}


class Resizer {

    constructor(container, camera, renderer) {

        setSize(container, camera, renderer);

        window.addEventListener('resize', () => {

            setSize(container, camera, renderer);

            this.onResize();
        });
    }

    onResize() { }

}


const clock = new THREE.Clock();

class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    start() {
        this.renderer.setAnimationLoop(() => {

            this.tick();
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        const delta = clock.getDelta();

        for (const object of this.updatables) {
            object.tick(delta);
        }
    }
}


export { Scene, Camera, Lights, Renderer, Controls, Resizer, Loop };