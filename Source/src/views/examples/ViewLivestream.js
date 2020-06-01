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
    Button
} from "reactstrap";
// core components
// import Axios from "axios";
// import * as constant from "../../constants/config";
import Header from "components/Headers/Header";
import VideoPlayer from "components/VideoPlayer";
import Axios from 'axios';
import * as constant from '../../constants/config';

class ViewLivestream extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            livestream: null
        }
        this.getLivestreamDetail();
    }

    getLivestreamDetail() {
        Axios.get(constant.serverdomain + 'live/detail/' + this.props.match.params.livestream_id).then(res => {
            this.setState({
                livestream: res.data
            });
            console.log(this.state.livestream);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const videoJsOptions = {
            autoplay: true,
            controls: false,
            preload: 'auto',
            userActions: {
                hotkeys: true
            },
            sources: [
                {
                    src: this.state.livestream ? this.state.livestream : '',
                    type: "rtmp/flv"
                }
            ]
        }

        if (!this.state.livestream) {
            return (<></>)
        }

        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--5" fluid>
                    <Row style={{ 'marginBottom': '15px' }}>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <div className="card-profile-image">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    className="rounded-circle"
                                                    src={this.state.livestream.image}
                                                />
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            className="float-right"
                                            color="default"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            size="sm"
                                        >
                                            Ban
                    </Button>
                                    </div>
                                </CardHeader>
                                <CardBody className="pt-0 pt-md-4">
                                    <Row>
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center mt-md-1">
                                                <div className="text-center">
                                                    <h3>
                                                        {this.state.livestream.full_name}
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
                                                    <span className="heading">{this.state.livestream.total_like}</span>
                                                    <span className="description">Like</span>
                                                </div>
                                                <div>
                                                    <span className="heading">{this.state.livestream.total_view}</span>
                                                    <span className="description">View</span>
                                                </div>
                                                <div>
                                                    <span className="heading">{constant.toLocalDateTime(this.state.livestream.start_time)}</span>
                                                    <span className="description">StartAt</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>

                                </CardBody>
                            </Card>
                        </Col>

                        <Col className="order-xl-1" xl="8">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Player</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            
                                                {this.state.livestream.title}
                                            
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <VideoPlayer {...videoJsOptions}></VideoPlayer>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </>
        );
    }
}

export default ViewLivestream;
