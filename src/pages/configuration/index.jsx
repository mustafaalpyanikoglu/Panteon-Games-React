import React from 'react';
import './configuration.css'
import ThreeScene from '../../components/configuration/create-scene';
import MouseOverlay from '../../components/configuration/mouse-overlay';

const ConfigurationPage = () => {
  return (
    <div>
      <ThreeScene />
      <MouseOverlay />
    </div>
  );
};

export default ConfigurationPage;