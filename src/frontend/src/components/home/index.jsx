import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="block background-black banner home">
          <div className="container">
            <div className="row">
              <h1 className="col-12 text-center color-white">
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>
                    Discover Soundcool
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
{/*   removed an item mainly just to see if I could do it and make the change visible on our UPV server:
                  <div className="col-sm-3 col-md col-12">
                    <img
                      alt="icon-knect"
                      src="http://soundcool.org/wp-content/uploads/2019/02/kinect_icon-1.png"
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
                          Kinect
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
                          KINECT XBOX 360 UP TO MAC SIERRA AND WINDOWS 7
                        </font>
                      </font>
                    </p>
                  </div>
*/}
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
              <div className="col-sm-4">
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
              <div className="col-sm-4">
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
              <div className="col-sm-4">
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
                          verticalAlign: "inherit"
                        }}
                      >
                        Inclusive pedagogies with Soundcool have demonstrated
                        their suitability to instruction for students
                        with autism, Down syndrome, partial or total blindness,
                        etc.
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
