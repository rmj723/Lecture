import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js'
import { Utils } from './utils.js';
import { createObjects } from './scene.js';

const container = document.getElementById('scene-container');
const load_icon = document.getElementById('loader');

var App = function () {

    const scene = Utils.Scene();
    const camera = Utils.Camera(container);
    const renderer = Utils.Renderer(container);
    const orbit = Utils.Controls(camera, renderer);
    Utils.BuildLights(scene);
    Utils.Resizer(container, camera, renderer);

    this.start = async function () {

        this.model = await Utils.loadModel(scene, renderer);

        load_icon.style.display = 'none';

        createObjects(scene);

        this.animate();
    }


    this.animate = function () {

        const clock = new THREE.Clock();

        const render = () => {

            const delta = clock.getDelta();
            // this.model.tick(delta);
            renderer.render(scene, camera);
            orbit.update();
            requestAnimationFrame(render);
        }
        render();
    }
}


console.clear();
const app = new App();
app.start();
