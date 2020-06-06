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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import Axios from 'axios';
import * as constant from '../../constants/config';
const jwtDecode = require('jwt-decode');

class Profile extends React.Component {

  constructor(props) {
    super(props);
    const { history } = this.props;
    const user = localStorage.getItem('user');
    if (user === null) {
      history.push('/auth/login');
    }
    this.state = {
      isLogout: false,
      user: JSON.parse(user),
    }
  }

  getFollower = id => {
    Axios.get(constant.serverdomain + "users/befollowed/" + id).then(res => {
      this.setState({
        followers: res.data,
      });
    });
  }

  getFollowing = id => {
    Axios.get(constant.serverdomain + "users/followed/" + id).then(res => {
      this.setState({
        followings: res.data,
      });
    });
  }

  handleChangeInfomation = e => {
    e.preventDefault();
    let entity = {};
    const { user } = this.state;

    let hasChange = false;
    if (user.phone !== e.target['input-phone'].value) {
      entity.phone = e.target['input-phone'].value;
      hasChange = true;
    } else {
      entity.phone = user.phone;
    }

    if (user.full_name !== e.target['input-fullname'].value) {
      hasChange = true;
      entity.full_name = e.target['input-fullname'].value;
    }

    if (user.address !== e.target['input-address'].value) {
      hasChange = true;
      entity.address = e.target['input-address'].value;
    }

    if (e.target['input-newpass'].value !== "") {
      if (e.target['input-newpass'].value !== e.target['input-retypepass'].value) {
        console.log("new pass != retypepass");
        return;
      }
      hasChange = true;
    }
    if (hasChange) {
      if (e.target['input-newpass'].value === "") {
        Axios.post(constant.serverdomain + "users/changeinfo", entity, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        }).then(res => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("user", JSON.stringify(jwtDecode(res.data.token)));
          console.log(res.data);
        }).catch(err => {
          console.log(err);
        })
      } else {
        var changePass = {
          oldpassword: e.target['input-oldpass'].value,
          newpassword: e.target['input-newpass'].value,
        }
        console.log(changePass);
        Axios.post(constant.serverdomain + "users/changeinfo", changePass, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        }).then(res => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("user", JSON.stringify(jwtDecode(res.data.token)));
          console.log(res.data);
        }).catch(err => {
          console.log(err);
        })
      }
    } else {
      console.log("No change");
    }
  }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-1">
                        <div className="text-center">
                          <h3>
                            {this.state.user.full_name}
                            <span className="font-weight-light"> {/* Tuổi */}</span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Row>

                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={e => this.handleChangeInfomation(e)}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-phone"
                            >
                              Phone/Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.state.user.phone}
                              id="input-phone"
                              placeholder="Phone"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-fullname"
                            >
                              Full name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.state.user.full_name}
                              id="input-fullname"
                              placeholder="Fullname"
                              type="text"
                            />
                          </FormGroup>
                        </Col>

                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.state.user.address}
                              id="input-address"
                              placeholder="Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-role"
                            >
                              Role
                            </label>
                            <Input
                              disabled
                              className="form-control-alternative"
                              id="input-role"
                              defaultValue={this.state.user.role === 1 ? "Customer" : this.state.user.role === 2 ? "Seller" : "Admin"}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Security
                    </h6>
                    <div className="pl-lg-4">
                      <Row >
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-oldpass"
                            >
                              Old Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-oldpass"
                              placeholder="Old Password"
                              type="password"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-newpass"
                            >
                              New Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue=""
                              id="input-newpass"
                              placeholder="New Password"
                              type="password"
                            />
                          </FormGroup>
                        </Col>

                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-retypepass"
                            >
                              Retype New Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue=""
                              id="input-retypepass"
                              placeholder="Retype New Password"
                              type="password"
                            />
                          </FormGroup>
                        </Col>

                      </Row>
                    </div>
                    <hr className="my-4" />
                    <div className="pl-lg-4">
                      <Row className="align-items-center">
                        <Col xs="8">
                        </Col>
                        <Col className="text-right" xs="4">
                          <Button
                            type="submit"
                            color="primary"
                            size="sm"
                          >
                            Submit
                      </Button>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
