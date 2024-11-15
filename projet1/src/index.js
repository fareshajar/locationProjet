import React from 'react';
import ReactDOM from 'react-dom/client'; // Importer depuis 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Créer un root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendre l'application dans le root
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
