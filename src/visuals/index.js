import Stats from 'stats.js';
import * as THREE from 'three';
import * as socket from './socket';

const stats = new Stats();
document.body.appendChild(stats.dom);

const segments = new Array(3).fill(0);
socket.onTick((data) => {
    segments[0] = data.low;
    segments[1] = data.mid;
    segments[2] = data.high;
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 1, 1, 100000);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
document.body.appendChild(renderer.domElement);

window.addEventListener('load', () => {
    window.addEventListener('resize', resize);
    resize();
    tick();
});

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function tick() {
    requestAnimationFrame(tick);

    stats.begin();

    renderer.render(scene, camera);

    stats.end();
}
