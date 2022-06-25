import IGame from "../components/IGame";
import request from "../functions/request";
import React, { ReactNode } from "react";
import Button from 'react-bootstrap/Button';
import Rankings from "../components/Rankings";

type Operando = {
    data: {
        operando1: number,
        operando2: number,
        resultado: number,
        vidas_restantes: number,
        available_life:number
    }
}

type OperandoCheck = {
    success:boolean
    data: {
        vidas_restantes: number,
        available_life:number
    }
}

export default class Mates extends IGame<{}> {

    constructor(props: any) {
        super(props);
        this.answer = this.answer.bind(this);
        this.newGame();
    }

    defaultRender(): ReactNode {
        return (
            <div className="container">
                <section className="page-section text-white mb-0" id="mates-container">
                    <div className="container xl">

                        <h2 className="page-section-heading text-center text-uppercase mb-0 operando-header">¿Qué tal las matemáticas?</h2>

                        <div className="d-flex justify-content-center formula">
                            <div className="p-2">
                                <p className="operando-mini-box" id="operando-numero-1">?</p>
                            </div>
                            <div className="p-2">
                                <p className="operando-mini-box" id="operando-desconocido">?</p>
                            </div>
                            <div className="p-2">
                                <p className="operando-mini-box" id="operando-numero-2">?</p>
                            </div>
                            <div className="p-2">
                                <p className="operando-mini-box" id="operando-igual">=</p>
                            </div>
                            <div className="p-2">
                                <p className="operando-mini-box" id="operando-resultado">?</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <div className="p-2 vidas-restantes-box" id="vidas-restantes">?</div>
                            <div className="p-2 vidas-restantes-box">Vidas restantes: </div>
                        </div>
                        <div className="row operandos-box">
                            <div className="col col-lg-3 col-md-3 col-sm-6 col-xs-12 operando-box text-center"><Button variant="primary operando" id="operando-suma" onClick={e => this.answer(e, '+')}>+</Button></div>
                            <div className="col col-lg-3 col-md-3 col-sm-6 col-xs-12 operando-box text-center"><Button variant="primary operando" id="operando-resta" onClick={e => this.answer(e, '-')}>—</Button></div>
                            <div className="col col-lg-3 col-md-3 col-sm-6 col-xs-12 operando-box text-center"><Button variant="primary operando" id="operando-multiplicacion" onClick={e => this.answer(e, '*')}>x</Button></div>
                            <div className="col col-lg-3 col-md-3 col-sm-6 col-xs-12 operando-box text-center"><Button variant="primary operando" id="operando-division" onClick={e => this.answer(e, '/')}>/</Button></div>
                        </div>

                    </div>
                </section>
                <Rankings />
            </div>
        );
    }

    newGame() {
        request<Operando>("http://localhost:9000/v0/math/"+this.props.jugador_id).then(m => {

            let mates = m.data;
            let operando1:any = document.getElementById('operando-numero-1') as HTMLInputElement | null;
            let operando2:any = document.getElementById('operando-numero-2') as HTMLInputElement | null;
            let resultado:any = document.getElementById('operando-resultado') as HTMLInputElement | null;
            let vidas_restantes:any = document.getElementById('vidas-restantes') as HTMLInputElement | null;

            if (operando1 != null) {
                operando1.innerHTML = mates['operando1'];
            }

            if (operando2 != null) {
                operando2.innerHTML = mates['operando2'];
            }

            if (resultado != null) {
                resultado.innerHTML = mates['resultado'];
            }

            if (vidas_restantes != null) {
                vidas_restantes.innerHTML = mates['available_life'];
            }

        })
    }

    answer = (e: any, operator: string) => {
        e.preventDefault();
        this.checkOperator(operator);
    }

    checkOperator(operator_client: string) {

        request<OperandoCheck>("http://localhost:9000/v0/math/"+this.props.jugador_id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                operator: operator_client
            })})
            .then(data => {

                if (data.success == true) {
        
                    super.setState({win_game:true});

                } else {

                    let vidas_restantes:any = document.getElementById('vidas-restantes') as HTMLInputElement | null;
        
                    if (vidas_restantes != null) {
                        vidas_restantes.innerHTML = data.data["available_life"];
                    }

                    super.setState({end_game:true});

                }
            }
        );

    }

}