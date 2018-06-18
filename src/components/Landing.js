import React, { Component } from "react";
import affiliates from "./images/affiliates1.jpg";
import company from "./images/company1.jpg";
import community from "./images/community.jpg";
import background from "./images/background.jpg"; 
import downArrow from "./images/downArrow.png";
import tools from "./images/tools.png";
import computer from "./images/computer.png";
import "./Landing.css";
import Identity from "./Identity";
import Contract from "./ContractInputDetails";


function slideDown() {
  ('html, body').animate({scrollTop:650}, 'slow');
}

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
            <img
                src={downArrow}
                className="downArrow"
                onClick = "slideDown()" ></img>

      <div className="affiliatesLogin">
          <Identity 
            style={{position: "absolute"}}/>
            <img
              src={affiliates}
              className="image"
              style={{width: "100%", height: "auto", position: "relative", opacity: .8, backfacevisibility: "hidden"}}></img>
      </div>

    {/*   <div className="downArrow">
        <img
            src={downArrow}
            onClick = "slideDown()"></img>
      </div> */}

      <div className='companyLogin'>
        <Contract 
          style={{position: "absolute"}}
          className="contractForm"/>
        <img
          src={company}
          className="image"
          style={{width: "100%", height: "auto", position: "relative", opacity: .8, backfacevisibility: "hidden"}}></img>

      </div>
          
      <div> 
        <br/>
        <br/>
        <p className="missionStatement">- About Us -  </p>
        <br/> 
        <p className="missionStatement">Our goal is to foster an elite team of software developers and to build a community between interns and alumni.</p>
      </div>  

      <div>
      <img
          src={community}
          className="pics"/>
      <img
          src={computer}
          className="pics"/>
      <img
          src={tools}
          className="pics"/>
      <br />
      <br />
      <br />
      </div>

    </div>

    );
    }
  }
