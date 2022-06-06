import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// @ts-ignore
import Header from "./components/Header.tsx";
// @ts-ignore
import Home from "./pages/Home.tsx";
// @ts-ignore
import Ahorcado from "./pages/Ahorcado.tsx";
// @ts-ignore
import Grrr from "./pages/Grrr.tsx";
// @ts-ignore
import Mates from "./pages/Mates.tsx";
// @ts-ignore
import Error404 from "./pages/Error404.tsx";
// @ts-ignore
import Footer from "./components/Footer.tsx";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ahorcado" element={<Ahorcado />} />
          <Route path="/grrr" element={<Grrr />} />
          <Route path="/mates" element={<Mates />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
