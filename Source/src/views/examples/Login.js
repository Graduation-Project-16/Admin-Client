/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner
} from "reactstrap";
import * as constant from '../../constants/config'

const localStorage = require('localStorage');
const jwtDecode = require('jwt-decode');

class Login extends React.Component {

  constructor(props) {
    super(props);

    //test////////////////////////////
    // localStorage.removeItem('user');//
    //////////////////////////////////

    const { history } = this.props;
    const user = localStorage.getItem('user');
    if (user !== null) {
      history.push('/admin/index');
    }
    this.state = {
      phone: "admin",
      password: "admin",
      pending: false,
      success: null,
    };

  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      pending: true,
    })
    axios.post(constant.serverdomain + "users/login", this.state).then(res => {
      const user = jwtDecode(res.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      this.setState({
        success: true
      });
    }).catch(err => {
      this.setState({
        success: false
      });
    }).finally(() => {
      this.setState({
        pending: false,
      });
    })
  }

  handleChangePhone = e => {
    this.setState({
      phone: e.target.value
    });
  }

  handleChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  }

  render() {

    if (this.state.success) {
      return (
        <Redirect to="/admin/" />
      )
    }

    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">

            <CardBody className="px-lg-5 py-lg-5">

              <div className="text-center text-muted mb-4">
                <big>Log in
                </big>
              </div>
              <Form role="form" onSubmit={this.handleSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={this.state.phone} onChange={this.handleChangePhone} placeholder="Phone or username" type="text" autoComplete="new-email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" type="password" autoComplete="new-password" />
                  </InputGroup>
                  {this.state.success === false ? <small className="text-center text-danger" style={{ 'fontStyle': 'italic' }}>Phone or password was wrong</small> : ''}
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  {this.state.pending ? <Spinner style={{ 'padding-right': '5px' }} className="text-left" size="sm" color="primary" /> : ''}
                  <Button className="my-4" color="primary" type="submit">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6" />
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot your password?</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
