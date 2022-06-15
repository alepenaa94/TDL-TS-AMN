import IGame from "../components/IGame.tsx";

class Grrr extends IGame {

    constructor(props:any){
        super(props);
    }

    defaultRender(): ReactNode {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <section id="grrr" className='amn-page text-center'> ESTE ES EL JUEGO DEL GRRR. </section>
                </div>
            </div>
        )   
    }
}

export default Grrr; 
