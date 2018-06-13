import React, { Component } from "react";
import affiliates from "./images/affiliates.jpg";
import company from "./images/company.jpg";
import "./Landing.css";
import background from "./images/background.jpg"; 
import downArrow from "./images/downArrow.png";

export default class Landing extends Component {
  
    render() {
    return <div className="App">
            <div className='header'>
              <img
              src={background}
              className='background'
              style={{ maxWidth: "100%", height: "auto", opacity: .6,  maxheight: 50,
              overflow: "hidden"}} />
              <h1 
              className="title"
              style= {{position: "absolute", 
              top: "10%", 
              left: "30%"}}> RevTech</h1></div>

            <div className="AboutUs">
              <p className="missionStatement">RevTech is a contracting firm dedicated to bringing the most talented software developers into the market and building a community in which interns and alumni can interact.</p>
              {/* <img
                src={downArrow}
                style={{     
                  position: "absolute",
                  width: 50, 
                  height: "auto", 
                  marginleft: "50%", 
                  marginright: "auto", 
                  textalign: "center", 
           }}
                onClick = "slideDown()"/>*/}
                </div>
              <img
                src={affiliates}
                className="affiliates"
                style={{maxWidth: "100%", height: "auto"}}/>
              <img
                src={company}
                className="company"
                style ={{maxWidth: "100%", height: "auto", opacity: .8}}/>
        </div>
  }
}

