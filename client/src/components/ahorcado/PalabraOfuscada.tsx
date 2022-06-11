import React from 'react'


class PalabraOfuscada extends React.Component {
    private word_len: number = 0;

    constructor(props:any){
        super(props);
    }

    public setLetter(letter:string , idx:number ):void {        
        let letter_span = document.getElementById('letter_'+idx);
        if (letter_span) {
            letter_span.innerHTML = letter;
        } else {
            console.log("algo paso y no existe le elmeento a setear!");
        }
    }

    componentDidMount() {
        //Ejemplo base del fetch
        // fetch("https://gorest.co.in/public/v2/posts/")
        // .then(response => response.json())
        // .then(data => {
        //     this.lista_juegos = data;
        // });
        
        // deberiamos ir al backend con un fetch para obtener la palabra ..
        this.word_len = 5;
        // actualizamos lo que se tiene que mostrar para la palabra..
        this.forceUpdate();
    }  

    InitOfuscado() {
        let i:number = 0;
        let _arr:Array<any> = [];
        while (i < this.word_len){
            _arr.push(<span id={'letter_' + i} className='letter'></span>);
            i++;
        }
        return _arr;
    }

    render(): React.ReactNode {
        return (
            <div className="word" id="word">
                {this.InitOfuscado()}
            </div>
        );
    }
}

export default PalabraOfuscada; 