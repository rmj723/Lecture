import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import * as Utils from './system.js';

import { load } from './loadAssets/load.js';

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {

    constructor(container) {

        camera = Utils.Camera(container);
        renderer = Utils.Renderer();
        scene = Utils.Scene();
        loop = new Utils.Loop(camera, scene, renderer);
        container.append(renderer.domElement);
        controls = Utils.Controls(camera, renderer);

        const { ambientLight, mainLight } = Utils.Lights();

        loop.updatables.push(controls);
        scene.add(ambientLight, mainLight);
        const resizer = new Utils.Resizer(container, camera, renderer);
    }

    async init() {

        const loaderIcon = document.getElementById('loader');

        const model = await load(scene, renderer, loaderIcon);

        loop.updatables.push(model);

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshLambertMaterial({ color: 'grey' })
        )
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        scene.add(model, plane);

        var worker = new Worker('src/components/worker/worker.js', { type: "module" });
        worker.onmessage = function (e) {
            console.log(e.data);
        }
    }


    start() {

        loop.start();
    }

    stop() {
        loop.stop();
    }
}

export { World };
