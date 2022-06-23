import React from "react";
import { Navigate } from "react-router-dom";

class Popup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show_p: false,
            redirect: false
        }
        this.redirect = this.redirect.bind(this);
        this.showPopUp = this.showPopUp.bind(this);
    }

    redirect(){
        this.setState({redirect:true,show_p:false});
    }

    public showPopUp() {
        console.log(this.props.wait);
        setTimeout(() => {
            this.setState({show_p: true});
        }, this.props.wait);
    }

   


    render(): React.ReactNode {
        if (this.state.redirect) {
            return <Navigate to={this.props.path_r} replace={true}  />
        }
        return (
            <div className="popup-container" style={this.state.show_p == true ? {display:'flex'} : {}}>
                <div className="popup">
                    <h2>{this.props.mensaje}</h2>
                    <button onClick={this.redirect}>Ok</button>
                </div>
            </div>
        )    
    }
}

export default Popup;