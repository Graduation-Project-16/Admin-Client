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
    Media,
} from "reactstrap";
// core components
import Axios from "axios";
import * as constant from "../../constants/config";
import Header from "../../components/Headers/Header"
import StarRatings from 'react-star-ratings';


class ProductReview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Product: null,
            Reviews: []
        }

        this.getProductDetail(this.props.match.params.product_id);
        this.getListReview(this.props.match.params.product_id);
    }

    getProductDetail = product_id => {
        Axios.get(constant.serverdomain + "product/" + product_id).then(res => {
            this.setState({
                Product: res.data.data[0]
            });
        }).catch(err => {
            console.log(err);
        });
    }

    getListReview = product_id => {
        Axios.get(constant.serverdomain + "product/productrate/" + product_id).then(res => {
            this.setState({
                Reviews: res.data
            });
            console.log(this.state.Reviews);
        }).catch(err => {
            console.log(err);
        });
    }

    getUserComponent = elements => {
        let Components = [];

        elements.forEach(element => {
            Components.push(
                <tr onClick={e => { e.preventDefault(); this.viewUserProfile(element.id); }}>
                    <td>
                        <Media className="align-items-center">
                            <span className="mb-0 text-sm">
                                {element.id}
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
                                    src={element.image}
                                />
                            </a>
                            <Media>
                                <span className="mb-0 text-sm">
                                    {element.full_name}
                                </span>
                            </Media>
                        </Media>
                    </th>

                    <td>{element.phone}</td>
                </tr>

            )
        });

        return Components;
    }

    getReviewComponent = () => {
        let Components = [];
        const { Reviews } = this.state;
        Reviews.forEach(e => {
            Components.push(
                <CardHeader>
                    <div><b>{e.full_name}</b>: {e.content}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <StarRatings className="small"
                                rating={e.rate}
                                starRatedColor="orange"
                                starDimension="12px"
                                starSpacing="2px">
                            </StarRatings>
                        </div>
                        <div className="small">{constant.toLocalDate(e.date)}</div>
                    </div>

                </CardHeader>
            );
        });
        return Components;
    }

    render() {
        const { Product } = this.state;
        if (Product === null) {
            return (
                <></>
            )
        }
        console.log(this.state);
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row style={{ 'marginBottom': '15px' }}>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="5">
                            <Card className="card-profile shadow">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <div className="card-profile-image">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    style={{ border: 'black solid 1px', height: '130px' }}
                                                    alt="..."
                                                    src={Product.image}
                                                />
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div className="d-flex justify-content-between">

                                    </div>
                                </CardHeader>
                                <CardBody className="pt-0 pt-md-4">
                                    <Row>
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center mt-md-1">
                                                <div className="text-center">
                                                    <h3>
                                                        {Product.name}
                                                        <span className="font-weight-light"> {/* Tuổi */}</span>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center" style={{ marginTop: '-14px' }}>
                                                <div>
                                                    <span className="heading">0</span>
                                                    <span className="description">Order</span>
                                                </div>
                                                <div>
                                                    <span className="heading">0</span>
                                                    <span className="description">Price</span>
                                                </div>
                                                <div>
                                                    <span className="heading">0</span>
                                                    <span className="description">Rate</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                    <div className="text-center">
                                        <h3>
                                            {Product.full_name}
                                            <span className="font-weight-light"> ({Product.owner_id})</span>
                                        </h3>
                                        <div className="h5 mt-4">
                                            <i className="ni location_pin mr-2" />
                                            Origin: {Product.origin}
                                        </div>
                                        <div className="h5 mt-4">
                                            <i className="ni business_briefcase-24 mr-2" />
                                            Material: {Product.material}
                                        </div>

                                        <hr className="my-4" />
                                        <p className="text-left">
                                            {Product.description}
                                        </p>
                                    </div>


                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="order-xl-1" xl="7">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Reviews</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Card className="card-profile shadow">
                                        {this.getReviewComponent()}
                                    </Card>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </>

        )
    }
}

export default ProductReview;