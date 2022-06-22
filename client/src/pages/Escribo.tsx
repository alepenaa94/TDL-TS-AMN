import IGame from "../components/IGame";
import request from "../functions/request";
import React from "react";
import Button from 'react-bootstrap/Button';
import Gen_prop from "../components/types/gen_prop";
import IGame_state from "../components/types/igame_state";
import IGame_state from "../components/types/igame_state";


type data = {
    word?:string,
    available_life?:number
}

interface Word {
    success?:boolean,
    data?: data,
    word?: string,
    available_life?: number;
  }


interface WordCheck extends Word {
    vidas_restantes?: number;
}
  
type Esc_state = {
    palabra?:string,
    vidas_restantes?:number

}


class Escribo extends IGame<Esc_state> {

    constructor(props:Gen_prop){
        super(props);
        // buscamos la palabra a validar
        this.newGame = this.newGame.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.newGame();
    }

    newGame() {
        request<Word>("http://localhost:9000/v0/ortografia/"+this.props.jugador_id).then(m => {

            let _palabra:data = m.data;
            this.setState({data:{palabra:_palabra['word'],
                                 vidas_restantes:_palabra['available_life']}});

        })
    }


    checkWord(opcion: any) {
        console.log(opcion);
        request<WordCheck>("http://localhost:9000/v0/ortografia/"+this.props.jugador_id+"/"+opcion.toString()).then(oc => {
            console.log(oc);
            if (oc.success) {
                this.setState({win_game:true});
            
            } else {
            
                alert("Incorrecto!");
                this.setState({data:{vidas_restantes:oc.data['available_life']}});

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