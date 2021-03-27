import { AnimationMixer } from 'https://unpkg.com/three@0.126.0/build/three.module.js';


function setupModel(data) {

  const model = data.scene.children[0];
  model.lookAt(0, 0, 0)

  model.scale.multiplyScalar(0.1)
  const clip = data.animations[0];

  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();

  model.tick = (delta) => mixer.update(delta);

  return model
}

export { setupModel };
