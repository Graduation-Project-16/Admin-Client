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
  CardBody,
  Container,
  Row,
  Col,
  Table,
  Media,
  CardImg,
  CardTitle,
  CardSubtitle
} from "reactstrap";
// core components
import Axios from "axios";
import * as constant from "../../constants/config";
import Header from "../../components/Headers/Header"

class OrderDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Order: null,
      Products: []
    }
    this.getOrderDetail(props.match.params.order_id)
    this.getListProduct(props.match.params.order_id)
  }

  getOrderDetail = order_id => {
    Axios.get(constant.serverdomain + "order/allbyid/" + order_id).then(res => {
      this.setState({
        Order: res.data
      });
    }).catch(err => {
      console.log(err);
    });
  }

  getListProduct = order_id => {
    Axios.get(constant.serverdomain + "order/productbyid/" + order_id).then(res => {
      this.setState({
        Products: res.data
      });
    }).catch(err => {
      console.log(err);
    });
  }

  getProductsComponent = (arr) => {
    let Components = [];
    arr.forEach(element => {
      Components.push(
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          <Card style={{ marginBottom: '10px' }}>
            <CardBody style={{paddingBottom: '0px'}}>
              <CardTitle style={{textAlign: 'center'}}>{element.name}</CardTitle>
              
              <CardSubtitle style={{display:'flex', justifyContent:'space-between'}}>
                <p><b>Quantity: </b>{element.quantity}</p>
                <p><b>Price: </b>{constant.toThousandString(element.price)}/p</p>
              </CardSubtitle>
              
            </CardBody>
            <CardImg style={{ padding: '5px' }} src={element.image} alt="Card image cap" />
          </Card>
        </Col>
      );
    });

    return Components;
  }

  render() {

    const elements = this.state.Order;

    if (elements === null) {
      return (<></>)
    }

    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          {/* Order information */}
          <Row style={{ marginBottom: '20px' }}>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Information</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">User ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">TotalAmount</th>
                      <th scope="col">Shipping Address</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
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

                      <td>{constant.toThousandString(elements.totalamount)}</td>
                      <td>{elements.shippingaddress}</td>
                      <td>{new Date(elements.date).toString().substr(0, 10)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>

          <Row style={{ marginBottom: '20px' }}>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">List products</h3>
                </CardHeader>
                <CardBody className="bg-secondary shadow">
                  <Row>
                    {this.getProductsComponent(this.state.Products)}
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Row>

        </Container>

      </>
    )
  }
}

export default OrderDetail;