
import IGame from "../components/IGame.tsx";

class Mates extends IGame {

    constructor(props:any){
        super(props);
    }

    defaultRender(): ReactNode {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <section id="mates" className='amn-page text-center'> ESTE ES EL JUEGO DE LAS MATEMÁTICAS. </section>
                </div>
            </div>
        );
    }
    
}

export default Mates; 