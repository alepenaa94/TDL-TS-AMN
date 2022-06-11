import React from "react";
import { MDBInput } from "mdbreact";

class CInput extends React.Component {

    private inputValue:string =  '';
    
    changeInputValue = e => {
        this.inputValue = e.target.value;
    };

    public getValue():string {
        return this.inputValue;
    }

    render(): React.ReactNode {
        return (
            <MDBInput className='mbt-1' 
                onChange={this.changeInputValue} 
                 />
        );   
    }
}

export default CInput;