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

type OperandoCheck = {
    vidas_restantes: any;
}

export default class Mates extends IGame {

    /* Esta informacion se utiliza solo para mostrarla, no se almacenan "realmente" las vidas o resultados reales. */
    private operando: any = null;
    private operando1: any = null;
    private operando2: any = null;
    private resultado: any = null;
    private vidas_restantes: any = null;

    constructor(props: any) {
        super(props);
        this.operandoSuma = this.operandoSuma.bind(this);
        this.operandoResta = this.operandoResta.bind(this);
        this.operandoMultiplicacion = this.operandoMultiplicacion.bind(this);
        this.operandoDivision = this.operandoDivision.bind(this);
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
                            <div className="col col-lg-3 col-md-3 col-sm-6 col-xs-12 operando-box text-center"><Button variant="primary operando" id="operando-suma" onClick={this.operandoSuma}>+</Button></div>
                            <div className="col col-lg-3 col-md-3 col-sm-6 col-xs-12 operando-box text-center"><Button variant="primary operando" id="operando-resta" onClick={this.operandoResta}>—</Button></div>
                            <div className="col col-lg-3 col-md-3 col-sm-6 col-xs-12 operando-box text-center"><Button variant="primary operando" id="operando-multiplicacion" onClick={this.operandoMultiplicacion}>x</Button></div>
                            <div className="col col-lg-3 col-md-3 col-sm-6 col-xs-12 operando-box text-center"><Button variant="primary operando" id="operando-division" onClick={this.operandoDivision}>/</Button></div>
                        </div>

                    </div>
                </section>
            </div>
        );
    }

    newGame() {
        request<Operando>("http://localhost:9000/v0/math/"+this.props.jugador_id).then(m => {

            let mates = m.data;
            this.operando1 = document.getElementById('operando-numero-1') as HTMLInputElement | null;
            this.operando2 = document.getElementById('operando-numero-2') as HTMLInputElement | null;
            this.resultado = document.getElementById('operando-resultado') as HTMLInputElement | null;
            this.vidas_restantes = document.getElementById('vidas-restantes') as HTMLInputElement | null;

            if (this.operando1 != null) {
                this.operando1.innerHTML = mates['operando1'];
            }

            if (this.operando2 != null) {
                this.operando2.innerHTML = mates['operando2'];
            }

            if (this.resultado != null) {
                this.resultado.innerHTML = mates['resultado'];
            }

            if (this.vidas_restantes != null) {
                this.vidas_restantes.innerHTML = mates['available_life'];
            }

        })
    }

    operandoSuma(e) {
        e.preventDefault()
        this.checkOperator('+');
    }

    operandoResta(e) {
        e.preventDefault()
        this.checkOperator('-');
    }

    operandoMultiplicacion(e) {
        e.preventDefault()
        this.checkOperator('*');
    }

    operandoDivision(e) {
        e.preventDefault()
        this.checkOperator('/');
    }

    answerIsCorrect(vidas_disponibles: any) {
        return this.vidas_restantes == vidas_disponibles; 
    }

    gameLost(vidas_disponibles) {
        return vidas_disponibles == 0;
    }

    checkOperator(operator: any) {
        
        request<OperandoCheck>("http://localhost:9000/v0/math/"+this.props.jugador_id+"?operator="+operator).then(oc => {
            
            console.log(oc.success);
            let operator_check = oc.data;

            if (oc.success) {
            
                alert("Correcto! Has ganado! Se iniciará una nueva partida.");
                this.newGame();
            
            } else {
            
                alert("Incorrecto!");
                this.vidas_restantes.innerHTML = operator_check["available_life"];

                if (this.gameLost(operator_check["available_life"])) {
                    alert("Has perdido!");
                    this.newGame();
                }

            }
        });
    }

}