import React from 'react';
import PropTypes from 'prop-types';
import styles from './aboutPage.css';

const aboutPage = props => (
	<div className="block" id="section2">
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
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class aboutPage extends React.Component {
//   render() {
//     return <div>This is a component called aboutPage.</div>;
//   }
// }

const aboutPagePropTypes = {
	// always use prop types!
};

aboutPage.propTypes = aboutPagePropTypes;

export default aboutPage;
