import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ApiContext from './context/ApiContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiContext>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </ApiContext>
    </BrowserRouter>
  </React.StrictMode>
);

