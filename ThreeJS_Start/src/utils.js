import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://unpkg.com/three@0.126.0/examples/jsm/loaders/RGBELoader.js';

const Utils = {

    Scene: function () {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#223388');
        scene.add(new THREE.AxesHelper(5));
        return scene;
    },

    Camera: function (container) {

        const fov = 45;
        const near = 0.1;
        const far = 10000;
        const aspect = container.clientWidth / container.clientHeight;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 2, 10);
        window.camera = camera;
        return camera;
    },

    BuildLights: function (scene) {
        const ambientLight = new THREE.HemisphereLight(0xffffff, 0xeeeeee, 0.9);
        const directionalLight = new THREE.PointLight(0xffffff, 1);
        directionalLight.position.set(5, 8, 0);
        directionalLight.castShadow = true;
        scene.add(ambientLight, directionalLight);
    },


    Controls: function (camera, renderer) {
        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.target.set(0, 0, 0);
        orbit.enableDamping = true;
        orbit.enablePan = false;
        return orbit;
    },

    Renderer: function (container) {

        const renderer = new THREE.WebGLRenderer({ antialias: true, antialias: true, alpha: true, preserveDrawingBuffer: true });

        renderer.outputEncoding = THREE.sRGBEncoding;

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        container.append(renderer.domElement);

        return renderer;
    },

    Resizer: function (container, camera, renderer) {

        const setSize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
        }

        setSize();
        window.addEventListener('resize', setSize);
    },

    loadModel: async function (scene, renderer) {

        const [envTexture, modelData] = await Promise.all([

            new Promise(resolve => {
                new RGBELoader().setDataType(THREE.UnsignedByteType).load('assets/env/venice_sunset_1k.hdr', resolve);
            }),

            new Promise(resolve => {
                new GLTFLoader().load('assets/models/model.glb', resolve);
            })
        ]);

        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();
        const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
        scene.environment = envMap;
        envTexture.dispose();
        pmremGenerator.dispose();

        const model = modelData.scene;
        model.traverse(m => {
            if (m.isMesh) {
                m.castShadow = true;
            }
        })
        model.position.y = 1;
        scene.add(model);

        const clip = modelData.animations[0];
        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(clip);
        action.play();

        model.tick = function (delta) {
            mixer.update(delta);
        }

        return model;
    }
}

export { Utils };