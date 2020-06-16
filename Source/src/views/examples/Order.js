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
  Container,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import OrderList from "components/OrderList.js";

class Order extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <OrderList props={this.props} user_id={0}/>
        </Container>
      </>
    );
  }
}

export default Order;
