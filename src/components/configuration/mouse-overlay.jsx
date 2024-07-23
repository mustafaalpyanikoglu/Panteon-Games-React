import React, { useState, useCallback, useEffect } from 'react';

const MouseOverlay = () => {
  const [message, setMessage] = useState('');

  const handleMouseDown = useCallback((event) => {
    switch (event.button) {
      case 0:
        setMessage('Left Click: Rotating Camera');
        break;
      case 1:
        setMessage('Middle Click: Rotating Camera');
        break;
      case 2:
        setMessage('Right Click: Zooming Camera');
        break;
      default:
        setMessage('');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleMouseDown]);

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      padding: '5px',
      borderRadius: '3px',
      zIndex: 1000,
      fontSize: '14px'
    }}>
      {message}
    </div>
  );
};

export default MouseOverlay;
