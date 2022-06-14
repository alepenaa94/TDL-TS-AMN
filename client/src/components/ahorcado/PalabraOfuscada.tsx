import React from 'react'


class PalabraOfuscada extends React.Component {

    constructor(props:any){
        super(props);
        this.state = {
            word_len: 0
        };
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
        if (this.props.jugador_id!=-1){
            fetch("http://localhost:9000/v0/hangman/"+this.props.jugador_id)
            .then(response => response.json())
            .then(data => {
                // aca deberiamos chequear que el response sea 200
                if (data.success = true){
                    this.setState({word_len:data.data.cantidad_letras
                    });
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