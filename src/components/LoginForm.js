import React, { Component } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';

class LoginForm extends Component {
    render() {
        return (
            <div>
                <div>
                    email:
                    <Input />
                </div>
                <div>
                    password:
                    <Input />
                </div>
                <div>
                    <Button> login </Button>
                </div>
            </div>
        );
    }
}

export default LoginForm;