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
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";
import Axios from 'axios';
import * as constant from '../../constants/config'
import Header from "components/Headers/Header.js";
import Pagi from "components/Pagi";

class Voucher extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Vouchers: [],
      FullVouchers: []
    }

    this.getListVoucher();
  }

  getListVoucher = () => {
    Axios.get(constant.serverdomain + "live/all").then(res => {
      this.setState({
        FullVouchers: res.data,
        Vouchers: res.data.slice(0,5)
      });
    }).catch(err => {
      console.log(err);
    });
  }

  changePage = page => {
    this.setState({
      Vouchers: constant.changePage(this.state.Vouchers, page)
    });
  }

  getComponent = (arr) => {
    let Component = [];
    arr.forEach(elements => {
      Component.push(
        <tr onClick={e => {e.preventDefault(); }}>
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
          <td>{constant.toLocalDateTime(elements.start_time)}</td>
          <td>
            {elements.end_time === null ? <Badge color="" className="badge-dot mr-4">
              <i className="bg-success" />
              Living
            </Badge> : <Badge color="" className="badge-dot mr-4">
                <i className="bg-danger" />
                {constant.toLocalDateTime(elements.end_time)}
              </Badge>}
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
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table Vouchers*/}
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
                    {this.getComponent(this.state.Vouchers)}
                  </tbody>
                </Table>
                <Pagi data={this.state.FullVouchers} changePageFunc={this.changePage}/>
              </Card>
            </div>
          </Row>

        </Container>
      </>
    );
  }
}

export default Voucher;
