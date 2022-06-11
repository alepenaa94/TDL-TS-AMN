import React from 'react';

import Figura from '../components/ahorcado/Figura.tsx';
import PalabraOfuscada from '../components/ahorcado/PalabraOfuscada.tsx';
import CInput from '../components/Input.tsx';



class Ahorcado extends React.Component {

    private pal_ofsc:any = null;
    private input_area:any = null;
    private figura:any = null;

    private idx_temp:number = 0;

    constructor(props:any){
        super(props);
        this.pal_ofsc = React.createRef();
        this.input_area = React.createRef();
        this.figura = React.createRef();
        console.log(props);
    }


    UNSAFE_componentWillUpdate() {
        const handleKeydown = event => {
            const { key, keyCode } = event;
            if ( keyCode >= 65 && keyCode <= 90) {
              let mi_letter:string = key.toLowerCase();
              
              console.log(mi_letter);

              this.pal_ofsc.current.setLetter(mi_letter,this.idx_temp);

              if (this.idx_temp == 4){
                  this.idx_temp = 0;
  
                  this.funcion_error();
  
              } else {
                  this.idx_temp++;
              }

            }
        }
        window.addEventListener('keydown', handleKeydown);
    }
    



    funcion_error() {
        if (this.figura.current.show_more()==false) {
            alert("SE TERMINO EL JUEGO!");
        }
    }

    
    

    clickFn() {

        let str:string = this.input_area.current.getValue();
        //console.log(str);
        let len:number = str.length;
        if (len==0) {
            alert("ESTA VACIA inserta algo..");
        } else if (len == 1) {
            // ACA deberiamos ir al back y validar si la letra es correcta..
            // Seteamos la letra!
            this.pal_ofsc.current.setLetter(str,this.idx_temp);

            if (this.idx_temp == 4){
                this.idx_temp = 0;

                this.funcion_error();

            } else {
                this.idx_temp++;
            }
        } else {
            alert("Solamente se puede insertar un caracter..");
        }
    }


    
    render(): React.ReactNode {
        return (

            <div className="container">
                <div className="row justify-content-center">
                    <section id="ahorcado" className='amn-page text-center h1'> ESTE ES EL JUEGO DEL AHORCADO. 
                        <div className='game-container'>
                            <Figura ref={this.figura} />
                            
                            <PalabraOfuscada ref={this.pal_ofsc} />
                            
                            
                            
                        </div>
                        
    
                    </section>
                </div>
            </div>   
    
        )   
    }
}

export default Ahorcado; 