import IGame from "../components/IGame.tsx";
import request from "../functions/request.tsx";
import React from "react";
import Button from 'react-bootstrap/Button';

type Word = {
    word: any,
    available_life: any;
  }


type WordCheck = {
    vidas_restantes: any;
}
  

class Escribo extends IGame {

    constructor(props:any){
        super(props);
        // buscamos la palabra a validar
        this.newGame = this.newGame.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.newGame();
    }

    newGame() {
        request<Word>("http://localhost:9000/v0/ortografia/"+this.props.jugador_id).then(m => {

            let _palabra = m.data;
            this.setState({palabra:_palabra['word']});
            this.setState({vidas_restantes:_palabra['available_life']});

        })
    }


    checkWord(opcion: any) {
        console.log(opcion);
        request<WordCheck>("http://localhost:9000/v0/ortografia/"+this.props.jugador_id+"/"+opcion.toString()).then(oc => {
            
            if (oc.data.success) {
            
                alert("Correcto! Has ganado! Se iniciará una nueva partida.");
                this.newGame();
            
            } else {
            
                alert("Incorrecto!");
                this.setState({vidas_restantes:oc.data['available_life']});

                if (oc.data['available_life']==0){
                    alert("Has perdido!");
                    this.setState({end_game:true});
                } else {
                    this.newGame();
                }

                    
            }

        });
    }

    
    defaultRender(): ReactNode {
        return (
            <div className="container">
            <section className="page-section text-white mb-0">
                <div className="container xl">

                    <h2 className="page-section-heading text-center text-uppercase mb-0 escribo-header">¿Qué tal la ortografía?</h2>

                    <div className="d-flex justify-content-center formula">
                        <div className="p-2">
                            <p className="escribo-box" id="palabra-escribo">{this.state.palabra}</p>
                        </div>
                    </div>
                    <div className="center">
                        <div className="row justify-content-center me-6">
                            <div className="col col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center">
                                <Button variant="danger escribo-btn" onClick={e => this.checkWord('false')}>Mal</Button>
                            </div>
                            <div className="col col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center">
                                <Button variant="primary escribo-btn" onClick={e => this.checkWord('true')}>Correcta</Button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <div className="p-2 vidas-restantes-box" id="vidas-restantes">{this.state.vidas_restantes}</div>
                        <div className="p-2 vidas-restantes-box">Vidas restantes: </div>
                    </div>
                </div>
            </section>
        </div>
        )   
    }
}

export default Escribo; 