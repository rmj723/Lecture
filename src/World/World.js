import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

import { loadBirds } from './components/birds/birds.js';
import { Train } from './components/Train/Train.js';

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {

    constructor(container) {

        camera = createCamera(container);
        renderer = createRenderer();
        scene = createScene();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);
        controls = createControls(camera, renderer.domElement);

        const { ambientLight, mainLight } = createLights();

        loop.updatables.push(controls);
        scene.add(ambientLight, mainLight);

        const resizer = new Resizer(container, camera, renderer);
    }

    async init() {

        // const { parrot, flamingo, stork } = await loadBirds();
        // loop.updatables.push(parrot, flamingo, stork);
        // scene.add(parrot, flamingo, stork);

        // const train = new Train();
        // loop.updatables.push(train);
        // scene.add(train);


    }

    render() {

        renderer.render(scene, camera);
    }

    start() {

        loop.start();
    }

    stop() {

        loop.stop();
    }
}

export { World };
