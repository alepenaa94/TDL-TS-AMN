import React from 'react'

class Figura extends React.Component{

    private partes:number = 6;
    private contador:number = 0;

    public show_more():boolean {
        if (this.contador<6) {
            let parte = document.getElementById('figure-part-'+this.contador);
            if (parte) {
                parte.style.display = 'block';
            } else {
                console.log("error parte no encontrada!");
            }
            this.contador++;
            return true;
        }
        return false;
    }

    render(): React.ReactNode {
        return (
            <div className='ahorcado-body'>
                <svg height="250" width="200" className="figure-container">
                    {/*-- Horca --*/}
                    <line x1="60" y1="20" x2="140" y2="20" />
                    <line x1="140" y1="20" x2="140" y2="50" />
                    <line x1="60" y1="20" x2="60" y2="230" />
                    <line x1="20" y1="230" x2="100" y2="230" />
        
                    {/*-- Cabeza --*/}
                    <circle cx="140" cy="70" r="20" id="figure-part-0" className="figure-part" />
                    {/*-- Cuerpo --*/}
                    <line x1="140" y1="90" x2="140" y2="150" id="figure-part-1" className="figure-part" />
                    {/*-- Brazos --*/}
                    <line x1="140" y1="120" x2="120" y2="100" id="figure-part-2" className="figure-part" />
                    <line x1="140" y1="120" x2="160" y2="100" id="figure-part-3" className="figure-part" />
                    {/*-- Piernas --*/}
                    <line x1="140" y1="150" x2="120" y2="180" id="figure-part-4" className="figure-part" />
                    <line x1="140" y1="150" x2="160" y2="180" id="figure-part-5" className="figure-part" />
                </svg>
            </div>
          )   
    }
}

export default Figura;