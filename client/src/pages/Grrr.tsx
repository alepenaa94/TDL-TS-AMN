import IGame from "../components/IGame.tsx";
import Button from 'react-bootstrap/Button';

class Grrr extends IGame {

    constructor(props:any){
        super(props);
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
                            <div className="p-2 animal-box"><Button variant="secondary" id="animal-play" onClick={this.play}>Play</Button></div>
                            <div className="p-2 animal-box"><Button variant="secondary" id="animal-stop" onClick={this.stop}>Stop</Button></div>
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <div className="p-2 vidas-restantes-box vidas-restantes-box-number" id="vidas-restantes">?</div>
                            <div className="p-2 vidas-restantes-box">Vidas restantes: </div>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center animales-box">
                            <div className="p-2 animal-box"><Button variant="primary" className="animal" id="animal-gato" onClick={this.gato}>Gato</Button></div>
                            <div className="p-2 animal-box"><Button variant="primary" className="animal" id="animal-perro" onClick={this.perro}>Perro</Button></div>
                            <div className="p-2 animal-box"><Button variant="primary" className="animal" id="animal-vaca" onClick={this.vaca}>Vaca</Button></div>
                            <div className="p-2 animal-box"><Button variant="primary" className="animal" id="animal-caballo" onClick={this.caballo}>Caballo</Button></div>
                        </div>

                    </div>
                </section>
            </div>
        );
    }
}

export default Grrr; 
