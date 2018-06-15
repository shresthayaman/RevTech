import React, { Component } from "react";
import affiliates from "./images/affiliates.jpg";
import company from "./images/company.jpg";
import "./Landing.css";
import background from "./images/background.jpg"; 
import downArrow from "./images/downArrow.png";
import Identity from "./Identity";


export default class Landing extends Component {
  
    render() {
    return (
      <div className="App">
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
                src={downArrow}>
                {/* onClick = "slideDown()"> */}
            </img>
      </div>

      <div className="affiliatesLogin">
          <Identity 
            style={{position: "absolute"}}
            className="affiliatesSignUpBox"/>
            <p className='affiliatesLoginText'>Interns, alumni, and admins, log in here: </p>
                <img
                  src={affiliates}
                  className="image"
                  style={{width: "100%", height: "auto", position: "relative", opacity: .8, backfacevisibility: "hidden"

                }}></img>
      </div>

      <div className="downArrow">
            <img
                src={downArrow}
                onClick = "slideDown()"></img>
      </div>

      <div className='companyLogin'>
              <img
                src={company}
                className="image"
                style ={{maxWidth: "100%", height: "auto", opacity: 1}}></img>
      </div>
          
      <div> 
              <br/>
              <br/>
              <p className="missionStatement">- About Us -  </p>
              <br/> 
              <p className="missionStatement">Our goal is to foster an elite team of software developers.</p>
      </div>  


    </div>

    );
    }
  }
