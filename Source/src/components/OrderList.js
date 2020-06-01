/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Order Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Row,
} from "reactstrap";
// core components
import Axios from "axios";
import * as constant from '../constants/config';
import Pagi from "./Pagi";

class OrderList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Orders: [],
      FullOrders: [],
    }

    if (props.user_id === 0) {
      this.getListOrder();
    } else {
      this.getListOrderByUser(props.user_id);
    }
  }

  getListOrder = () => {
    Axios.get(constant.serverdomain + "order/all").then(res => {
      this.setState({
        FullOrders: res.data,
        Orders: res.data.slice(0,5)
      });
    }).catch(err => {
      console.log(err);
    });
  }

  getListOrderByUser = (user_id) => {
    Axios.get(constant.serverdomain + "order/customers/" + user_id).then(res => {
      this.setState({
        FullOrders: res.data.orders,
        Orders: res.data.orders.slice(0,5),
      });
    }).catch(err => {
      console.log(err);
    });
  }

  getProComponent = (arr) => {
    let Component = [];
    arr.forEach(elements => {
      Component.push(
        <tr onClick={e => {e.preventDefault(); this.viewOrderDetail(elements.id)}}>
          <td>
            <Media className="align-items-center">
              <span className="mb-0 text-sm">
                {elements.id}
              </span>
            </Media>
          </td>

          <td>
            <Media className="align-items-center">
              <span className="mb-0 text-sm">
                {elements.user_id}
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

          <td>{constant.toThousandString(elements.totalamount)}</td>
          <td>{elements.shippingaddress}</td>
          <td>{new Date(elements.date).toString().substr(0, 10)}</td>

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
                  onClick={e => e.preventDefault()}
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

  viewOrderDetail = order_id => {
    const {history} = this.props.props;
    console.log(this.props)

    history.push('/admin/orderdetail/'+order_id);
  }

  changePage = page => {
    this.setState({
      Orders: constant.changePage(this.state.FullOrders, page)
    })
  }

  render() {
    return (
      <>
        {/* Page content */}
        {/* <Container className="mt--7" fluid>
          {/* Table Orders*/}
        <Row style={{ marginBottom: '20px' }}>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Orders</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">TotalAmount</th>
                    <th scope="col">Address</th>
                    <th scope="col">Date</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {this.getProComponent(this.state.Orders)}
                </tbody>
              </Table>
              <Pagi data={this.state.FullOrders} changePageFunc={this.changePage}/>
            </Card>
          </div>
        </Row>
      </>
    );
  }
}

export default OrderList;
