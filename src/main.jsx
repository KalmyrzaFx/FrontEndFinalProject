import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const root = document.getElementById('root');

// Use createRoot to render your application
const appRoot = createRoot(root);
appRoot.render(<App />);