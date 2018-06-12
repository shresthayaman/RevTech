import React, { Component } from 'react';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    Name
                </div>
                <div>
                    Email
                </div>
                <div>
                    Status
                </div>
                <div>
                    Grad Year
                </div>
            </div>
        );
    }
}

export default SignUpForm;