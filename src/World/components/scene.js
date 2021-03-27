import { Color, Scene, AxesHelper } from 'https://unpkg.com/three@0.126.0/build/three.module.js';

function createScene() {

  const scene = new Scene();

  scene.background = new Color('skyblue');

  scene.add(new AxesHelper(3))

  return scene;
}

export { createScene };
