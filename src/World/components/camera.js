import { PerspectiveCamera } from 'https://unpkg.com/three@0.126.0/build/three.module.js';


const fov = 45;
const near = 0.1;
const far = 1000;


function createCamera(container) {

	const aspect = container.clientWidth / container.clientHeight;

	const camera = new PerspectiveCamera(fov, aspect, near, far);

	camera.position.set(0, 2, 10);

	return camera;
}

export { createCamera };
