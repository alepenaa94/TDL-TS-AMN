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

import PopupLogin from "./components/Popup.tsx";





class App extends React.Component {

  private ref_popup:any = null;
  
  constructor(props:any) {
    super(props);
    
    this.ref_popup = React.createRef();
    this.state = {
      ahorcado_id: -1,
      grrr_id: -1,
      mates_id: -1,
      escribo_id: -1,
      jugador_id: -1,
      show_p: false
    };

    this.setAhorcadoId = this.setAhorcadoId.bind(this);
    this.setMatesId = this.setMatesId.bind(this);
    this.setEscriboId = this.setEscriboId.bind(this);
    this.setGrrrId = this.setGrrrId.bind(this);
  }

  componentDidMount(): void {
    fetch("http://localhost:9000/v0/games")
    .then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then(data => {
        let games_arr = data.data.result;
        
        for (let index = 0; index < games_arr.length; index++) {
          const elem = games_arr[index];
          console.log(elem.name);
          if (elem.name == "Ahorcado") {
            this.setAhorcadoId(elem.id);
          } else if (elem.name == "Corrección ortográfica") {
            this.setEscriboId(elem.id);
          } else if (elem.name == "¿Qué tal las matemáticas?") {
            this.setMatesId(elem.id);
          } else if (elem.name == "Grrr") {
            this.setGrrrId(elem.id);
          } else {
            alert("jeugo no reconocido"+ elem);
          }

      }
      
    })
    .catch((error) => {
      alert(error);
      alert('Error grave: no se pudo obtener juegos disponibles');
    });
    
  }

  setAhorcadoId(value:number) {
    this.setState({ahorcado_id:value});
  }
  setGrrrId(value:number) {
    this.setState({grrr_id:value});
  }
  setMatesId(value:number) {
    this.setState({mates_id:value});
  }
  setEscriboId(value:number) {
    this.setState({escribo_id:value});
  }
  
  public callback_jugador(id_game:number) {
    console.log("me llamasteeeeeeeeeeeee!!");
    if (this.state.jugador_id==-1) {
      fetch("http://localhost:9000/v0/players/addPlayerToGame", {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              id_game: id_game
          })
      })
      .then((response) => {
          if(!response.ok) throw new Error(response.status);
          else return response.json();
        })
      .then(data => {
          console.log(data.data.result);
          this.setState({jugador_id:data.data.id_player});
          this.ref_popup.current.showPopUp(data.data.id_player);
      })
      .catch((error) => {
          alert(error);
          alert('Error grave: no se pudo setear el jugador y juego');
      });
    }
  }

  
  render(): React.ReactNode {
    return (
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ahorcado" element={<Ahorcado jugador_id={this.state.jugador_id}
                                               id_game={this.state.ahorcado_id}
                                               app={this}/>} />
            <Route path="/grrr" element={<Grrr id_game={this.state.grrr_id}/>} />
            <Route path="/mates" element={<Mates id_game={this.state.mates_id}/>} />
            <Route path="/escribo" element={<Escribo id_game={this.state.escribo_id}/>} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </Router>
        <PopupLogin mensaje="Ingrese su nombre" ref={this.ref_popup} />
      </div>
    );
  }
}


export default App;