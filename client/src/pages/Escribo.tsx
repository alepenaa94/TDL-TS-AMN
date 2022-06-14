import IGame from "../components/IGame.tsx";

class Escribo extends IGame {

    constructor(props:any){
        super(props);
    }
    
    defaultRender(): ReactNode {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <section id="escribo" className='amn-page text-center'> ESTE ES EL JUEGO DEL ESCRIBO. </section>
                </div>
            </div>  
        )   
    }
}

export default Escribo; 