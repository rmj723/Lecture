import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js'

const createObjects = function (scene) {

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshLambertMaterial({ color: 'grey' })
    )
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

}

export { createObjects };