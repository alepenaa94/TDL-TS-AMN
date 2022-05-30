
import React from "react";

class GameContainer extends React.Component  {

    constructor(props:any ,private lista_juegos:Array<any>){
        super(props);
        lista_juegos = [];
    }


    componentDidMount() {
        // fetch("https://gorest.co.in/public/v2/posts/")
        // .then(response => response.json())
        // .then(data => {
        //     this.lista_juegos = data;
        // });
        this.lista_juegos = ["hola","como","va"];

    }  

    render(): React.ReactNode {
        return (
            <div>
                <h1>
                Game Container !!
                </h1>
                
               
            </div>

            
        );
    }
}

export default GameContainer;
