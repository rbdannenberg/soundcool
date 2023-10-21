import React, { Component } from "react";
import "./home.css";
import tablet from "../../assets/images/ipad.png"; 
import phone from "../../assets/images/iphone.png";
import computer from "../../assets/images/computer.png";
import hololens from "../../assets/images/vr-glasses.png";
import audiovisual from "../../assets/images/video-marketing.png";
import health from "../../assets/images/magnifying-glass.png";
import education from "../../assets/images/video.png";
import inclusion from "../../assets/images/unity.png";
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

  scroll() {
    const section = document.querySelector( '#section2' );
    if (section != null) {
      section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
    }
  };

  render() {
    return (
      <div id="home_container">
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
        <div id="section1">
          <div className="section1-container">
            <div className="row">
              <h1 className="col-12 text-center">
                <font style={{ verticalAlign: "inherit" }}>
                  <font class="text" id="header" style={{ verticalAlign: "inherit" }}>
                    SOUNDCOOL
                  </font>
                </font>
              </h1>
              <p className="col text-center" id="home-subheader-container">
                <font class="text" style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }} id="sub-header">
                    {/* Collaborative sound and audiovisual creation through */}
                    Sound, Musical, and Audiovisual Collaboration Via
                    <br></br>
                    <br></br>
                  </font>
                </font>
              </p>
            </div>

            <div className="row">
              {/* <br />
              <br />
              <br />
              <div id="subtext" className="col-12 offset-md-3 col-md-6 text-center text">
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>
        
                    Collaborative creation by connecting through
                  </font>
                </font>
              </div> */}

              <div className="col-12 text-center">
                <div className="row icons">
                  <div class="card" style={{width: 15 + "vw"}}>
                    <img class="card-img-top" src={tablet} alt="tablet-image"/>
                    <div class="card-body">
                      <h5 class="card-title card-text">Tablets</h5>
                      <p class="card-text card-subheader">Android and iOS</p>
                    </div>
                  </div>

                  <div class="card" style={{width: 15 + "vw"}}>
                    <img class="card-img-top" src={phone} alt="mobiles-image"/>
                    <div class="card-body">
                      <h5 class="card-title card-text">Mobiles</h5>
                      <p class="card-text card-subheader">Android and iOS</p>
                    </div>
                  </div>
                  
                  <div class="card" style={{width: 15 + "vw"}}>
                    <img class="card-img-top" src={computer} alt="computer-image"/>
                    <div class="card-body">
                      <h5 class="card-title card-text">Computers</h5>
                      <p class="card-text card-subheader">Mac & Windows 64</p>
                    </div>
                  </div>

                  <div class="card" style={{width: 15 + "vw"}}>
                    <img class="card-img-top" src={hololens} alt="hololens-image"/>
                    <div class="card-body">
                      <h5 class="card-title card-text">Hololens</h5>
                      <p class="card-text card-subheader">Augmented Reality Research</p>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
            <div id="scroll_button_container">
              <button id="scroll_button" onClick={this.scroll}>Learn More</button>
            </div>
          </div>
          
          
        </div>
        <div id="section2">
          
          <div id="down">
        
            <div className="section2-container">
              <div className="row">
                <h2 className="title col text-center text" id="home-section2-title-container">
                  <font style={{ verticalAlign: "inherit" }}>
                    <font id="section2-title" style={{ verticalAlign: "inherit" }}>
                      WHO IS IT FOR?
                    </font>
                  </font>
                </h2>
              </div>
              <div className="row">
                <div className="subtitle col offset-md-3 col-md-6 text-center text">
                  <font style={{ verticalAlign: "inherit" }}>
                    <font style={{ verticalAlign: "inherit"}} id="home-section2-subtitle">
                      Musicians and audiovisual creators, education at all levels,
                      inclusive education
                    </font>
                  </font>
                </div>
              </div>
              <br />
              <br />
              <div className="row rows-container">
                <div class="card" style={{width: 15 + "vw"}}>
                  <img class="card-img-top" src={audiovisual} alt="audiovisual"/>
                  <div class="card-body">
                    <h5 class="card-title card-text">Audiovisual Creators</h5>
                    <p class="card-text card-subheader"><strong>Unleash your creativity:</strong><br></br>
                          Blend videos, images, and video loops live for stunning audiovisual artistry! </p>
                  </div>
                </div>

                <div class="card" style={{width: 15 + "vw"}}>
                  <img class="card-img-top" src={health} alt="computer-image"/>
                  <div class="card-body">
                    <h5 class="card-title card-text">Health Applications</h5>
                    <p class="card-text card-subheader"><strong>Join the future:<br></br></strong> Pioneering technology for neurodegenerative rehabilitation. Join us <a href="https://soundcool.org/contact/">here</a>.</p>
                  </div>
                </div>

                <div class="card" style={{width: 15 + "vw"}}>
                  <img class="card-img-top" src={education} alt="computer-image"/>
                  <div class="card-body">
                    <h5 class="card-title card-text">Education</h5>
                    <p class="card-text card-subheader"><strong>Fuel student motivation:</strong> <br></br>Collaborate on music, audiovisuals, and live soundtracks. Boosts arts, language, and more across all levels. Learn how <a href="https://soundcool.org/contact/">here</a>.</p>
                  </div>
                </div>

                <div class="card" style={{width: 15 + "vw"}}>
                  <img class="card-img-top" src={inclusion} alt="computer-image"/>
                  <div class="card-body">
                    <h5 class="card-title card-text">Inclusion</h5>
                    <p class="card-text card-subheader"><strong>Comprehensive education:</strong><br></br>Empower students with autism, Down syndrome, blindness, and more.</p>
                  </div>
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
