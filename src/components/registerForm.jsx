import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import auth from '../services/authService';
import * as userService from '../services/userService';

class RegisterForm extends Form {
    state = {
        data:{
            username: '',
            password: '',
            name: ''
        },
        errors:{}
    };

    schema = {
        username: Joi.string().required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().alphanum().required().label('Name')
    }; 

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

    render() { 
        return (  
            <div>
            <h1>Register</h1>
            <form onSubmit = {this.handleSubmit}>
               {this.renderInput("username", "Username", "true")}
               {this.renderInput("password", "Password", "false", "password")}
               {this.renderInput("name", "Name", "false")}
               {this.renderButton('Register')}
            </form>
          
        </div>
        );
    }
}
 
export default RegisterForm;