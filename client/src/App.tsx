import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Header from "./components/Header";
import Home from "./pages/Home";
import Ahorcado from "./pages/Ahorcado";
import Grrr from "./pages/Grrr";
import Mates from "./pages/Mates";
import Escribo from "./pages/Escribo";
import Error404 from "./pages/Error404";
import Footer from "./components/Footer";
import Login from "./pages/Login";



interface App_state {
  ahorcado_id: number,
  grrr_id: number,
  mates_id: number,
  escribo_id: number,
  jugador_id: number,

  show_p: boolean,
  last_path:string
}



class App extends React.Component<{},App_state> {

  private ref_popup:any = null;
  
  constructor(props: {} | Readonly<{}>) {
    super(props);
    
    this.ref_popup = React.createRef();
    this.state = {
      ahorcado_id: -1,
      grrr_id: -1,
      mates_id: -1,
      escribo_id: -1,
      jugador_id: -1,

      show_p: false,
      last_path:''
    };

    this.setAhorcadoId = this.setAhorcadoId.bind(this);
    this.setMatesId = this.setMatesId.bind(this);
    this.setEscriboId = this.setEscriboId.bind(this);
    this.setGrrrId = this.setGrrrId.bind(this);
  }

  componentDidMount(): void {
    fetch("http://localhost:9000/v0/games")
    .then((response) => {
      if(!response.ok) throw new Error(response.statusText);
      else return response.json();
    })
    .then(data => {
        let games_arr = data.data.result;
        
        for (let index = 0; index < games_arr.length; index++) {
          const elem = games_arr[index];
          if (elem.name == "Ahorcado") {
            this.setAhorcadoId(elem.id);
          } else if (elem.name == "Corrección ortográfica") {
            this.setEscriboId(elem.id);
          } else if (elem.name == "¿Qué tal las matemáticas?") {
            this.setMatesId(elem.id);
          } else if (elem.name == "Grrr") {
            this.setGrrrId(elem.id);
          } else {
            alert("juego no reconocido"+ elem);
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
          if(!response.ok) throw new Error(response.statusText);
          else return response.json();
        })
      .then(data => {
          let _path = '';
          switch (id_game) {
            case this.state.ahorcado_id:
                _path = "/ahorcado";
                break;
          
            case this.state.grrr_id:
                _path = "/grrr";
                break;
            
            case this.state.mates_id:
                _path = "/mates";
                break;
              
            case this.state.escribo_id:
                _path = "/escribo";
                break;

            default:
              _path = "/";
              break;
          }
          this.setState({jugador_id:data.data.id_player,show_p:true,last_path:_path});
          this.ref_popup.current.setJugadorId(data.data.id_player);
          
      })
      .catch((error) => {
          alert(error);
          alert('Error grave: no se pudo setear el jugador y juego');
      });
    }
  }

  public getCallPath():string {
    return this.state.last_path;
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
            <Route path="/grrr" element={<Grrr jugador_id={this.state.jugador_id}
                                               app={this}
                                               id_game={this.state.grrr_id}/>} />
            <Route path="/mates" element={<Mates jugador_id={this.state.jugador_id}
                                                 app={this}
                                                 id_game={this.state.mates_id}/>} />
            <Route path="/escribo" element={<Escribo jugador_id={this.state.jugador_id}
                                                     app={this}
                                                     id_game={this.state.escribo_id}/>} />
            <Route path="/login" element={<Login ref={this.ref_popup} app={this}/>} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </Router>
        
      </div>
    );
  }
}


export default App;