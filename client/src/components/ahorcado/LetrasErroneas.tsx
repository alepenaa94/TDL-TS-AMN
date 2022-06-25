
import React from 'react'
import Gen_prop from '../types/gen_prop';

interface LetrasErr_state {
  _array:Array<string>
}

class LetrasErroneas extends React.Component<{},LetrasErr_state>{

    
    constructor(props: {}) {
        super(props);
        this.state = {
            _array : []
        };
    }

    addLetraErr(letra:string) {
        console.log(letra);
        console.log(this.state._array);
        let _arr = this.state._array;
        _arr.push(letra);
        this.setState({_array:_arr});
    }

    checkLetraErr(letra:string):boolean {
        return this.state._array.includes(letra);
    }

    render(): React.ReactNode {
        return (
            <div className="wrong-letters-container">
                {this.state._array.length > 0 ? <p>Wrong</p> : null}
                
                {this.state._array.map((letra)=>{
                    return (<span className='letter'>{letra}</span>)
                })}

            </div>
          )   
    }
}

export default LetrasErroneas;

