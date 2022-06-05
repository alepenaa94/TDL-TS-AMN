export default function About() {
    return (
        <section className="page-section" id="contact">
            <div className="container">

                <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Contacto</h2>

                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7">

                        <form id="contactForm" data-sb-form-api-token="API_TOKEN">

                            <div className="form-floating mb-3">
                                <input className="form-control" id="name" type="text" placeholder="Ingrese su nombre..." data-sb-validations="required" />
                                <label htmlFor="name">Nombre completo</label>
                                <div className="invalid-feedback" data-sb-feedback="name:required">Debe ingresar un nombre.</div>
                            </div>

                            <div className="form-floating mb-3">
                                <input className="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                <label htmlFor="email">Dirección de e-mail</label>
                                <div className="invalid-feedback" data-sb-feedback="email:required">Debe ingresar un e-mail.</div>
                                <div className="invalid-feedback" data-sb-feedback="email:email">El e-mail ingresado no es válido.</div>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control" id="message" placeholder="Enter your message here..." data-sb-validations="required"></textarea>
                                <label htmlFor="message">Mensaje</label>
                                <div className="invalid-feedback" data-sb-feedback="message:required">Debe ingresar un mensaje.</div>
                            </div>
                            <div className="d-none" id="submitSuccessMessage">
                                <div className="text-center mb-3">
                                    <div className="fw-bolder">Su mail se ha enviado correctamente! Pronto nos pondremos en contacto.</div>
                                </div>
                            </div>

                            <div className="d-none" id="submitErrorMessage">
                                <div className="text-center text-danger mb-3">Error al enviar el mensaje! Intente nuevamente, o pongase en contacto con el webmaster.</div>
                            </div>

                            <button className="btn btn-primary btn-xl disabled" id="submitButton" type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}