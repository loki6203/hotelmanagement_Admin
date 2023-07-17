import { Link } from 'react-router-dom';
import { Tab, Nav, Card, Button, Alert, Row, Col } from 'react-bootstrap';

import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import { Image, Icon, Schedule, Media, MediaGroup, MediaText, MediaAction } from '../../components';

function MyProfilePage() {
  return (
    <Layout title="My Profile" content="container">
        <Block.Head>
            <Block.HeadBetween className="align-items-start">
                <Block.HeadContent>
                    <div className="d-flex flex-column flex-md-row align-items-md-center">
                        <Media size="huge icon-append" shape="circle">
                            <Image src="/images/avatar/c.jpg" staticImage thumbnail alt="user"/> 
                        </Media>
                        <div className="mt-3 mt-md-0 ms-md-3">
                            <h3 className="title mb-1">Wesley Burland</h3>
                            <span className="small">Owner & Founder</span>
                            <ul className="nk-list-option pt-1">
                                <li><Icon name="map-pin"></Icon><span className="small">California, United States</span></li>
                                <li><Icon name="building"></Icon><span className="small">Softnio</span></li>
                            </ul>
                        </div>
                    </div>
                </Block.HeadContent>
            </Block.HeadBetween>
        </Block.Head>

        <Tab.Container defaultActiveKey="tabOne">
            <Block.HeadBetween>
                <div className="gap-col">
                    
                </div>
                <div className="gap-col">
                    <ul className="d-flex gap g-2">
                        <li className="d-none d-md-block">
                            <Link to="/admin/profile-settings" className="btn btn-soft btn-primary">
                                <Icon name="edit"></Icon>
                                <span>Edit Profile</span>
                            </Link>
                        </li>
                        <li className="d-md-none">
                            <Link to="/admin/profile-settings" className="btn btn-soft btn-primary btn-icon">
                                <Icon name="edit"></Icon>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Block.HeadBetween>

            <Block className="mt-4">
                <Tab.Content>
                    <Tab.Pane eventKey="tabOne">
                        <Card className="card-gutter-md">
                            <div className="card-row card-row-lg col-sep col-sep-lg">
                                <div className="card-aside">
                                    <Card.Body>
                                        <div className="bio-block">
                                            <h4 className="bio-block-title">Details</h4>
                                            <ul className="list-group list-group-borderless small">
                                                <li className="list-group-item">
                                                    <span className="title fw-medium w-40 d-inline-block">Account ID:</span>
                                                    <span className="text">ID-45453423</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="title fw-medium w-40 d-inline-block">Full Name:</span>
                                                    <span className="text">Wesley Burland</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="title fw-medium w-40 d-inline-block">Email:</span>
                                                    <span className="text">wesley@gmail.com</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="title fw-medium w-40 d-inline-block">Address:</span>
                                                    <span className="text">California, United States</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="title fw-medium w-40 d-inline-block">Joining Date</span>
                                                    <span className="text">2 Dec 2021</span>
                                                </li>
                                            </ul>
                                        </div>
                                      
                                    
                                    </Card.Body>
                                </div>
                                <div className="card-content col-sep">
                                   
                                    <Card.Body>
                                        <div className="bio-block">
                                            <h4 className="bio-block-title">Recent Activity</h4>
                                            <Schedule className="mt-4">
                                                <Schedule.Item symbol="active">
                                                    <span className="smaller">2:12 PM</span>
                                                    <div className="h6">Added 3 New Images</div>
                                                    <ul className="d-flex flex-wrap gap g-2 pt-2">
                                                        <li>
                                                            <Media size="xxl">
                                                                <Image src="/images/product/a.jpg" alt="gallery-img" thumbnail />
                                                            </Media>
                                                        </li>
                                                        <li>
                                                            <Media size="xxl">
                                                                <Image src="/images/product/b.jpg" alt="gallery-img" thumbnail />
                                                            </Media>
                                                        </li>
                                                        <li>
                                                            <Media size="xxl">
                                                                <Image src="/images/product/c.jpg" alt="gallery-img" thumbnail />
                                                            </Media>
                                                        </li>
                                                    </ul>
                                                </Schedule.Item>
                                                <Schedule.Item symbol="active">
                                                    <span className="smaller">4:23 PM</span>
                                                    <div className="h6">Invitation for creative designs pattern</div>
                                                </Schedule.Item>
                                                <Schedule.Item symbol="active" contentClass="nk-schedule-content-no-border">
                                                    <span className="smaller">10:30 PM</span>
                                                    <div className="h6">Task report - uploaded weekly reports</div>
                                                    <div className="list-group-dotted mt-3">
                                                        <div className="list-group-wrap">
                                                            <div className="p-3">
                                                                <MediaGroup>
                                                                    <Media className="rounded-0">
                                                                        <Image src="/images/icon/file-type-pdf.svg" alt="icon" />
                                                                    </Media>
                                                                    <MediaText className="ms-1">
                                                                        <a href="#download" className="title">Modern Designs Pattern</a>
                                                                        <span className="text smaller">1.6.mb</span>
                                                                    </MediaText>
                                                                </MediaGroup>
                                                            </div>
                                                            <div className="p-3">
                                                                <MediaGroup>
                                                                    <Media className="rounded-0">
                                                                        <Image src="/images/icon/file-type-doc.svg" alt="icon" />
                                                                    </Media>
                                                                    <MediaText className="ms-1">
                                                                        <a href="#download" className="title">cPanel Upload Guidelines</a>
                                                                        <span className="text smaller">18kb</span>
                                                                    </MediaText>
                                                                </MediaGroup>
                                                            </div>
                                                            <div className="p-3">
                                                                <MediaGroup>
                                                                    <Media className="rounded-0">
                                                                        <Image src="/images/icon/file-type-code.svg" alt="icon" />
                                                                    </Media>
                                                                    <MediaText className="ms-1">
                                                                        <a href="#download" className="title">Weekly Finance Reports</a>
                                                                        <span className="text smaller">10mb</span>
                                                                    </MediaText>
                                                                </MediaGroup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Schedule.Item>
                                                <Schedule.Item symbol="active">
                                                    <span className="smaller">3:23 PM</span>
                                                    <div className="h6">Assigned you to new database design project</div>
                                                </Schedule.Item>
                                                <Schedule.Item symbol="active" contentClass="nk-schedule-content-no-border flex-grow-1">
                                                    <span className="smaller">5:05 PM</span>
                                                    <div className="h6">You have received a new order</div>
                                                    <Alert variant="info" className="mt-2">
                                                        <div className="d-flex">
                                                            <Icon size="lg" name="file-code" className="opacity-75"></Icon>
                                                            <div className="ms-2 d-flex flex-wrap flex-grow-1 justify-content-between">
                                                                <div>
                                                                    <h6 className="alert-heading mb-0">Business Template - UI/UX design</h6>
                                                                    <span className="smaller">Shared information with your team to understand and contribute to your project.</span>
                                                                </div>
                                                                <div className="d-block mt-1">
                                                                    <Button size="md" variant="info">
                                                                        <Icon name="download"></Icon>
                                                                        <span>Download</span>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Alert>
                                                </Schedule.Item>
                                                <Schedule.Item symbol="active">
                                                    <span className="smaller">2:45 PM</span>
                                                    <div className="h6">Project status updated successfully</div>
                                                </Schedule.Item>
                                            </Schedule>
                                        </div>
                                    </Card.Body>
                                </div>
                            </div>
                        </Card>
                    </Tab.Pane>
                </Tab.Content>
            </Block>
        </Tab.Container>

    </Layout>
  )
}

export default MyProfilePage;