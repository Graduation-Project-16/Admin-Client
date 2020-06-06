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
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import swal from 'sweetalert';
// core components
import Header from "components/Headers/Header.js";
import Axios from "axios";
import * as constant from '../../constants/config'
import Pagi from "components/Pagi";
import SearchBar from "components/SearchBar";

class CatPro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Categories: [],
      Products: [],
      FullCategories: [],
      FullProducts: [],
    }

    this.getListProduct();
    this.getListCategory();
  }

  getListProduct = () => {
    Axios.get(constant.serverdomain + "product/all").then(res => {
      this.setState({
        FullProducts: res.data.Products,
        Products: res.data.Products.slice(0, 5),
      });
    }).catch(err => {
      console.log(err);
    });
  }

  getListCategory = () => {
    Axios.get(constant.serverdomain + "category/all").then(res => {
      this.setState({
        FullCategories: res.data.Categories,
        Categories: res.data.Categories.slice(0, 5),
      });
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
          onClick={e => { e.preventDefault(); this.getProductByCatID(elements); }}>
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

  viewProductReview = product_id => {
    const { history } = this.props;
    history.push('/admin/productreview/' + product_id);
  }

  getProComponent = (arr) => {
    let Component = [];
    arr.forEach(elements => {
      Component.push(
        <tr onClick={e => { e.preventDefault(); this.viewProductReview(elements.id); }}>
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
          <td>{constant.toThousandString(elements.price)}</td>
          <td>{elements.owner_id}</td>
          <td>{elements.quantity}</td>
          <td>{elements.rate} sao</td>
          <td>{elements.sold}</td>



          <td className="text-right">
            <a href="/" onClick={e => { e.preventDefault(); this.deleteProduct(elements) }} style={{ width: '20px', height: '20px' }}>
              {elements.isDelete === 0 ?
                <i className="ni ni-fat-remove text-red"></i> :
                <i className="ni ni-fat-add text-green"></i>}
            </a>

          </td>
        </tr>
      );
    }
    )
    return Component;
  }

  getProductByCatID = element => {


    if (element === null) {
      this.getListProduct();
    } else {
      if (element.pnum === 0) {
        this.setState({
          Products: []
        });
      } else {
        Axios.get(constant.serverdomain + "product/productbycat/" + element.id).then(res => {
          this.setState({
            Products: res.data.products
          });
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }

  categoryChangePage = page => {
    this.setState({
      Categories: constant.changePage(this.state.FullCategories, page)
    })
  }

  productChangePage = page => {
    this.setState({
      Products: constant.changePage(this.state.FullProducts, page)
    })
  }

  productChangeText = key => {
    this.setState({
      Products: constant.search(this.state.FullProducts, key)
    })
  }

  categoryChangeText = key => {
    this.setState({
      Categories: constant.search(this.state.FullCategories, key)
    })
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
                <CardHeader classNameOrder="border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Categories</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <SearchBar searchFunction={this.categoryChangeText}></SearchBar>
                  </Col>
                  </Row>
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
                <Pagi data={this.state.FullCategories} changePageFunc={this.categoryChangePage}></Pagi>
              </Card>
            </div>
          </Row>

          {/* Table Products*/}
          <Row style={{ marginBottom: '20px' }}>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col xs="1">
                      <h3 className="mb-0">Product</h3>
                    </Col>
                    <Col className="text-left" xs="7">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => { e.preventDefault(); this.getProductByCatID(null); }}
                        size="sm"
                      >
                        All
                      </Button>
                    </Col>
                    <Col className="text-right" xs="4">
                      <SearchBar searchFunction={this.productChangeText}></SearchBar>
                    </Col>
                  </Row>
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
                <Pagi data={this.state.FullProducts} changePageFunc={this.productChangePage}></Pagi>

              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default CatPro;
