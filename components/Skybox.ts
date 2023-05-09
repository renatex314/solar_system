import * as THREE from 'three';

const loader: THREE.CubeTextureLoader = new THREE.CubeTextureLoader();
const texture: THREE.CubeTexture = loader.load([
    '../assets/imgs/positiveX.png',
    '../assets/imgs/negativeX.png',
    '../assets/imgs/positiveY.png',
    '../assets/imgs/negativeY.png',
    '../assets/imgs/positiveZ.png',
    '../assets/imgs/negativeZ.png',
]);
const skybox: THREE.Texture = texture;

export default skybox;