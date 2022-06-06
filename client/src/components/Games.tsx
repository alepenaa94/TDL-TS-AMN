import {Link} from 'react-router-dom'

export default function Games() {
    return (

        <section className="page-section games" id="games">
            <div className="container">

                <div className="row justify-content-center">

                    <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Juegos disponibles</h2>

                    <div className="col-md-12 col-lg-4 mb-12">
                        <div className="games-item mx-auto" data-bs-toggle="modal" data-bs-target="#gamesModal1">
                            <div className="games-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <Link className="text-center text-white games-item-text-hidden" to="/ahorcado">Ahorcado</Link>
                            </div>
                            <img className="img-fluid" src="img/games/cake.png" alt="..." />
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4 mb-12">
                        <div className="games-item mx-auto" data-bs-toggle="modal" data-bs-target="#gamesModal2">
                            <div className="games-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <Link className="text-center text-white games-item-text-hidden" to="/grrr">Grrr</Link>
                            </div>
                            <img className="img-fluid" src="img/games/game.png" alt="..." />
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4 mb-12">
                        <div className="games-item mx-auto" data-bs-toggle="modal" data-bs-target="#gamesModal3">
                            <div className="games-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <Link className="text-center text-white games-item-text-hidden" to="/mates">¿Qué tal las matemáticas?</Link>
                            </div>                           
                            <img className="img-fluid" src="img/games/submarine.png" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}