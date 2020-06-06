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
  Table,
  Media
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import Axios from "axios";
import * as constant from "../../constants/config";
import OrderList from "components/OrderList";

class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      followers: [],
      followings: []
    }

    const { user_id } = props.match.params;
    this.getData(user_id);
  }

  getData = (user_id) => {
    this.getUserProfile(user_id);
    this.getFollower(user_id);
    this.getFollowing(user_id);
  }

  getUserProfile = id => {
    Axios.get(constant.serverdomain + "users/userinfo/" + id).then(res => {
      this.setState({
        user: res.data,
      });
    });
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

  viewUserProfile = user_id => {
    this.getData(user_id);
  }

  getUserComponent = elements => {
    let Components = [];

    elements.forEach(element => {
      Components.push(
        <tr onClick={e => { e.preventDefault(); this.viewUserProfile(element.id); }}>
          <td>
            <Media className="align-items-center">
              <span className="mb-0 text-sm">
                {element.id}
              </span>
            </Media>
          </td>

          <th>
            <Media className="align-items-center">
              <a
                className="avatar rounded-circle mr-3"
                href="/"
                onClick={e => e.preventDefault()}
              >
                <img
                  alt="..."
                  src={element.image}
                />
              </a>
              <Media>
                <span className="mb-0 text-sm">
                  {element.full_name}
                </span>
              </Media>
            </Media>
          </th>

          <td>{element.phone}</td>
        </tr>

      )
    });

    return Components;
  }

  render() {

    if (this.state.user === null) {
      return (
        <></>
      )
    }

    console.log(this.state.user);

    return (
      <>
        <UserHeader type="user" user={this.state.user} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row style={{ 'marginBottom': '15px' }}>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={this.state.user.image}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    {this.state.user.state === 1 ? <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Inactive
                    </Button> : <Button
                        className="mr-4"
                        color="info"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Active
                    </Button>}
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
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center" style={{ marginTop: '-14px' }}>
                        <div>
                          <span className="heading">{this.state.user.follower}</span>
                          <span className="description">Follower</span>
                        </div>
                        <div>
                          <span className="heading">{this.state.user.following}</span>
                          <span className="description">Following</span>
                        </div>
                        <div>
                          <span className="heading">{this.state.user.orders}</span>
                          <span className="description">Orders</span>
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
                      <h3 className="mb-0">Account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Full name
                            </label>
                            <Input
                              className="form-control-alternative"
                              disabled
                              defaultValue={this.state.user.full_name}
                              id="input-username"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-phone"
                            >
                              Phone
                            </label>
                            <Input
                              disabled
                              className="form-control-alternative"
                              defaultValue={this.state.user.phone}
                              id="input-phone"
                              placeholder="Phone"
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
                              htmlFor="input-first-name"
                            >
                              Adress
                            </label>
                            <Input
                              disabled
                              className="form-control-alternative"
                              defaultValue={this.state.user.address}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Role
                            </label>
                            <Input
                            disabled
                              className="form-control-alternative"
                              id="input-email"
                              defaultValue={this.state.user.role === 1 ? "Customer" : this.state.user.role === 2 ? "Seller" : "Admin"}
                              placeholder="jesse@example.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <OrderList user_id={46} />

          <Row style={{ 'marginBottom': '15px' }}>
            <Col className="order-xl-1 mb-5 mb-xl-0" xl="6">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Following</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">User ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.getUserComponent(this.state.followings)}
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="6">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Follower</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">User ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.getUserComponent(this.state.followers)}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>

        </Container>
      </>
    );
  }
}

export default UserProfile;
