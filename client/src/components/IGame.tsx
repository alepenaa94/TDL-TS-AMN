import React from 'react';
import { Navigate } from 'react-router-dom';
import Popup from './Popup.tsx';


abstract class IGame extends React.Component<any, any> {
    private pop_end:any = null;
    private pop_win:any = null;
    
    constructor(props:any) {
        super(props);
        this.state = {
            end_game: false,
            login: false
        }
        this.pop_end = React.createRef();
        this.pop_win = React.createRef();
    }

    componentDidMount() {
        //  veamos antes de cargar algo si tenemos el login hecho
        this.props.app.callback_jugador(this.props.id_game);
    }

    setEndGame() {
        this.pop_end.current.showPopUp();
    }

    setWin() {
        this.pop_win.current.showPopUp();
    }


    abstract defaultRender():React.ReactNode;

    render(): React.ReactNode {
        if (this.state.end_game) {
            this.setEndGame();
        }
        if (this.state.win_game) {
            this.setWin();
        }
        if (this.props.jugador_id==-1) {
            return <Navigate to="/Login" replace={true} />
        } else {
            return (
                <div>
                    {this.defaultRender()}
                    <Popup ref={this.pop_win} wait={300} path_r="/" mensaje="Ganaste!!!" />
                    <Popup ref={this.pop_end} wait={300} path_r="/" mensaje="Perdiste :(" />
                </div>
            );
        }
    }
}

export default IGame; 
