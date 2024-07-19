import React, { useRef, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';
import { createCamera } from './camera-manager';
import { useCity } from './use-city';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const { size, data, updateCity } = useCity(10); // Şehir boyutunu 10 olarak ayarladık
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);

  useEffect(() => {
    if (mountRef.current) {
      const gameWindow = mountRef.current;
      const newScene = new THREE.Scene();
      newScene.background = new THREE.Color(0x777777);
      setScene(newScene);

      const { camera: newCamera, handleMouseDown, handleMouseUp, handleMouseMove } = createCamera(gameWindow);
      setCamera(newCamera);

      const newRenderer = new THREE.WebGLRenderer();
      newRenderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
      gameWindow.appendChild(newRenderer.domElement);
      setRenderer(newRenderer);

      const setupLights = () => {
        const lights = [
          new THREE.AmbientLight(0xffffff, 0.2),
          new THREE.DirectionalLight(0xffffff, 0.3),
          new THREE.DirectionalLight(0xffffff, 0.3),
          new THREE.DirectionalLight(0xffffff, 0.3),
        ];

        lights[1].position.set(0, 1, 0);
        lights[2].position.set(1, 1, 0);
        lights[3].position.set(0, 1, 1);

        newScene.add(...lights);
      };
      setupLights();

      gameWindow.addEventListener('mousedown', handleMouseDown);
      gameWindow.addEventListener('mouseup', handleMouseUp);
      gameWindow.addEventListener('mousemove', handleMouseMove);

      return () => {
        gameWindow.removeEventListener('mousedown', handleMouseDown);
        gameWindow.removeEventListener('mouseup', handleMouseUp);
        gameWindow.removeEventListener('mousemove', handleMouseMove);
        gameWindow.removeChild(newRenderer.domElement);
      };
    }
  }, []); // Kamerayı ve renderer'ı yalnızca bir kez oluşturur

  useEffect(() => {
    if (scene && camera && renderer) {
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = mountRef.current.offsetWidth / mountRef.current.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [scene, camera, renderer]); // Animasyon ve boyut güncellemeleri için bağımlılıklar

  useEffect(() => {
    if (scene && camera && renderer) {
      const terrain = [];
      const buildings = [];
      for (let x = 0; x < size; x++) {
        const column = [];
        if (data[x]) {
          for (let y = 0; y < size; y++) {
            if (data[x][y]) {
              // Grass geometry
              const geometry = new THREE.BoxGeometry(1, 1, 1);
              const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
              const mesh = new THREE.Mesh(geometry, material);
              mesh.position.set(x, -0.5, y);
              scene.add(mesh);
              column.push(mesh);

              // Building geometry
              const tile = data[x][y];
              if (tile && tile.building) {
                const height = Number(tile.building.slice(-1));
                const buildingGeometry = new THREE.BoxGeometry(1, height, 1);
                const buildingMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 });
                const buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
                buildingMesh.position.set(x, height / 2, y);
                scene.add(buildingMesh);
                column.push(buildingMesh);
              }
            }
          }
        }
        terrain.push(column);
        buildings.push([...Array(size)]);
      }

      // Update city data periodically
      const intervalId = setInterval(() => {
        updateCity();
        // Update the scene based on the new city data
        for (let x = 0; x < size; x++) {
          for (let y = 0; y < size; y++) {
            const tile = data[x][y];
            const buildingMesh = buildings[x][y];

            if (tile && tile.building && tile.building.startsWith('building')) {
              const height = Number(tile.building.slice(-1));
              if (buildingMesh) {
                // Update existing building
                buildingMesh.geometry.dispose();
                buildingMesh.geometry = new THREE.BoxGeometry(1, height, 1);
                buildingMesh.position.set(x, height / 2, y);
              } else {
                // Create new building
                const buildingGeometry = new THREE.BoxGeometry(1, height, 1);
                const buildingMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 });
                const newBuildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
                newBuildingMesh.position.set(x, height / 2, y);
                scene.add(newBuildingMesh);
                buildings[x][y] = newBuildingMesh;
              }
            } else {
              // Remove building if it doesn't exist in the new data
              if (buildingMesh) {
                scene.remove(buildingMesh);
                buildings[x][y] = null;
              }
            }
          }
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [data, size, updateCity, scene, camera, renderer]); // Şehir verileri güncellenirken

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeScene;
