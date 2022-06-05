import '@fortawesome/react-fontawesome';

export default function About() {
    return (
        <section className="page-section bg-primary text-white mb-0" id="about">
            <div className="container">

                <h2 className="page-section-heading text-center text-uppercase text-white">Acerca de</h2>

                <div className="row">
                    <div className="col-lg-4 ms-auto"><p className="lead">Somos un grupo de Teoría del Lenguaje de Programación.</p></div>
                    <div className="col-lg-4 me-auto"><p className="lead">Esta web fue hecha con React, Typescript y Bootstrap con el objetivo de diseñar una página para juegos de niños.</p></div>
                </div>

            </div>
        </section>
    )
}