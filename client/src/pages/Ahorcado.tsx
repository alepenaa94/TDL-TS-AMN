import IGame from "../components/IGame";

import Figura from '../components/ahorcado/Figura';
import PalabraOfuscada from '../components/ahorcado/PalabraOfuscada';
import LetrasErroneas from '../components/ahorcado/LetrasErroneas';
import React, { ReactNode } from "react";

class Ahorcado extends IGame {
    private pal_ofsc:any = null;
    private letras_err:any = null;
    private figura:any = null;
    private letras_cargadas:Array<string> = [];

    constructor(props:any) {

        super(props);
        this.pal_ofsc = React.createRef();
        this.figura = React.createRef();
        this.letras_err = React.createRef();

        window.addEventListener('keydown',this.handleKeydown);
        
    }


    componentWillUnmount() {
        window.removeEventListener('keydown',this.handleKeydown);
    }

    handleKeydown = (event: { key: any; keyCode: number; }) => {
        const { key, keyCode } = event;
        if ( keyCode >= 65 && keyCode <= 90) {
            let mi_letter:string = key.toLowerCase();

            //chequeamos primero si no la ingreso ya erronea..
            if(this.letras_err.current.checkLetraErr(mi_letter) ||
               this.letras_cargadas.includes(mi_letter)) {
                alert("Letra ya ingresada!");
            }else {
                // mandamos la validación al backend.. 
                fetch("http://localhost:9000/v0/hangman/"+this.props.jugador_id+"/"+mi_letter)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    // aca deberiamos chequear que el response sea 200
                    if (data.success == true){
                        for (let index = 0; index < data.data.location.length; index++) {
                            this.pal_ofsc.current.setLetter(mi_letter,data.data.location[index]-1);
                        }
                        this.letras_cargadas.push(mi_letter);
                        // aca tenemos que validar si se completo la palabra
                        // ofuscada.. si es asi mandamos al back fin de juego
                        // y lo mandamos a la pagina ganador.
                        if (this.pal_ofsc.current.getWordLeft()==0){
                            fetch("http://localhost:9000/v0/rank/"+
                                  this.props.id_game+"/"+this.props.jugador_id);
                            this.setState({win_game:true});
                        }
                    }
                    else {
                        alert(data.data.message);
                        this.figura.current.show_more();
                        if (data.data.available_life==0) {
                            this.setState({end_game:true});
                        }else {
                            this.letras_err.current.addLetraErr(mi_letter);
                        }
                    }
                    
                })
            }
        }
    }
    

    
    defaultRender(): ReactNode {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <section id="ahorcado" className='amn-page text-center h1'> AHORCADO
                        <div className='game-container'>
                            
                            <Figura ref={this.figura} />
                            
                            <PalabraOfuscada ref={this.pal_ofsc} jugador_id={this.props.jugador_id} id_game={this.props.id_game} app={this.props.app} />
                            <LetrasErroneas ref={this.letras_err} />
                            
                        </div>
                        
    
                    </section>
                </div>
            </div>
        )
    }
}

export default Ahorcado; 