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
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Axios from "axios";
import * as constant from '../../constants/config'
import Pagi from "components/Pagi"
class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Customers: [],
      Sellers: [],
      Admins: [],
      FullCustomers: [],
      FullSellers: [],
      FullAdmins: [],
    }

    this.getListUser();
  }

  getListUser = () => {
    Axios.get(constant.serverdomain + "users/all").then(res => {
      this.setState({
        FullCustomers: res.data.Customers,
        FullSellers: res.data.Sellers,
        FullAdmins: res.data.Admins,
        Admins: res.data.Admins.slice(0,5),
        Sellers: res.data.Sellers.slice(0,5),
        Customers: res.data.Customers.slice(0,5),
      });
    }).catch(err => {
      console.log(err);
    });
  }

  activeUser = (element) => {
    let entity = {
      id: element.id,
      state: element.state === 1 ? 0 : 1,
    };
    Axios.post(constant.serverdomain + "admin/updateuser", entity).then(() => {
      this.getListUser();
    })
  }

  ViewUserDetail = id => {
    const {history} = this.props;
    console.log(this.props)
    history.push('/admin/userprofile/'+id);
  }

  getPagination = (arr, f) => {
    return (
      <Pagi data={arr} changePageFunc={f}></Pagi>
    )
  }

  getComponent = (arr) => {
    let Component = [];
    arr.forEach(elements => {
      Component.push(
        <tr >
          <td>
            <Media className="align-items-center">
              <span className="mb-0 text-sm">
                {elements.id}
              </span>
            </Media>
          </td>

          <th>
            <Media className="align-items-center">
              <a
                className="avatar rounded-circle mr-3"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <img
                  alt="..."
                  src={elements.image}
                />
              </a>
              <Media>
                <span className="mb-0 text-sm">
                  {elements.full_name}
                </span>
              </Media>
            </Media>
          </th>

          <td>{elements.phone}</td>
          <td>
            {elements.date > Date.now() / 1000 ? <Badge color="" className="badge-dot mr-4">
              <i className="bg-success" />
              {elements.smsotp}
            </Badge> : <Badge color="" className="badge-dot mr-4">
                <i className="bg-danger" />
                {elements.smsotp}
              </Badge>}
          </td>
          <td>
            {elements.date.substring(0,10).toString('')}
          </td>
          <td>
            {elements.state === 1 ? <Badge color="" className="badge-dot mr-4">
              <i className="bg-success" />
              Active
            </Badge> : <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
              Inactive
            </Badge>}

          </td>
          <td className="text-right">
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                href="#pablo"
                role="button"
                size="sm"
                color=""
                onClick={e => e.preventDefault()}
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                  href=""
                  onClick={e => this.activeUser(elements)}
                >
                  {elements.state === 1 ? 'Inactive' : 'Active'}
                </DropdownItem>
                <DropdownItem
                  href="#pablo"
                  onClick={e => {e.preventDefault(); this.ViewUserDetail(elements.id)}} 
                >
                  Details
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
      );
    }
    )
    return Component;
  }

  customerChangePage = (page) => {
    this.setState({
      Customers: constant.changePage(this.state.FullCustomers, page)
    })
  }

  sellerChangePage = (page) => {
    this.setState({
      Sellers: constant.changePage(this.state.FullSellers, page)
    })
  }

  adminChangePage = (page) => {
    console.log(page);
    this.setState({
      Admins: constant.changePage(this.state.FullAdmins, page)
    })
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table Customers*/}
          <Row style={{marginBottom: '20px'}}>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Customers</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Fullname</th>
                      <th scope="col">Phone</th>
                      <th scope="col">OTP</th>
                      <th scope="col">Regist Date</th>
                      <th scope="col">Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.getComponent(this.state.Customers)}
                  </tbody>
                </Table>
                {this.getPagination(this.state.FullCustomers, this.customerChangePage)}
                </Card>
            </div>
          </Row>

          {/* Table Sellers*/}
          <Row style={{marginBottom: '20px'}}>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Sellers</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Fullname</th>
                      <th scope="col">Phone</th>
                      <th scope="col">OTP</th>
                      <th scope="col">Regist Date</th>
                      <th scope="col">Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.getComponent(this.state.Sellers)}
                  </tbody>
                </Table>
                {this.getPagination(this.state.FullSellers, this.sellerChangePage)}
              </Card>
            </div>
          </Row>

          {/* Table Admins*/}
          <Row style={{marginBottom: '20px'}}>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Admins</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Fullname</th>
                      <th scope="col">Username</th>
                      <th scope="col">OTP</th>
                      <th scope="col">Regist Date</th>
                      <th scope="col">Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.getComponent(this.state.Admins)}
                  </tbody>
                </Table>
                {this.getPagination(this.state.FullAdmins, this.adminChangePage)}
              </Card>
            </div>
          </Row>

        </Container>
      </>
    );
  }
}

export default Users;
