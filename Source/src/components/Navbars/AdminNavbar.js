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
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
  Modal, ModalHeader, ModalBody, Button,
  Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input
} from "reactstrap";
import Axios from "axios";
import swal from 'sweetalert';
import * as constant from "../../constants/config";

class AdminNavbar extends React.Component {

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
      modal: false,
      newAdmin: {}
    }
    this.toggle = this.toggle.bind(this);
  }

  handleLogout = e => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChangePhone = e => {
    this.setState({
      newAdmin: {
        ...this.state.newAdmin,
        phone: e.target.value,
      }
    })
  }

  handleChangePassword = e => {
    this.setState({
      newAdmin: {
        ...this.state.newAdmin,
        password: e.target.value,
      }
    })
  }

  addNewAdmin = () => {
    var data = this.state.newAdmin;
    Axios.post(constant.serverdomain + "users/add/admin", data, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then(res => {
      if (res.data.code === 1) {
        swal("Good job!", "Create new admin success", "success");
      } else {
        swal({
          title: "Error!",
          text: res.data.message,
          icon: "error",
          buttons: true,
        }).finally(() => {
          this.toggle()
        })
      }
    }).catch(err => {
      swal({
        title: "Error!",
        text: err.stack,
        icon: "error",
        buttons: true,
      }).finally(()=>{
        this.toggle()
      })
    })
  }

  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>

            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={this.state.user.image.toString()}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {this.state.user.full_name}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/myprofile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  {JSON.parse(localStorage.getItem("user")).role === 4 ? <DropdownItem to="/admin/user-profile" onClick={this.toggle}>{this.props.buttonLabel}
                    <i className="ni ni-settings-gear-65" />
                    <span>Add admin</span>
                  </DropdownItem> : ''}

                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem to="/auth/login" tag={Link} onClick={this.handleLogout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>

        {this.state.user.role === 4 ? <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create New Admin</ModalHeader>
          <ModalBody>

            {/* /////////////////////////////// */}
            <Form role="form" onSubmit={e => this.handleSubmit(e)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input onChange={this.handleChangePhone} placeholder="Phone or username" type="text" autoComplete="new-email" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input onChange={this.handleChangePassword} placeholder="Password" type="password" autoComplete="new-password" />
                </InputGroup>
              </FormGroup>
              <FormGroup className="text-right">
                <Button color='primary' onClick={e => { e.preventDefault(); this.addNewAdmin(); this.toggle(e) }}>Submit</Button>{' '}
                <Button color='secondary' onClick={this.toggle}>Cancel</Button>
              </FormGroup>
            </Form>
            {/* /////////////////////////////// */}
          </ModalBody>
        </Modal> : ''}
      </>
    );
  }
}

export default AdminNavbar;
