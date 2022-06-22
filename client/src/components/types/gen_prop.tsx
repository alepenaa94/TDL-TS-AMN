import App from "../../App"

//type Gen_prop<T extends {}> = T & { 
interface Gen_prop { 
    jugador_id: number,
    id_game:number
    app:App
  }


export default Gen_prop;
  