import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import fire from "./fire";

const CLOUDINARY_UPLOAD_PRESET = "RevTech";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/revt/image/upload";

class Profile_pic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ""
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
          uploadedFile: true
        });
      }
      console.log(response.body.secure_url);
      fire
        .database()
        .ref(`/Users/${this.props.user.id}`)
        .update(
          {
            pictureURL: response.body.secure_url,
            pictureUploaded: true
          },
          function(error) {
            if (error) {
              // The write failed...
            } else {
              // Data saved successfully!
            }
          }
        );
    });
  }

  render() {
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*"
          >
            <div>Drop an Image or Click Here to Insert One</div>
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === "" ? null : (
            <div>
              <p>{this.state.uploadedFile.name}</p>
              {/* <img src={this.state.uploadedFileCloudinaryUrl} /> */}
            </div>
          )}
        </div>
      </form>
    );
  }
}

export default Profile_pic;
