import * as THREE from 'three';
import { createCamera } from './camera';

export function createScene() {
  // inital scene setup
  const gameWindow = document.getElementById('render-target');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777777);

  const camera = createCamera(gameWindow);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  gameWindow.appendChild(renderer.domElement);



  let terrain = [];
  let buildings = [];
  function initialize(city) {
    scene.clear();
    terrain = [];
    buildings = [];
    for (let x = 0; x < city.size; x++) {
      const column = [];
      for (let y = 0; y < city.size; y++) {
        // 1. Load the mesh/3d object corresponding to the tile type at (x, y)
        // 2. Add that mesh to the scene
        // 3. Add the mesh to the meshes array
        const geometry = new THREE.BoxGeometry(1, 1, 1,);
        const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
        const mesh = new THREE.mesh(geometry, material);
        mesh.position.set(x, 0, y);
        scene.add(mesh);
        column.push(mesh);
      }
      terrain.push(column);
      buildings.push([...Array(city.size)]);
    }

    function update(city) {
      for (let x = 0; x < city.size; x++) {
        for (let y = 0; y < city.size; y++) {
          const tile = city.data[x][y];

          if (tile && tile.building && tile.building.startsWith('building')) {
            const height = Number(tile.building.slice(-1));
            const buildingGeometry = new THREE.BoxGeometry(1, height, 1);
            const buildingMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 });
            const buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
            buildingMesh.position.set(x, height / 2, y);

            if (buildings[x][y]) {
              scene.remove(buildings[x][y]);
            }
            scene.add(buildingMesh);
            buildings[x][y] = buildingMesh;
          }
        }
      }
    }

    function setupLights() {
      const lights = [
        new THREE.AmbientLight(0xffffff, 0.2),
        new THREE.DirectionalLight(0xffffff, 0.3),
        new THREE.DirectionalLight(0xffffff, 0.3),
        new THREE.DirectionalLight(0xffffff, 0.3),
      ];

      lights[1].position.set(0, 1, 0);
      lights[2].position.set(1, 1, 0);
      lights[3].position.set(0, 1, 1);

      scene.add(...lights);
    }

    function draw() {
      renderer.render(scene, camera.camera);
    }

    function start() {
      renderer.setAnimationLoop(draw);
    }

    function stop() {
      renderer.setAnimationLoop(null);
    }

    function onMouseDown(event) {
      camera.onMouseDown(event);
    }

    function onMouseUp(event) {
      camera.onMouseUp(event);
    }

    function onMouseMove(event) {
      camera.onMouseMove(event);
    }

    return {
      initialize,
      update,
      start,
      stop,
      onMouseDown,
      onMouseUp,
      onMouseMove
    }
  }
}