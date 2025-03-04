// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Initialize Screenpipe SDK
const initializeScreenpipe = async () => {
  try {
    // Dynamically import the Screenpipe SDK
    const { pipe } = await import('@screenpipe/browser');
    
    console.log('Screenpipe SDK initialized:', !!pipe);
    
    // You could add additional initialization here if needed
    
    return true;
  } catch (error) {
    console.error('Failed to initialize Screenpipe SDK:', error);
    return false;
  }
};

// Initialize app after attempting to load the SDK
const startApp = async () => {
  const sdkInitialized = await initializeScreenpipe();
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App sdkInitialized={sdkInitialized} />
    </React.StrictMode>,
  );
};

startApp();