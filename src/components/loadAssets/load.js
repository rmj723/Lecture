import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://unpkg.com/three@0.126.0/examples/jsm/loaders/RGBELoader.js';
import { setModel, setEnv } from './setup.js';

async function load(scene, renderer, loaderIcon) {

    const loader = new GLTFLoader();

    const [modelData, env] = await Promise.all([

        loader.loadAsync('/assets/model.glb'),

        new Promise(resolve => {
            new RGBELoader().setDataType(THREE.UnsignedByteType).load('assets/env/venice_sunset_1k.hdr', resolve)
        })
    ]);

    loaderIcon.style.display = 'none';

    const model = setModel(modelData);

    setEnv(env, scene, renderer);

    return model;
}

export { load };