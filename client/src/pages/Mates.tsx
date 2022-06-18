import IGame from "../components/IGame.tsx";
import request from "../functions/request.tsx";
import React from "react";
import Button from 'react-bootstrap/Button';

type Operando = {
  operando1: any;
  operando2: any;
  resultado: any;
  vidas_restantes: any;
}

export default class Mates extends IGame {

    private operando: any = null;

    constructor(props: any) {
        super(props);
        this.getOperation();
        this.operando = React.createRef();
    }

    defaultRender(): ReactNode {
        return (
            <div className="container">
                <section className="page-section text-white mb-0" id="mates-container">
                    <div className="container xl">

                        <h2 className="page-section-heading text-center text-uppercase mb-0 operando-header">¿Qué tal las matemáticas?</h2>

                        <div className="row justify-content-center formula">
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                <div className="text-center operando-mini-box" id="operando-numero-1">?</div>
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                <div className="text-center operando-mini-box" id="operando-desconocido" ref={elem => this.operando = elem}>?</div>
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                <div className="text-center operando-mini-box" id="operando-numero-2">?</div>
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                <div className="text-center operando-mini-box" id="operando-igual">=</div>
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                <div className="text-center operando-mini-box" id="operando-resultado">?</div>
                            </div>
                        </div>

                        <div className="row operandos-box">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 operando-box text-center"><Button variant="primary operando" id="operando-suma" onClick={this.operandoSuma}>+</Button></div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 operando-box text-center"><Button variant="primary operando" id="operando-resta" onClick={this.operandoResta}>—</Button></div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 operando-box text-center"><Button variant="primary operando" id="operando-multiplicacion" onClick={this.operandoMultiplicacion}>x</Button></div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 operando-box text-center"><Button variant="primary operando" id="operando-division" onClick={this.operandoDivision}>/</Button></div>
                        </div>

                    </div>
                </section>
            </div>
        );
    }

    getOperation() {
        request<Operando>("http://localhost:9000/v0/math/"+this.props.jugador_id).then(mates => {

            const operando1 = document.getElementById('operando-numero-1') as HTMLInputElement | null;
            const operando2 = document.getElementById('operando-numero-2') as HTMLInputElement | null;
            const operandoResultado = document.getElementById('operando-resultado') as HTMLInputElement | null;

            if (operando1 != null) {
                operando1.innerHTML = mates['operando1'];
            }

            if (operando2 != null) {
                operando2.innerHTML = mates['operando2'];
            }

            if (operandoResultado != null) {
                operandoResultado.innerHTML = mates['resultado'];
            }

        })
    }

    operandoSuma() {
        this.checkOperation('+');
    }

    operandoResta() {
        this.checkOperation('-');
    }

    operandoMultiplicacion() {
        this.checkOperation('x');
    }

    operandoDivision() {
        this.checkOperation('/');
    }

    checkOperation(operation: any) {

    }

}