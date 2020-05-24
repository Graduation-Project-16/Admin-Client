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
import swal from 'sweetalert';
// core components
import Header from "components/Headers/Header.js";
import Axios from "axios";
import * as constant from '../../constants/config'

class CatPro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Categories: [],
      Products: [],
    }

    this.getListProduct();
    this.getListCategory();
  }

  getListProduct = () => {
    Axios.get(constant.serverdomain + "product/all").then(res => {
      this.setState(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  getListCategory = () => {
    Axios.get(constant.serverdomain + "category/all").then(res => {
      this.setState(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  renameCategory = (elements) => {
    swal("Type new name of Category:", {
      content: "input",
    })
    .then((newName) => {
      if (newName.trim() === "") {
        swal(`Name is empty, please type valid name!`)
      } else {
        elements.name = newName;
        delete elements['pnum'];
        Axios.post(constant.serverdomain + "category/modify", elements).then(() => {
          this.getListProduct();
          swal(`Success change name to `, newName);
        }).catch(err => {
          swal(`Fail: `, err);
        })
      }
    });
  }

  deleteCategory = (elements) => {
    elements.isDelete = !elements.isDelete;
    Axios.post(constant.serverdomain + "category/modify", elements).then(res => {
      this.getListProduct();
    }).catch(err => {
      console.log(err);
    });
  }

  deleteProduct = (elements) => {
    Axios.post(constant.serverdomain + "product/del", elements).then(res => {
      this.getListProduct();
    }).catch(err => {
      console.log(err);
    });
  }

  getCatComponent = (arr) => {
    let Component = [];
    arr.forEach(elements => {
      Component.push(
        <tr 
          onClick={e => {e.preventDefault(); this.getProductByCatID(elements.id);}}>
          <td>
            <Media className="align-items-center">
              <span className="mb-0 text-sm">
                {elements.id}
              </span>
            </Media>
          </td>

          <th>
            <Media className="align-items-center">
              <Media>
                <span className="mb-0 text-sm">
                  {elements.name}
                </span>
              </Media>
            </Media>
          </th>

          <td>{elements.pnum}</td>

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
                  onClick={e => this.renameCategory(elements)}
                >
                  Rename
                </DropdownItem>
                <DropdownItem
                  href=""
                  onClick={e => e.preventDefault()}
                >
                  Delete
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
                  {elements.name}
                </span>
              </Media>
            </Media>
          </th>

          <td>{elements.category_id}</td>
          <td>{elements.price}</td>
          <td>{elements.owner_id}</td>
          <td>{elements.quantity}</td>
          <td>{elements.rate} sao</td>
          <td>{elements.sold}</td>



          <td className="text-right">
            {/* <UncontrolledDropdown>
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
            </UncontrolledDropdown>*/}
            <a href="/" onClick={e => {e.preventDefault(); this.deleteProduct(elements)}} style={{width: '20px', height: '20px'}}>
              {elements.isDelete === 0 ? 
              <i className="ni ni-fat-remove text-red"></i>:
              <i className="ni ni-fat-add text-green"></i>}
            </a>
            
          </td> 
        </tr>
      );
    }
    )
    return Component;
  }

  getProductByCatID = id => {
    if (id === 0) {
      this.getListProduct();
    } else {
      Axios.get(constant.serverdomain + "product/productbycat/" + id).then(res => {
        this.setState({
          Products: res.data.products
        });
      }).catch(err => {
        console.log(err);
      });
    }
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table Categories*/}
          <Row style={{ marginBottom: '20px' }}>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3>Categories</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Products quantity</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.getCatComponent(this.state.Categories)}
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

          {/* Table Products*/}
          <Row style={{ marginBottom: '20px' }}>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 style={{display:'inline', height:'100%'}} className="mb-0">Products</h3>
                  <button onClick={e => {e.preventDefault(); this.getProductByCatID(0);}} className="btn btn-success" style={{'float':'right'}}>All Categories</button>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Price</th>
                      <th scope="col">Owner_id</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Rate</th>
                      <th scope="col">Sold</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.getProComponent(this.state.Products)}
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

export default CatPro;
