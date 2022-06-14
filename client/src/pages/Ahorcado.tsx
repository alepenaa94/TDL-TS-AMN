import IGame from "../components/IGame.tsx";

import Figura from '../components/ahorcado/Figura.tsx';
import PalabraOfuscada from '../components/ahorcado/PalabraOfuscada.tsx';
import LetrasErroneas from '../components/ahorcado/LetrasErroneas.tsx';
import React from "react";


class Ahorcado extends IGame {
    private pal_ofsc:any = null;
    private letras_err:any = null;
    private figura:any = null;

    constructor(props:any){
        super(props);
        this.pal_ofsc = React.createRef();
        this.figura = React.createRef();
        this.letras_err = React.createRef();

        window.addEventListener('keydown',this.handleKeydown);
    }


    componentWillUnmount() {
        window.removeEventListener('keydown',this.handleKeydown);
    }

    handleKeydown = event => {
        const { key, keyCode } = event;
        if ( keyCode >= 65 && keyCode <= 90) {
            let mi_letter:string = key.toLowerCase();
            
            console.log(mi_letter);

            //chequeamos primero si no la ingreso ya erronea..
            if(this.letras_err.current.checkLetraErr(mi_letter)) {
                alert("letra erronea ya ingresada!");
            }else {

                fetch("http://localhost:9000/v0/hangman/"+this.props.jugador_id+"/"+mi_letter)
                .then((response) => {
                    if(!response.ok) {
                        // aca deberiamos manejar el que esta sin vida?
                        throw new Error(response.status);
                    }
                    else return response.json();
                })
                .then(data => {
                    // aca deberiamos chequear que el response sea 200
                    if (data.success = true){
                        alert("letra ok!!");
                        console.log('len='+data.data.location.length);
                        for (let index = 0; index < data.data.location.length; index++) {
                            console.log(data.data.location[index]);
                            this.pal_ofsc.current.setLetter(mi_letter,data.data.location[index]-1);
                        }                    
                    }
                    else {
                        alert("error fetch validar palabra");
                    }
                    
                })
                .catch((error) => {
                    alert('Letra erronea');
                    //TODO: arreglar esto asi feo..
                    if (this.figura.current.show_more()==false){
                        this.setState({end_game:true});
                    }else {
                        this.letras_err.current.addLetraErr(mi_letter);
                    }
                });
            }
        }
    }
    

    
    defaultRender(): ReactNode {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <section id="ahorcado" className='amn-page text-center h1'> ESTE ES EL JUEGO DEL AHORCADO. 
                        <div className='game-container'>
                            
                            <Figura ref={this.figura} />
                            
                            <PalabraOfuscada ref={this.pal_ofsc} jugador_id={this.props.jugador_id} />
                            <LetrasErroneas ref={this.letras_err} />
                            
                        </div>
                        
    
                    </section>
                </div>
            </div>
        )
    }
}

export default Ahorcado; 