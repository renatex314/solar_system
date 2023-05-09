import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Skybox from './components/Skybox';
import Planet from './components/Planet';

const isControlsDisabled = (): boolean => {
    const url = window.location.search;
    let urlSplit: string[] = url.split('?');

    if (urlSplit.length < 2) return false;

    return urlSplit[1].indexOf('controls') !== -1;
}

const controlsDisabled: boolean = isControlsDisabled();
const planets: Planet[] = [];
const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.Camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight,
    0.1, 1000
);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const composer: EffectComposer = new EffectComposer(renderer);
let controls: OrbitControls = null;

if (!controlsDisabled) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
}

const addPostProcessing = (composer: EffectComposer): void => {
    const renderPass: RenderPass = new RenderPass(scene, camera);
    const bloomPass: UnrealBloomPass = new UnrealBloomPass(
        new THREE.Vector2(
            window.innerWidth, window.innerHeight
        ),
        2, 1, 0
    );
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
}

const animate = (): void => {
    requestAnimationFrame(animate);
    //renderer.render(scene, camera);
    
    planets.forEach(planet => planet.update());

    composer.render();

    if (controls !== null) {;   
        controls.update()
    }
}

const addPlanets = (...planetsList: Planet[]): void => {
    planetsList.forEach((planet: Planet) => {
        planet.addToScene(scene);
        planets.push(planet);
    });
}

const getAngularSpeed = (orbitRadius: number): number => 1 / orbitRadius;

scene.background = Skybox;
camera.position.x = -3.0955591966080465;
camera.position.y = 98.82336409478512;
camera.position.z = 229.689878407907;
camera.rotation.x = -0.4063064335130677;
camera.rotation.y = -0.012379277427183888;
camera.rotation.z = -0.0053259596643498025;

addPlanets(...[
    new Planet(
        Math.PI / 6, 0, 0, 20, 0xffff00
    ),
    new Planet(
        0, 40, getAngularSpeed(20), 1, 0xffffff
    ),
    new Planet(
        0, 60, -getAngularSpeed(40), 2, 0xffa500
    ),
    new Planet(
        0, 100, getAngularSpeed(70), 3, 0x41fdfe
    ),
    new Planet(
        0, 140, -getAngularSpeed(80), 6, 0xff0000
    ),
    new Planet(
        0, 160, getAngularSpeed(100), 4, 0x00ff00
    ),
]); 

addPostProcessing(composer);
animate();