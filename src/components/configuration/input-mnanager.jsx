import React, { useState, useEffect, useRef } from 'react';

/**
 * Manages mouse and keyboard input
 */
const InputManager = () => {
  const gameWindowRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isLeftMouseDown, setIsLeftMouseDown] = useState(false);
  const [isMiddleMouseDown, setIsMiddleMouseDown] = useState(false);
  const [isRightMouseDown, setIsRightMouseDown] = useState(false);

  useEffect(() => {
    const onMouseDown = (event) => {
      if (event.button === 0) {
        setIsLeftMouseDown(true);
      }
      if (event.button === 1) {
        setIsMiddleMouseDown(true);
      }
      if (event.button === 2) {
        setIsRightMouseDown(true);
      }
    };

    const onMouseUp = (event) => {
      if (event.button === 0) {
        setIsLeftMouseDown(false);
      }
      if (event.button === 1) {
        setIsMiddleMouseDown(false);
      }
      if (event.button === 2) {
        setIsRightMouseDown(false);
      }
    };

    const onMouseMove = (event) => {
      setIsLeftMouseDown(event.buttons & 1);
      setIsRightMouseDown(event.buttons & 2);
      setIsMiddleMouseDown(event.buttons & 4);
      setMouse({ x: event.clientX, y: event.clientY });
    };

    const gameWindow = gameWindowRef.current;

    gameWindow.addEventListener('mousedown', onMouseDown, false);
    gameWindow.addEventListener('mouseup', onMouseUp, false);
    gameWindow.addEventListener('mousemove', onMouseMove, false);
    gameWindow.addEventListener('contextmenu', (event) => event.preventDefault(), false);

    return () => {
      gameWindow.removeEventListener('mousedown', onMouseDown);
      gameWindow.removeEventListener('mouseup', onMouseUp);
      gameWindow.removeEventListener('mousemove', onMouseMove);
      gameWindow.removeEventListener('contextmenu', (event) => event.preventDefault());
    };
  }, []);

  return <div ref={gameWindowRef} id="game-window" style={{ width: '100%', height: '100%' }} />;
};

export default InputManager;
