import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const NotificationContainer = () => (
  <ToastContainer
    position="bottom-right"
    theme="light"
    closeOnClick
    transition={Slide}
    autoClose={2500}
    pauseOnHover={false}
  />
);

export default NotificationContainer;
