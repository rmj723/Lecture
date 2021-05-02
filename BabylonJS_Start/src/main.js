import { Utils } from './utils.js';
import { createSceneObjects } from './scene.js';
const load_icon = document.getElementById("loader");
const canvas = document.getElementById('canvas');


const App = function () {

    this.engine = Utils.Engine(canvas);
    this.scene = Utils.Scene(this.engine);
    this.camera = Utils.Camera(canvas, this.scene);

}

Object.assign(App.prototype, {

    start: async function () {

        Utils.Env(this.scene);

        await Utils.loadModel(this.scene);
        load_icon.style.display = 'none';

        createSceneObjects();

        this.animate();
    },


    animate: function () {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }

});


var app = new App();
app.start();

