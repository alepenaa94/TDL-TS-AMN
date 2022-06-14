import React from 'react';
import { Navigate } from 'react-router-dom';



class Mates extends React.Component {

    constructor(props:any){
        super(props);
        
        this.state = {
            end_game:false,
            log_in:false
        }

    }

    componentDidMount() {
        //  veamos antes de cargar algo si tenemos el login hecho
        this.props.app.callback_jugador(this.props.id_game);
        
    }

    
    render(): React.ReactNode {
        if (this.state.end_game) {
            alert("El juego finalizó");
            return <Navigate to="/" replace={true}  />
        } else if (this.props.jugador_id==-1) {
            return <Navigate to="/Login" replace={true} />
        }
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <section id="mates" className='amn-page text-center'> ESTE ES EL JUEGO DE LAS MATEMÁTICAS. </section>
                </div>
            </div>
        )   
    }
}

export default Mates; 