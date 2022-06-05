export default function Portfolio() {
    return (

        <section className="page-section portfolio" id="portfolio">
            <div className="container">

                <div className="row justify-content-center">

                    <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Juegos disponibles</h2>

                    <div className="col-md-12 col-lg-4 mb-12">
                        <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                            <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div className="text-center text-white portfolio-item-text-hidden">Ahorcado</div>
                            </div>
                            <img className="img-fluid" src="img/portfolio/cake.png" alt="..." />
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4 mb-12">
                        <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal2">
                            <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div className="text-center text-white portfolio-item-text-hidden">Grrrrr</div>
                            </div>
                            <img className="img-fluid" src="img/portfolio/game.png" alt="..." />
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4 mb-12">
                        <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal3">
                            <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div className="text-center text-white portfolio-item-text-hidden">¿Qué tal las matemáticas?</div>
                            </div>                           
                            <img className="img-fluid" src="img/portfolio/submarine.png" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}