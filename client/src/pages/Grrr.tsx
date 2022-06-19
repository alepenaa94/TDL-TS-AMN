import IGame from "../components/IGame.tsx";
import Button from 'react-bootstrap/Button';
import {Howl, Howler} from 'howler';
import VacaSound from "../sounds/animals/vaca.wav";
import CaballoSound from "../sounds/animals/caballo.wav";
import PerroSound from "../sounds/animals/perro.wav";
import GatoSound from "../sounds/animals/gato.wav";

class Grrr extends IGame {

    private sound: any = null;
    private animalVaca: any = null;
    private animalPerro: any = null;
    private animalGato: any = null;
    private animalCaballo: any = null;

    constructor(props:any){
        super(props);
        this.answer = this.answer.bind(this);
        this.newGame();
    }

    SoundPlay() {
        this.sound.play();
    }

    SoundStop() {
        this.sound.stop();
    }

    newGame() {

        //por ahora es constante
        let srcSound = VacaSound;

        this.sound = new Howl({
            src: [srcSound],
            volume: 1,
        })
    }

    answer = (e: any, animal: string) => {
        e.preventDefault();
        alert(animal);
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
            </div>
        );
    }
}

export default Grrr; 
