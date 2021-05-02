import { showAxis } from './components/axis.js';

var shadowGenerator;

const Utils = {

    Scene: function (engine) {

        const scene = new BABYLON.Scene(engine);
        // scene.debugLayer.show({ showExplorer: true, embedMode: true });
        showAxis(scene, 5);

        return scene;
    },


    Engine: function (canvas) {
        const engine = new BABYLON.Engine(canvas, true, { preserveDrawingsBuffer: true, stencil: true });
        return engine;
    },


    Camera: function (canvas, scene) {

        const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 10, new BABYLON.Vector3(0, 0, 0), scene);

        camera.beta = 1.2;
        camera.radius = 10;

        // camera.position = new BABYLON.Vector3(0, 3, 8)

        // camera.upperBetaLimit = Math.PI / 2;
        // camera.lowerRadiusLimit = 14;
        camera.lockedTarget = new BABYLON.Vector3(0, 0, 0);

        camera.attachControl(canvas, true);

        camera.wheelPrecision = 100;

        return camera;
    },

    Env: function (scene) {

        scene.clearColor = BABYLON.Color3.FromHexString('#223388')

        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.5;
        light.specular = BABYLON.Color3.Black();

        var dirLight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(-0.5, -0.5, -0.5), scene);
        dirLight.specular = BABYLON.Color3.Blue();
        dirLight.intensity = 0.5;

        const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("assets/env/environment.dds", scene);
        hdrTexture.gammaSpace = false;
        scene.environmentTexture = hdrTexture;


        shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.blurKernel = 32;

        const gl = new BABYLON.GlowLayer("glow", scene, {
            mainTextureSamples: 4,
            blurKernelSize: 20
        });
    },

    loadModel: async function (scene) {

        const result = await Promise.all([
            BABYLON.SceneLoader.ImportMeshAsync(null, "/assets/models/", "model.glb", scene)
        ])

        const meshes = result[0].meshes;
        const animations = result[0].animationGroups;
        // animations[0].stop();
        // animations[0].play();
        scene.animationTimeScale = 0.6; //default 1

        console.clear();
        console.log(result)
        meshes.forEach(m => {
            shadowGenerator.getShadowMap().renderList.push(m);
        });
        meshes[0].position.y = 1;
    }
}



export { Utils };