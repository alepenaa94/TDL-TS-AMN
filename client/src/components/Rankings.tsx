import React from "react";
import request from "../functions/request";
import {ReactNode} from "react";

type RankingsData = {   
    data : {
        result: [{
            id: number,
            name: string,
            score: number,
        }]
    }
}

export default class Rankings extends React.Component {

    constructor(props: any) {
        super(props);
        this.printTopTen();
    }
 
    deservesTopTen(player: {id:number, name:string, score:number}, top_ten_players: Array<{id:number, name:string, score:number}>): boolean {

        const size_of_top_ten = top_ten_players.length

        if (size_of_top_ten < 10) return true;
        else {
            const last_player = top_ten_players[9];
            return (last_player.score <= player.score);
        }

    }   

    updateTopTen(player: {id:number, name:string, score:number}, top_ten_players: Array<{id:number, name:string, score:number}>): Array<{id:number, name:string, score:number}> {

        let new_top_ten = new Array<{id:number, name:string, score:number}>;
        let top_ten_length = top_ten_players.length;
        let added = false;

        for (let i=0; i < top_ten_length; i++) {

            if ((!added) && (top_ten_players[i].score <= player.score)) {
                new_top_ten.push(player);
                added = true;
            }

            new_top_ten.push(top_ten_players[i]);

        }

        return (new_top_ten.length > 10) ? new_top_ten.slice(0, 10) : new_top_ten;

    }

    printTopTen() {

        request<RankingsData>("http://localhost:9000/v0/players").then(ra => {

            let rankings_html = document.getElementById('rankings') as HTMLInputElement | null;
            const players: [{id:number, name:string, score:number}] = ra.data["result"];
            const players_length = players.length;
            let top_ten = new Array<{id:number, name:string, score:number}>;

            if (players_length > 0) {

                top_ten.push(players[0]);

                for (let i = 1; i < players_length; i++) {
                    
                    if (this.deservesTopTen(players[i], top_ten)) {
                        top_ten = this.updateTopTen(players[i], top_ten);
                    }

                }
            }

            let rankings_data = "<h1>Top 10: MEJORES JUGADORES</h1><section id='ranking-jugadores' class=' container ranking-jugadores'>";
            let cont = 0;
            top_ten.forEach(player => {
                cont++;
                rankings_data = rankings_data.concat("<div class='row ranking-player'><div class='col col-lg-6 col-md-6 col-sm-6 col-xs-12 player-nombre'>", cont.toString(), ". ", player.name, "</div>","<div class='col col-lg-6 col-md-6 col-sm-6 col-xs-12 player-puntaje'>", player.score.toString(),"</div></div>");
            });

            rankings_data = rankings_data.concat("</section>");

            if (rankings_html != null) {
                rankings_html.innerHTML = rankings_data;
            }

        });

    }

    render(): ReactNode {
        return (
            <div id="rankings" className="rankings"></div>
        )
    }
}