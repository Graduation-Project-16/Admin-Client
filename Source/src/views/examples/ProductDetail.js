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
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
import Axios from 'axios';
import * as constant from '../../constants/config'
import Header from "components/Headers/Header.js";

class ProductDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getListLivestream = () => {
    Axios.get(constant.serverdomain + "live/all").then(res => {
      this.setState({
      });
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  getComponent = (arr) => {
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
              <Media>
                <span className="mb-0 text-sm">
                  {elements.full_name}
                </span>
              </Media>
            </Media>
          </th>

          <td>{elements.title}</td>
          <td>{elements.total_view}</td>
          <td>{elements.total_like}</td>
          <td>{elements.start_time}</td>
          <td>
            {elements.end_time === null ? <Badge color="" className="badge-dot mr-4">
              <i className="bg-success" />
              Living
            </Badge> : <Badge color="" className="badge-dot mr-4">
                <i className="bg-danger" />
                {elements.end_time}
              </Badge>}
          </td>
          
          {/* <td className="text-right">
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
          </td> */}
        </tr>
      );
    }
    )
    return Component;
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table Livestreams*/}
          <Row style={{marginBottom: '20px'}}>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">All living stream</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">User ID</th>
                      <th scope="col">Full name</th>
                      <th scope="col">Title</th>
                      <th scope="col">Views</th>
                      <th scope="col">Likes</th>
                      <th scope="col">Start</th>
                      <th scope="col">End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.getComponent(this.state.Livestreams)}
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

        </Container>
      </>
    );
  }
}

export default ProductDetail;
