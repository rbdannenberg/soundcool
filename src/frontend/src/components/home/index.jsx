import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        modalState: true
    };

    this.handleShow = this.handleShow.bind(this);
  }

  handleShow() {
    this.setState({ modalState: !this.state.modalState });
  }

  render() {
    return (
      <div>
        <div>
          <div className={"modal fade" + (this.state.modalState ?
                                          " show d-block" :
                                          " d-none")}
               tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Privacy Policy</h5>
                </div>
                <div className="modal-body"><p>This pop-up is used to inform
                  visitors regarding our policies on the collection, use,
                  and disclosure of information. If you choose to use our
                  service, then you agree to the collection and use of
                  information related to this policy. This service is provided
                  by the PerformingARTech research group of the Universitat
                  Politècnica de València, free of charge, and is designed to
                  be used as is. This privacy policy establishes the terms in
                  which Soundcool Web Version uses and protects the information
                  that is provided by its users. This company is committed to
                  the safety of its users’ data.</p>
                  <p>DATA PROTECTION POLICY</p>
                  <p>a) Responsible:<br />
                  POLYTECHNIC UNIVERSITY OF VALENCIA<br />
                  CIF Q4618002B<br />
                  Camí de Vera, s/n.<br />
                  46022-Valencia.</p>
                  <p>b) Contact details of the data protection delegate:<br />
                  You can contact the data protection officer by email sent to
                  the account dpd@upv.es or by writing to the General
                  Secretariat of the UPV.</p>
                  <p>c) Purposes and legal basis of the treatment:<br />
                  The holder requests the following personal data: email
                  address and password so that users can test the web version
                  of the demo in Soundcool tests.</p>
                  <p>d) Recipients:<br />
                  The information obtained in the forms of this website will
                  not be transferred to third parties, beyond the assignments
                  provided for in the law.</p>
                  <p>e) International data transfers are not foreseen.</p>
                  <p>f) Conservation criteria:<br />
                  The personal data will be kept for as long as they are
                  necessary, and once cease to be necessary for the
                  conservation time provided for in the legislation
                  applicable.</p>
                  <p>g) Exercise of rights:<br />
                  Interested persons have the right to exercise the rights of
                  access, rectification, deletion, portability, limitation, or
                  opposition to the treatment by providing a copy of an
                  official document that identifies them (NIF-NIE, Passport),
                  and if it were necessary, supporting documentation of your
                  request before:</p>
                  <p>POLYTECHNIC UNIVERSITY OF VALENCIA<br />
                  UPV Data Protection Delegate.<br />
                  General Secretary.<br />
                  Camí de Vera, s/n.<br />
                  46022-Valencia.</p>
                  <p>h) Data Protection Authority<br />
                  Interested persons have the right to file claims with the
                  Agency Spanish Data Protection.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary"
                          onClick={this.handleShow}>Accept</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block background-black banner home">
          <div className="container">
            <div className="row">
              <h1 className="col-12 text-center color-white">
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>
                    Discover Soundcool Online
                  </font>
                </font>
              </h1>
              <h2 className="col offset-md-3 col-md-6 text-center">
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>
                    System for collaborative musical, sound and audiovisual
                    creation
                  </font>
                </font>
              </h2>
            </div>

            <div className="row">
              <br />
              <br />
              <br />
              <div className="col-12 offset-md-3 col-md-6 text-center">
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>
                    {" "}
                    Collaborative creation by connecting through
                  </font>
                </font>
              </div>

              <div className="col-12 text-center">
                <div className="row iconos">
                  <div className="col-sm-3 col-md col-12">
                    <img
                      alt="icon-tablet"
                      src="/assets/images/soundcool-icono-tablet.png"
                    />
                    <p>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        <font
                          style={{
                            verticalAlign: "inherit"
                          }}
                        >
                          Tablets
                        </font>
                      </font>
                    </p>
                    <p>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        <font
                          style={{
                            verticalAlign: "inherit"
                          }}
                        >
                          Android and iOS
                        </font>
                      </font>
                    </p>
                  </div>

                  <div className="col-sm-3 col-md col-12">
                    <img
                      alt="icon-mobile"
                      src="/assets/images/soundcool-icono-movil.png"
                    />
                    <p>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        <font
                          style={{
                            verticalAlign: "inherit"
                          }}
                        >
                          Mobiles
                        </font>
                      </font>
                    </p>
                    <p>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        <font
                          style={{
                            verticalAlign: "inherit"
                          }}
                        >
                          Android and iOS
                        </font>
                      </font>
                    </p>
                  </div>

                  <div className="col-12 col-md">
                    <img
                      alt="icon-ordenador"
                      src="/assets/images/soundcool-icono-ordenador.png"
                    />
                    <p>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        <font
                          style={{
                            verticalAlign: "inherit"
                          }}
                        >
                          Computers
                        </font>
                      </font>
                    </p>
                    <p>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        <font
                          style={{
                            verticalAlign: "inherit"
                          }}
                        >
                          Mac and Windows 64
                        </font>
                      </font>
                    </p>
                  </div>

                  <div className="col-sm-3 col-md col-12">
                    <img
                      alt="icon-vr"
                      src="/assets/images/vr_icon.png"
                    />
                    <p>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        <font
                          style={{
                            verticalAlign: "inherit"
                          }}
                        >
                          Hololens
                        </font>
                      </font>
                    </p>
                    <p>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        <font
                          style={{
                            verticalAlign: "inherit"
                          }}
                        >
                          Augmented Reality Research
                        </font>
                      </font>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Need new demo video, current one is not availble anymore */}
          {/* <div className="banner-photo">
            <video width="100%" height="auto" autoPlay muted loop>
              <source
                src="http://soundcool.org/wp-content/uploads/teasersoundcool.mp4"
                type="video/mp4"
              />
            </video>
          </div> */}

          <div className="banner-photo-efect"></div>
        </div>
        <div className="block">
          <div className="container">
            <div className="row">
              <h2 className="title col text-center">
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>
                    Who is it for?
                  </font>
                </font>
              </h2>
            </div>
            <div className="row">
              <div className="subtitle col offset-md-3 col-md-6 text-center">
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>
                    Musicians and audiovisual creators, education at all levels,
                    inclusive education
                  </font>
                </font>
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-sm-3">
                <img
                  alt="Audiovisual creators"
                  width="100%"
                  height="200px"
                  src="/assets/images/4.jpeg"
                />
                <div className="text">
                  <h3>
                    <font style={{ verticalAlign: "inherit" }}>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        Audiovisual creators
                      </font>
                    </font>
                  </h3>
                  <p>
                    <font style={{ verticalAlign: "inherit" }}>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        Make audiovisuals creatively by mixing videos, images
                        or video loops, controlling everything live via
                        mobile / tablet.
                      </font>
                    </font>
                  </p>
                </div>
              </div>
              <div className="col-sm-3">
                <img
                  alt="Health Applications"
                  src="https://soundcool.org/wp-content/uploads/2021/12/Grupo-5437-2.png"
                  height="200px"
                />
                <div className="text">
                  <h3>
                    <font style={{ verticalAlign: "inherit" }}>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        Health Applications
                      </font>
                    </font>
                  </h3>
                  <p>
                    <font style={{ verticalAlign: "inherit" }}>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        We apply our technology in the development of therapies
                        for the rehabilitation of patients with
                        neurodegenerative diseases.  If you want to be part of
                        this new project contact us on&nbsp;
                        <a href="https://soundcool.org/contacto/">
                        https://soundcool.org/contacto/</a>.
                      </font>
                    </font>
                  </p>
                </div>
              </div>
              <div className="col-sm-3">
                <img
                  alt="Education"
                  width="100%"
                  height="200px"
                  src="/assets/images/5-e1552466526596.jpeg"
                />
                <div className="text">
                  <h3>
                    <font style={{ verticalAlign: "inherit" }}>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        Education
                      </font>
                    </font>
                  </h3>
                  <p>
                    <font style={{ verticalAlign: "inherit" }}>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        Increase the motivation of your students using Soundcool
                        and mobile / tablets for the collaborative creation of
                        music, audiovisuals, live soundtracks for silent movies,
                        theater or LOVA operas, etc.{" "}
                      </font>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        Support classes of music, art, language, theater, dance,
                        etc., at all levels: primary, secondary, music schools,
                        conservatories or university.
                      </font>
                    </font>
                  </p>
                </div>
              </div>
              <div className="col-sm-3">
                <img
                  alt="Inclusive education"
                  width="100%"
                  height="200px"
                  src="/assets/images/6.jpeg"
                />
                <div className="text">
                  <h3>
                    <font style={{ verticalAlign: "inherit" }}>
                      <font
                        style={{
                          verticalAlign: "inherit"
                        }}
                      >
                        Inclusive education
                      </font>
                    </font>
                  </h3>
                  <p>
                    <font style={{ verticalAlign: "inherit" }}>
                      <font
                        style={{
                          verticalAlign: "center"
                        }}
                      >
                        Inclusive pedagogies with Soundcool have demonstrated
                        their suitability to instruction for students with
                        autism, Down syndrome, partial or total blindness, etc.
                      </font>
                    </font>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
