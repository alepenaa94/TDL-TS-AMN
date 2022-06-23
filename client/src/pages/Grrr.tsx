import IGame from "../components/IGame.tsx";
import { ReactNode } from "react";
import Button from 'react-bootstrap/Button';
import request from '../functions/request.tsx';
import Rankings from "../components/Rankings.tsx";
import {Howl} from 'howler';
import Sound1 from "../sounds/animals/1.wav";
import Sound2 from "../sounds/animals/2.wav";
import Sound3 from "../sounds/animals/3.wav";
import Sound4 from "../sounds/animals/4.wav";

type AnimalSound = {   
    audio_id: string;
    available_lifes: number;
}

export default class Grrr extends IGame {

    private sound: Howl;
    private sound_map: {[key: string]: number};

    constructor(props:any){
        super(props);
        this.answer = this.answer.bind(this);
        this.loadSoundMap();
        this.newGame();
    }

    SoundPlay() {
        this.sound.play();
    }

    SoundStop() {
        this.sound.stop();
    }

    loadSoundMap() {
        
        this.sound_map = {
            '1': Sound1,
            '2': Sound2,
            '3': Sound3,
            '4': Sound4,
        };

    }

    newGame() {

        request<AnimalSound>("http://localhost:9000/v0/audio/"+this.props.jugador_id).then(a => {

            let animal = a.data;
            let vidas_restantes = document.getElementById('vidas-restantes') as HTMLInputElement | null;

            if (vidas_restantes != null) {
                vidas_restantes.innerHTML = animal['available_life'];
            }

            this.sound = new Howl({
                src: [this.sound_map[animal['audio_id']]],
                volume: 1,
            })

        })
    }

    seAcabaronLasVidas(vidas: number) {
        return vidas == 0;
    }

    answer = (e: any, animal: string) => {

        e.preventDefault();
        this.SoundStop();

        request<AnimalSound>("http://localhost:9000/v0/audio/"+this.props.jugador_id+'/'+animal).then(a => {

            let animal_answer = a.data;
            let vidas_restantes = document.getElementById('vidas-restantes') as HTMLInputElement | null;

            if ((this.seAcabaronLasVidas(animal_answer['available_life'])) && (vidas_restantes != null)){
                vidas_restantes.innerHTML = '0';
                super.setState({end_game:true});
            } else {
                super.setState({win_game:true});
            }

        })

    }

    defaultRender(): ReactNode {

        return (
            <div className="container">
                <section className="page-section mb-0" id="grrr-container">
                    <div className="container xl">

                        <h2 className="page-section-heading text-center text-uppercase mb-0 operando-header">¿Qué animal es?</h2>

                        <div className="row justify-content-md-center">
                            <div className="col col-xl-12 text-center">
                                <img className="animal-img" src="img/grrr/sound.jpg" />
                            </div>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center animales-box">
                            <div className="p-2 animal-box"><Button variant="secondary" id="animal-play" onClick={() => this.SoundPlay()}>Play</Button></div>
                            <div className="p-2 animal-box"><Button variant="secondary" id="animal-stop" onClick={() => this.SoundStop()}>Stop</Button></div>
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <div className="p-2 vidas-restantes-box vidas-restantes-box-number" id="vidas-restantes">?</div>
                            <div className="p-2 vidas-restantes-box">Vidas restantes: </div>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center animales-box">
                            <div className="p-2 animal-box"><Button variant="primary" className="animal" id="animal-gato" onClick={e => this.answer(e, 'gato')}>Gato</Button></div>
                            <div className="p-2 animal-box"><Button variant="primary" className="animal" id="animal-perro" onClick={e => this.answer(e, 'perro')}>Perro</Button></div>
                            <div className="p-2 animal-box"><Button variant="primary" className="animal" id="animal-vaca" onClick={e => this.answer(e, 'vaca')}>Vaca</Button></div>
                            <div className="p-2 animal-box"><Button variant="primary" className="animal" id="animal-caballo" onClick={e => this.answer(e, 'caballo')}>Caballo</Button></div>
                        </div>

                    </div>
                </section>
                <Rankings />
            </div>
        );
    }
}