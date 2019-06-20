import React, { Component } from 'react';
import './css/style.css'
import './css/materialize.css'
import './css/materialize.min.css'
// import './js/materialize.js'
import landingimage from './landing-image.png'
import persona from './persona-photo-1.png'
import bikes from './section-image-1.png'
import connect from './section-image-2.png'
import improve from './section-image-3.png'

export class Landing extends Component {
    render() {
        return (
            <div>
<nav className="white" role="navigation">
      <div className="nav-wrapper container">
        <a id="logo-container" href="#" className="brand-logo">Logo</a>
        <ul className="right hide-on-med-and-down">
          <li><a href="#">Navbar Link</a></li>
        </ul>
  
        <ul id="nav-mobile" className="sidenav">
          <li><a href="#">Navbar Link</a></li>
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      </div>
    </nav>
  
    <div id="index-banner" className="parallax-container">
      <div className="section no-pad-bot">
        <div className="container">
          <br></br>
          <h1 className="row center teal-text text-lighten-2" id="delphe-header">Delphe</h1>
          <h2 className='center landing-content-title'>Your home for advice</h2>
          <h3 className="landing-content-body header center">Some CTA header text.</h3>
          
          <button className="get-started rectangle">Get Started</button>
        
      
      <div className="parallax"><img src={landingimage} alt="Unsplashed background img 1"/>
    </div>
    </div>
    </div>
    </div>
    
  
  
    <div className="section-background container">
      <div className="section">
        {/* <!--   Icon Section   --> */}
        <div className="row">
          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center brown-text"><i className="material-icons">group</i></h2>
              <h5 className="center">Connect with experts</h5>
              <p className="light">Leverage agile frameworks to provide a robust synopsis for high level overviews.</p>
            </div>
          </div>
  
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
                <h5 className="center">Help for any topic</h5>
                <p className="light">Leverage agile frameworks to provide a robust synopsis for high level overviews.</p>
              </div>
            </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
              <h5 className="center">Improve your skillset</h5>
              <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  
  {/* /* <!-- USER EXPERIENCE TESTIMONIAL --> */ }
    <div className="col s12 m4">
        <div className="section-background-person">
            <p className="center persona-text">“ The expert I spoke with changed the trajectory of my career. “ </p>
  
      <div className="center"><img src={persona} alt="person"/>
          <p className="center persona-text-name">Charlotte Walters</p>
      <p className="center persona-text">Global Project Consultant</p>        
          </div>
        </div>
      </div>
  
  
    {/* <!-- HELP FOR ANY TOPIC --> */}
    <div className="col s12 m4">
    <div className="container section-background-2">
        {/* <!-- got rid of class"section-1-body --> */}
        <div className="">
          <div className="section-1-title">Help for any topic</div>
        <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. 
        Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.
        </p>
        </div>
        {/* /* <-- got rid of class"section-1-body --> */}
        <div className=""><img src={bikes} alt="bikes"/></div>
      </div>
      </div>
  
  
      {/* <!-- CONNECT WITH EXPERTS --> */ }
      <div className="col s12 m4">
      <div className="container section-background-3">
          {/* <!-- got rid of class"section-1-body --> */}
          <div className="">
            <div className="section-1-title">Connect with experts</div>
          <p>Leverage agile frameworks to provide a robust synopsis for high level overviews.</p>
          </div>
          {/* <!-- got rid of class"section-1-body --> */}
          <div className=""><img src={connect} alt="connect"/></div>
        </div>
        </div>
        
          {/*<!-- IMPROVE YOUR SKILLSET --> */}
    <div className="col s12 m4">
        <div className="container section-background-2">
            {/* <!-- got rid of class"section-1-body --> */}
            <div className="">
              <div className="section-1-title">Improve your skillset</div>
            <p>Your guests will come to know you by  your incredible smile, strong work ethic, and identifying tagline.</p>
            </div>
             {/* <!-- got rid of class"section-1-body --> */}
            <div className=""><img src={improve} alt="improve"/></div>
      </div>
      </div>
          
  
   {/* <!-- <div className="parallax-container valign-wrapper">
      <div className="section no-pad-bot">
        <div className="container">
          <div className="row center">
            <h5 className="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
          </div>
        </div>
      </div>
      <div className="parallax"><img src="background3.jpg" alt="Unsplashed background img 3"></div>
    </div> --> */}
  
    <footer className="page-footer teal">
      <div className="container center">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Create an account today</h5>          
            
            <div className="row center">
                <a href="" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">Get Started</a>
            </div>
  
            <div className="row center" id="delphe">Delphe</div>
          </div>
        </div>
      </div>
    </footer>
    </div>
          
      )
    }
  }

export default Landing;
