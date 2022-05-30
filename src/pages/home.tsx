import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import GameContainer from "../components/GameContainer";

const HomePage: React.FunctionComponent<IPage> = props => {
    return (
        <div>
            <h1>Bienvenidos a Juega tu juego</h1>
            <GameContainer/>
        </div>
    );
}

export default HomePage;