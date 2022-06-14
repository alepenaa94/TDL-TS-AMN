import React from 'react';
import { Navigate } from 'react-router-dom';


abstract class IGame extends React.Component {
    private name: string;
    
    constructor(props:any) {
        super(props);
        this.state = {
            end_game: false,
            login: false
        }
    }

    componentDidMount() {
        //  veamos antes de cargar algo si tenemos el login hecho
        this.props.app.callback_jugador(this.props.id_game);
    }


    abstract defaultRender():React.ReactNode;

    render(): React.ReactNode {
        if (this.state.end_game) {
            alert("El juego finalizó");
            return <Navigate to="/" replace={true}  />
        } else if (this.props.jugador_id==-1) {
            return <Navigate to="/Login" replace={true} />
        } else {
            return this.defaultRender();    
        }
    }
}

export default IGame; 
