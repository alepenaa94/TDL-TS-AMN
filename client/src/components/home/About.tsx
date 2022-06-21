import '@fortawesome/react-fontawesome';

export default function About() {
    return (
        <section className="page-section text-white mb-0" id="contact">
            <div className="container">

                <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Acerca de </h2>

                <div className="row">
                    <div className="col-lg-4 ms-auto"><p className="lead">Somos el grupo <strong>AMN</strong> de la materia Teoría del Lenguaje de Programación de la FIUBA. Los integrantes son: <strong>Nerea Piccone, Alejandro Peña, Matías Iñaki Otegui.</strong></p></div>
                    <div className="col-lg-4 me-auto"><p className="lead">Esta web fue hecha con <strong>React</strong>, <strong>Typescript</strong> y <strong>Bootstrap</strong> con el objetivo de diseñar una página para juegos de niños.</p></div>
                </div>

            </div>
        </section>
    )
}