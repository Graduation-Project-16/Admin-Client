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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Axios from "axios";
import * as constant from "../constants/config";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      TopSellers: [],
      TopHards: [],
      SalesData: {
        labels: [],
        datasets: [
          {
            label: "Performance",
            data: []
          }
        ]
      },

      OrderData: {
        labels: [],
        datasets: [
          {
            label: "Performance",
            data: []
          }
        ]
      },
    };
    this.getTopSellers();
    this.getTopHardWork();
    this.getSalesData();
    this.getOrderData();
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    // e.preventDefault();
    // this.setState({
    //   activeNav: index,
    //   chartExample1Data:
    //     this.state.chartExample1Data === "data1" ? "data2" : "data1"
    // });
  };

  getTopSellers = () => {
    Axios.get(constant.serverdomain + "users/top/sellers").then(res => {
      this.setState({
        TopSellers: res.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  getTopHardWork = () => {
    Axios.get(constant.serverdomain + "live/hardwork").then(res => {
      this.setState({
        TopHards: res.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  getComponent = () => {
    let Components = [];
    this.state.TopSellers.forEach(element => {
      Components.push(
        <tr>
          <th scope="row">{element.id}</th>
          <td>{element.full_name}</td>
          <td>{element.order_num}</td>
          <td>
            {/* <i className="fas fa-arrow-up text-success mr-3" />{" "} */}
            {constant.toThousandString(element.sales)}
          </td>
        </tr>
      );
    });
    return Components;
  }

  getHardWork = () => {
    let Components = [];
    this.state.TopHards.forEach(element => {
      Components.push(
        <tr>
          <th scope="row">{element.id}</th>
          <td>{element.full_name}</td>
          <td>{element.duration}</td>
        </tr>
      );
    });
    return Components;
  }

  getSalesData = () => {
    Axios.get(constant.serverdomain + "admin/sales/month").then(res => {
      console.log(res.data);

      let labels = [];
      for (let i = res.data.length - 1; i >= 0; i--) {
        labels.push(res.data[i].labels);
      }

      let data = [];
      for (let i = res.data.length - 1; i >= 0; i--) {
        data.push(res.data[i].sales/1000);
      }


      this.setState({
        SalesData: {
          labels: labels,
          datasets: [
            {
              label: "Performance",
              data: data
            }
          ]
        }
      })
    }).catch(err => {
      console.log(err);
    })
  }

  getOrderData = () => {
    Axios.get(constant.serverdomain + "admin/numorder/month").then(res => {
      console.log(res.data);

      let labels = [];
      for (let i = res.data.length - 1; i >= 0; i--) {
        labels.push(res.data[i].mname.toString().substring(0,3));
      }

      let data = [];
      for (let i = res.data.length - 1; i >= 0; i--) {
        data.push(res.data[i].number);
      }


      this.setState({
        OrderData: {
          labels: labels,
          datasets: [
            {
              label: "Performance",
              data: data
            }
          ]
        }
      })
    }).catch(err => {
      console.log(err);
    })
  }

  render() {

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={this.state.SalesData}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total orders</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={this.state.OrderData}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Top Seller</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">User Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Sold</th>
                      <th scope="col">Sale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.getComponent()}
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Hard Work</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.getHardWork()}
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

export default Index;
