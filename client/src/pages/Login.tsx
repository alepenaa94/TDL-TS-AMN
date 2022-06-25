import React from "react";
import { Navigate } from "react-router";
import App from "../App";
import Gen_prop from "../components/types/gen_prop";


type Login_state = {
    jugador_id:number,
    need_return : boolean,
    path:string,
    nombre:string
}

type Login_props = {
    app: App
}

class Login extends React.Component<Login_props,Login_state> {


    constructor(props:Gen_prop) {
        super(props);
        this.state = {
            jugador_id:-1,
            need_return : false,
            path:'',
            nombre:'default'
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.setJugadorId = this.setJugadorId.bind(this);
    }

    public setJugadorId(new_id:number) {
        this.setState({jugador_id:new_id});
    }

    updateInput(event: { target: { value: string; }; }){
        this.setState({nombre : event.target.value})
    }

    clickHandler() {

        fetch("http://localhost:9000/v0/players/addNameToPlayer", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.jugador_id,
                name: this.state.nombre
            })
        })
        .then((response) => {
            if(!response.ok) throw new Error(response.statusText);
            else return response.json();
            })
        .catch((error) => {
            alert(error);
            alert('Error grave: no se pudo setear el jugador y juego');
        });
          
        let n_path:string = this.props.app.getCallPath();
        this.setState({path:n_path,need_return:true});
    }
        

    render(): React.ReactNode {
        if (this.state.need_return) {
            return <Navigate to={this.state.path} replace={true}  />
        }
        return (
            <div className="popup-container"style={{display:'flex'}} >
                <div className="popup">
                    <h2>Ingrese su nombre</h2>
                    <input onChange={this.updateInput} className="form-control" type="text" placeholder="Default input"></input>
                    <button onClick={this.clickHandler}>Enter</button>
                </div>
            </div>
        )    
    }
}

export default Login;