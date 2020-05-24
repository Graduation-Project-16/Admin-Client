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
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Axios from "axios";
import * as constant from '../constants/config';

class OrderList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Orders: [],
    }

      if (props.user_id === 0) {
        this.getListOrder();
      } else {
        this.getListOrderByUser(props.user_id);
      }
  }

  getListOrder = () => {
    Axios.get(constant.serverdomain + "order/all").then(res => {
      this.setState(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  getListOrderByUser = (user_id) => {
    Axios.get(constant.serverdomain + "order/customers/" + user_id).then(res => {
      console.log(res.data.orders);
      this.setState({
        Orders: res.data.orders
      });
    }).catch(err => {
      console.log(err);
    });
  }

  getProComponent = (arr) => {
    let Component = [];
    arr.forEach(elements => {
      Component.push(
        <tr>
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

          <td>{elements.totalamount}</td>
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
            {/* <a href="" onClick={e => {e.preventDefault();}} style={{width: '20px', height: '20px'}}>
              {elements.isDelete === 0 ? 
              <i className="ni ni-fat-remove text-red"></i>:
              <i className="ni ni-fat-add text-green"></i>}
            </a> */}
            
          </td> 
        </tr>
      );
    }
    )
    return Component;
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
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
      </>
    );
  }
}

export default OrderList;
