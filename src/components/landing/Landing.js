import React, { Component } from 'react';
import './css/style.css'
import './css/materialize.css'
import './css/materialize.min.css'
// import './js/materialize.js'
import landingimage from './landing-image.png'
import persona from './persona-photo-1.png'
import climbing1 from './climbing-1.png'
import climbing2 from './climbing-2.png'
import climbing3 from './climbing-3.png'

export class Landing extends Component {
    render() {
        return (
            <div>
{/*   
    <div className="headerContainer">
      <div className="section no-pad-bot">
        <div className="container"> */}
        <div className="headerContainer container">
          <br></br> 
          
          <div className="header-CTA">
          <h1 className="teal-text text-lighten-2" id="delphe-header">Delphe</h1>
          <h2 className='landing-content-title'>Your home for advice</h2>
          <h3 className="landing-content-body">Find answers to your most pressing questions by connecting with a community of experts.</h3>
          
          <div className="row center">
                <a href="/authorization" id="" className="center btn-large waves-effect waves-light teal lighten-1">Get Started</a>
            </div>
        </div>
      </div> 
       
  
    <div className="section-background row center">
      <div className="row">
        {/* <!--   Icon Section   --> */}
        <div className="featureContainer">
          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center brown-text"><img className="climbing-1" src={climbing1} alt="climber feature pic"/></h2>
              <h5 className="center">Help for any topic</h5>
              <p className="light">History, physics, mathematics and so much more - answers to questions like what’s the square root of pi are only a connection away.</p>
            </div>
          </div>
  
      
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><img className="climbing-2" src={climbing2} alt="climber feature pic"/></h2>
                <h5 className="center">Connect with experts</h5>
                <p className="light">Learn and gain insight via 1-on-1 chats with experts.</p>
              </div>
            </div>

          <div className="col s12 m4 ">
            <div className="icon-block">
              <h2 className="center brown-text"><img className="climbing-3" src={climbing3} alt="climber feature pic"/></h2>
              <h5 className="center">Improve your skillset</h5>
              <p className="light">Gain new knowledge - browse a feed of questions and answers for a variety of topics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  
  {/* /* <!-- USER EXPERIENCE TESTIMONIAL --> */ }
    <div className="col s12 m4">
        <div className="section-background-person">
            <p className="center persona-text">“ The expert I spoke with changed the trajectory of my career. “ </p>
  
      <div className="center"><img className="advisor-photo" src={persona} alt="person"/>
          <p className="center persona-text-name">Charlotte Walters</p>
      <p className="center persona-text">Global Project Consultant</p>        
          </div>
        </div>
      </div>
  
    <footer className="page-footer teal">
      <div className="container center">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Create an account today</h5>          
            
            <div className="row center">
                <a href="/authorization" id="footerButton" className="btn-large waves-effect waves-light teal lighten-1">Get Started</a>
            </div>
  
            <div className="" id="delpheFooter">Delphe</div>
          </div>
        </div>
      </div>
    </footer>
    </div>
    
      )
    }
  }

export default Landing;
