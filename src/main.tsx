import { createRoot } from 'react-dom/client';
import React, { useEffect } from 'react';
import App from './App'; // Removed .tsx extension
import './index.css';

// Dynamically add Google Fonts link to the document head
const addGoogleFonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@400;700&family=Atkinson+Hyperlegible:wght@400;700&family=Bangers&family=Borel&family=Cherry+Cream+Soda&family=Chewy&family=Edu+VIC+WA+NT+Beginner:wght@400;700&family=Fugaz+One&family=Indie+Flower&family=Noto+Sans+Warang+Citi&family=Poiret+One&family=Short+Stack&family=Sour+Gummy:ital,wght@0,400;1,400&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

const Main = () => {
  useEffect(() => {
    addGoogleFonts();
  }, []);

  return <App />;
};

createRoot(document.getElementById("root")!).render(<App />);