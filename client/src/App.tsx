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

  
  constructor(props:any) {
    super(props);
    
    this.state = {
      ahorcado_id: -1,
      grrr_id: -1,
      mates_id: -1,
      escribo_id: -1
    };

    this.getGameId = this.getGameId.bind(this);
  }

  componentDidMount(): void {
    fetch("http://localhost:9000/v0/games")
    .then(response => response.json())
    .then(data => {
      console.log(data.data);
        let games_arr = data.data;
        
        for (let index = 0; index < games_arr.length; index++) {
          const element = games_arr[index];
          
      }
      // aca deberiamos setear los id de los juegos
      this.getGameId("hola");
    });
    
  }

  getGameId(e) {
    this.setState({ahorcado_id:3});
  }
  

  
  render(): React.ReactNode {
    return (
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ahorcado" element={<Ahorcado game_id={this.state.ahorcado_id}/>} />
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