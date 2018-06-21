import React, { Component } from "react";
import affiliates from "./images/affiliates1.jpg";
import company from "./images/company1.jpg";
import community from "./images/community.jpg";
import background from "./images/background.jpg";
import downArrow from "./images/downArrow.png";
import RevTechLogo from "./images/RevTechLogo.png";
import tools from "./images/tools.png";
import computer from "./images/computer.png";
import "./Landing.css";
import Identity from "./Identity";
import Contract from "./ContractInputDetails";
import videoRev from "./images/RevTechVid.mp4";

export default class Landing extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <img src={RevTechLogo} className="RevTechLogo" />

          <video
            autoPlay
            id="background-video"
            style={{ width: "100%", height: "auto" }}
          >
            <source src={videoRev} type="video/mp4" />
          </video>
          <img src={downArrow} className="downArrow" onClick="slideDown()" />

          {/* <img
        src={background}
        style={{ maxWidth: "100%", height: "auto", opacity: .8,  maxheight: 50,
        overflow: "hidden"}} /> */}
        </div>

        <div className="affiliatesLogin">
          <Identity style={{ position: "absolute" }} />
          <img
            src={affiliates}
            className="image"
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              opacity: 0.8,
              backfacevisibility: "hidden"
            }}
          />
        </div>

        {/*   <div className="downArrow">
        <img
            src={downArrow}
            onClick = "slideDown()"></img>
      </div> */}

        <div className="companyLogin">
          <Contract style={{ position: "absolute" }} className="contractForm" />
          <img
            src={company}
            className="image"
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              opacity: 0.8,
              backfacevisibility: "hidden"
            }}
          />
        </div>

        <div>
          <br />

          <p className="missionStatement">
            "To foster an elite team of software developers and to build a
            community between interns and alumni.""
          </p>
        </div>

        <div>
          <img src={community} className="pics" />
          <img src={computer} className="pics" />
          <img src={tools} className="pics1" />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
