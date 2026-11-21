import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/manrope';
import '@fontsource/noto-sans-arabic/400.css';
import '@fontsource/noto-sans-arabic/500.css';
import '@fontsource/noto-sans-arabic/700.css';
import './styles/site.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
