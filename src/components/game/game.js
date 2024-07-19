import { createScene } from './scene.js';
import { createCity } from './city.js';

export function createGame() {
  const scene = createScene();
  const city = createCity(16);

  scene.initialize(city);

  document.addEventListener('mousedown', window.scene.onMouseDown, false);
  document.addEventListener('mouseup', window.scene.onMouseUp, false);
  document.addEventListener('mousemove', window.scene.onMouseMove, false);
  document.addEventListener('contextmenu', (event) => event.preventDefault(), false);

  const game = {
    update() {
      city.update();
      // scene.update(city);
    }
  }

  setInterval(() => {
    game.update();
  }, 1000);

  scene.start();
}