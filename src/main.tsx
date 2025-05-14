
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// ClickCease tracking script implementation
const addClickCeaseTracking = () => {
  // Create and append the main script
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://www.clickcease.com/monitor/stat.js';
  document.head.appendChild(script);
  
  // Create noscript element for fallback tracking
  const noscriptContainer = document.createElement('div');
  noscriptContainer.innerHTML = `
    <noscript>
      <a href='https://www.clickcease.com' rel='nofollow'>
        <img src='https://monitor.clickcease.com' alt='ClickCease'/>
      </a>
    </noscript>
  `;
  
  // Add noscript element to the body
  document.body.appendChild(noscriptContainer);
  
  console.log("ClickCease tracking added to the page");
};

// Call the function to add ClickCease tracking on every page load/navigation
addClickCeaseTracking();

// This ensures that ClickCease tracking is re-added even after SPA route changes
document.addEventListener('DOMContentLoaded', () => {
  addClickCeaseTracking();
});

// React router navigation listener
const handleRouteChange = () => {
  addClickCeaseTracking();
  console.log("ClickCease tracking re-added after route change");
};

// Listen for History API changes (when using React Router)
window.addEventListener('popstate', handleRouteChange);

createRoot(document.getElementById("root")!).render(<App />);
