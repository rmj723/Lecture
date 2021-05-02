
const createSceneObjects = function (scene) {

    const plane = BABYLON.MeshBuilder.CreatePlane("plane", { height: 8, width: 8 }, scene);

    const mat = new BABYLON.StandardMaterial('mat', scene);
    // mat.emissiveColor = new BABYLON.Color3(1, 0, 0);
    mat.diffuseColor = new BABYLON.Color3(1, 1, 1);
    mat.specularColor = new BABYLON.Color3(0, 1, 0);

    plane.material = mat;

    plane.receiveShadows = true;

    plane.posiion = new BABYLON.Vector3(0, 0, 0);

    plane.rotation.x = Math.PI / 2;
}

export { createSceneObjects };