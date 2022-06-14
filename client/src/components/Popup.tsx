import React from "react";

class PopupLogin extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            show_p: false,
            id_player: -1,
            callbackend: ()=>{}
        }

        this.sendName = this.sendName.bind(this);
    }

    sendName() {
        console.log(this.state.id_player);
        fetch("http://localhost:9000/v0/players/addNameToPlayer", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id_player,
                name: "prueba locaa2"
            })
        })
        .then((response) => {
            if(!response.ok) throw new Error(response.status);
            else return response.json();
            })
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            alert(error);
            alert('Error grave: no se pudo setear el jugador y juego');
        });
          
        this.setState({show_p:false});
        // vamos a finalizar lo que pidieron
        console.log(this.state.callbackend);
        //this.state.callbackend();
        console.log(this.props);
        
    }

    public showPopUp(id_player,_callbackend) {
        this.setState({id_player:id_player, show_p:true,callbackend:_callbackend});
    }


    render(): React.ReactNode {
        return (
            <div className="popup-container" style={this.state.show_p == true ? {display:'flex'} : {}}>
                <div className="popup">
                    <h2>{this.props.mensaje}</h2>
                    <input className="form-control" type="text" placeholder="Default input"></input>
                    <button onClick={this.sendName}>Enter</button>
                </div>
            </div>
        )    
    }
}

export default PopupLogin;