import React, { useState, useEffect } from "react";
import { Link, useParams  } from 'react-router-dom';
import { Tab, Nav, Card, Button, Alert, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';

import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import { Image, Icon, Schedule, Media, MediaGroup, MediaText } from '../../components';
import UsersData from '../../store/users/UsersData';
import { toInitials } from "../../utilities";

function UserProfilePage() {
    const { id } = useParams();
    const [ data ] = useState(UsersData);
    const [user, setUser] = useState(data[0]);

    // grabs the id form the url and loads the corresponding data
    useEffect(() => {
        let findUser = data.find((item) => item.id === id);
        setUser(findUser);
    }, [id, data]);

  return (
    <Layout title="Users Profile" content="container">
        <Block.Head>
            <Block.HeadBetween className="align-items-start">
                <Block.HeadContent>
                    <div className="d-flex flex-column flex-md-row align-items-md-center">
                        <Media size="huge" shape="circle" variant={user.theme && user.theme}>
                            {user.avatar ? 
                                <Image src={user.avatar} staticImage thumbnail alt="user"/> :
                                <span className="fw-medium">{toInitials(user.name)}</span>
                            }
                        </Media>
                        <div className="mt-3 mt-md-0 ms-md-3">
                            <h3 className="title mb-1">{user.name}</h3>
                            <ul className="nk-list-option pt-1">
                                <li><Icon name="map-pin"></Icon><span className="small">{user.address}</span></li>
                                <li><Icon name="building"></Icon><span className="small">{user.company}</span></li>
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
                            <Link to={`/user-manage/user-edit/${user.id}`} className="btn btn-soft btn-primary">
                                <Icon name="edit"></Icon>
                                <span>Edit Profile</span>
                            </Link>
                        </li>
                        <li className="d-md-none">
                            <Link to={`/user-manage/user-edit/${user.id}`} className="btn btn-soft btn-primary btn-icon">
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
                                                    <span className="text">45453423</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="title fw-medium w-40 d-inline-block">Full Name:</span>
                                                    <span className="text">{user.name}</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="title fw-medium w-40 d-inline-block">Email:</span>
                                                    <span className="text">{user.email}</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="title fw-medium w-40 d-inline-block">Address:</span>
                                                    <span className="text">{user.address}</span>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="title fw-medium w-40 d-inline-block">Joining Date</span>
                                                    <span className="text">{user.joining}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </Card.Body>
                                </div>
                                <div className="card-content col-sep">
                                 
                                    <Card.Body>
                                        <div className="bio-block">
                                            <h4 className="bio-block-title">Recent Activity</h4>
                                            {user.activity && 
                                                <Schedule className="mt-4">
                                                    {user.activity.map((item, index) => {
                                                        return (
                                                            <Schedule.Item symbol="active">
                                                                <span className="smaller">4:23 PM</span>
                                                                <div className="h6">Invitation for creative designs pattern</div>
                                                            </Schedule.Item>
                                                        )
                                                    })}
                                                </Schedule>
                                            }
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

export default UserProfilePage;