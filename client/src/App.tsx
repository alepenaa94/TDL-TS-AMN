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
import Escribo from "./pages/Escribo.tsx";
// @ts-ignore
import Error404 from "./pages/Error404.tsx";
// @ts-ignore
import Footer from "./components/Footer.tsx";

class App extends React.Component {

  private ahorcado_id:number;
  private grrr_id:number;
  private mates_id:number;
  private escribo_id:number;
  
  constructor(props:any) {
    super(props);

    fetch("https://gorest.co.in/public/v2/posts/")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // aca deberiamos setear los id de los juegos
      this.ahorcado_id = 999;
    });
  }
  

  
  render(): React.ReactNode {
    return (
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ahorcado" element={<Ahorcado id={this.ahorcado_id}/>} />
            <Route path="/grrr" element={<Grrr />} />
            <Route path="/mates" element={<Mates />} />
            <Route path="/escribo" element={<Escribo />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    );
  }
}


export default App;