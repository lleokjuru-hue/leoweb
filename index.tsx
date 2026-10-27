
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      void registration.unregister();
    });
  }).catch(() => {});
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
