import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/freelancer.css';
import './styles/index.css';

import '@fortawesome/react-fontawesome';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />);