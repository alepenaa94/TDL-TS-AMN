import IGame from "../components/IGame.tsx";
import Rankings from "../components/Rankings.tsx";
import { ReactNode } from "react";

export default class Escribo extends IGame {

    constructor(props:any){
        super(props);
    }
    
    defaultRender(): ReactNode {
        const rankings = new Rankings();
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <section id="escribo" className='amn-page text-center'> ESTE ES EL JUEGO DEL ESCRIBO. </section>
                    <Rankings />
                </div>
            </div>  
        )   
    }
}