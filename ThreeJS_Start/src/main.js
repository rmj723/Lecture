import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js'
import { Utils } from './utils.js';
import { createObjects } from './scene.js';

const container = document.getElementById('scene-container');
const load_icon = document.getElementById('loader');

var App = function () {

    this.scene = Utils.Scene();
    this.camera = Utils.Camera(container);
    this.renderer = Utils.Renderer(container);
    this.orbit = Utils.Controls(this.camera, this.renderer);
}

Object.assign(App.prototype, {

    start: async function () {

        Utils.BuildLights(this.scene);
        Utils.Resizer(container, this.camera, this.renderer);

        this.model = await Utils.loadModel(this.scene, this.renderer);

        load_icon.style.display = 'none';

        createObjects(this.scene);

        this.animate();
    },


    animate: function () {

        const clock = new THREE.Clock();

        const render = () => {

            const delta = clock.getDelta();
            this.model.tick(delta);
            this.renderer.render(this.scene, this.camera);
            this.orbit.update();
            requestAnimationFrame(render);
        }
        render();
    }
})




console.clear();
const app = new App();
app.start();
