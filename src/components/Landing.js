import React, { Component } from "react";
import affiliates from "./images/affiliates.jpg";
import company from "./images/company.jpg";
import "./Landing.css";
import background from "./images/background.jpg"; 
import downArrow from "./images/downArrow.png";
import Identity from './Identity';


export default class Landing extends Component {
  
    render() {
    return <div className="App">
       <div className='header'>
              <img
              src={background}
              className='background'
              style={{ maxWidth: "100%", height: "auto", opacity: .8,  maxheight: 50,
              overflow: "hidden"}} />
              <h1 className="title">RevTech</h1>
            </div>
            <div className="downArrow">
            <img
                src={downArrow}
                onClick = "slideDown()"/></div>

           <div className="signUpAffiliatesBox">
              <div className="signUpAffiliates">
                  <Identity/></div>
              
              <div className="affiliatesLogin">
                <img
                  src={affiliates}
                  className="affiliates"
                  style={{width: "100%", height: "auto"}}/>
              </div>
            </div>

          <div className="downArrow">
            <img
                src={downArrow}
                onClick = "slideDown()"/></div>

          <div className='companyLogin'>
              <img
                src={company}
                className="company"
                style ={{maxWidth: "100%", height: "auto", opacity: .8}}/>
            </div>
  
          
          <div>
              <br/>
              <br/>
              <p className="missionStatement">- About Us -</p>
              <p className="missionStatement">Our goal is to foster an elite team of software developers and to remove barriers between interns, alumni, and companies.</p>
              <br/>
              <br/>
          </div>  
    </div>
  }
}
