import React from 'react'
import Gen_prop from '../types/gen_prop';
import IGame_state from '../types/igame_state';

interface PalOfs_state {
    word_len:Number
  }

class PalabraOfuscada extends React.Component<Gen_prop,PalOfs_state> {
    private word_left:number=0;
    constructor(props:Gen_prop){
        super(props);
        this.state = {
            word_len: 0
        };
    }

    public setLetter(letter:string , idx:number ):void {        
        let letter_span = document.getElementById('letter_'+idx);
        if (letter_span) {
            letter_span.innerHTML = letter;
            this.word_left = this.word_left- 1;
            console.log(this.word_left);
        } else {
            console.log("algo paso y no existe le elmeento a setear!");
        }
    }

    public getWordLeft():number {
        return this.word_left;
    }


    componentDidMount() {
        if (this.props.jugador_id!=-1){
            fetch("http://localhost:9000/v0/hangman/"+this.props.jugador_id)
            .then(response => response.json())
            .then(data => {
                // aca deberiamos chequear que el response sea 200
                if (data.success = true){
                    this.word_left  = data.data.cantidad_letras;
                    this.setState({word_len:data.data.cantidad_letras});
                }
                else {
                    alert("error fetch palabra");
                }
                
            });
        }
        
    }  

    InitOfuscado() {
        let i:number = 0;
        let _arr:Array<any> = [];
        while (i < this.state.word_len){
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