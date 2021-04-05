import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';

function setEnv(env, scene, renderer) {
    var texture = env;
    var pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    var envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;
    // scene.background = env;
    texture.dispose();
    pmremGenerator.dispose();
}

function setModel(data) {

    const model = data.scene;
    model.position.y = 1;

    const clip = data.animations[0];

    data.scene.traverse(m => {
        if (m.isMesh) {
            m.castShadow = true;
        }
    })

    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();

    model.tick = function (delta) {
        mixer.update(delta);
    }

    return model;
}

export { setModel, setEnv }