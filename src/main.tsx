
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// React router navigation listener
const handleRouteChange = () => {
  console.log("Route changed");
};

// Listen for History API changes (when using React Router)
window.addEventListener('popstate', handleRouteChange);

createRoot(document.getElementById("root")!).render(<App />);
