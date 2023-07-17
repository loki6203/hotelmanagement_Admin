import { Link } from 'react-router-dom';
import { Tab, Nav, Card, Button, Alert, Row, Col, Form, OverlayTrigger, Tooltip, ListGroup  } from 'react-bootstrap';
import Swal from 'sweetalert2/src/sweetalert2.js';

import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import { Image, Icon, Media, MediaGroup, MediaText, MediaAction, Select } from '../../components';

function ProfileSettingsPage() {
  
    // delete account alert
    const alertConfirm = () =>  {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if(result.value) {
              Swal.fire('Deleted', 'Your account has been deleted.', 'success')
            } else {
              Swal.fire('Cancelled', 'Your account is still intact', 'info')
            }
        })
    };

  return (
    <Layout title="My Settings" content="container">
        <Block.Head>
            <Block.HeadBetween className="align-items-start">
                <Block.HeadContent>
                    <div className="d-flex flex-column flex-md-row align-items-md-center">
                        <Media size="huge" shape="circle">
                            <Image src="/images/avatar/c.jpg" staticImage thumbnail alt="user"/> 
                        </Media>
                        <div className="mt-3 mt-md-0 ms-md-3">
                            <h3 className="title mb-1">Wesley Burland</h3>
                            <span className="small">Owner & Founder</span>
                        </div>
                    </div>
                </Block.HeadContent>
                
            </Block.HeadBetween>
        </Block.Head>

        <Tab.Container defaultActiveKey="tab-1">
            <Block.HeadBetween>
                <div className="gap-col">
                    <Nav variant="pills" className="nav-pills-border gap g-3">
                        <Nav.Item>
                            <Nav.Link eventKey="tab-2">Security</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </Block.HeadBetween>

            <Block className="mt-4">
                <Tab.Content>
                 
                    <Tab.Pane eventKey="tab-2" transition={false}>
                        <Card className="col-sep card-gutter-md">
                            <Card.Body>
                                <div className="bio-block">
                                    <h4 className="bio-block-title mb-4">Change Password</h4>
                                    <Form action="#">
                                        <Row className="g-3">
                                            <Col lg="4">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="oldPassword">Old Password</Form.Label>
                                                    <div className="form-control-wrap">
                                                        <a href="#password" className="form-control-icon end password-toggle" title="Toggle show/hide password">
                                                            <Icon name="eye-off" className="on"></Icon>
                                                            <Icon name="eye" className="off"></Icon>
                                                        </a>
                                                        <Form.Control type="text" placeholder="Old password"/>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col lg="4">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="newPassword">New Password</Form.Label>
                                                    <div className="form-control-wrap">
                                                        <a href="#password" className="form-control-icon end password-toggle" title="Toggle show/hide password">
                                                            <Icon name="eye-off" className="on"></Icon>
                                                            <Icon name="eye" className="off"></Icon>
                                                        </a>
                                                        <Form.Control type="text" placeholder="New password"/>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col lg="4">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="confirmPassword">Confirm New Password</Form.Label>
                                                    <div className="form-control-wrap">
                                                        <a href="#password" className="form-control-icon end password-toggle" title="Toggle show/hide password">
                                                            <Icon name="eye-off" className="on"></Icon>
                                                            <Icon name="eye" className="off"></Icon>
                                                        </a>
                                                        <Form.Control type="text" placeholder="Confirm New Password"/>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col lg="12">
                                                <div className="d-flex flex-wrap align-items-center gap g-3">
                                                    <div className="gap-col">
                                                        <Button variant="primary" type="submit">Change Password</Button>
                                                    </div>
                                                    <div className="gap-col">
                                                        <Link to="/auths/auth-reset" className="text-light small" target="_blank">Forgot Password?</Link>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Card.Body>
                        
                        </Card>
                    </Tab.Pane>
                    
                </Tab.Content>
            </Block>
        </Tab.Container>

    </Layout>
  )
}

export default ProfileSettingsPage;