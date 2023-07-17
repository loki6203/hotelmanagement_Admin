import { useEffect, useState } from 'react';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import axios from '../../services/axios';
import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import DataTable from '../../components/DataTable/DataTable';
import { Icon, LinkListItem, Select } from '../../components';
import { Dropdown } from "react-bootstrap";

import { CustomDropdownToggle, CustomDropdownMenu, LinkList } from "../../components";
import { toast } from 'react-toastify';
function Area() {
    const location = useLocation();
    const [cities, setCities] = useState(null);
    const [roomId, setRoomId] = useState(null)
    const getAllHotel = async () => {
        const { data, status } = await axios.get(("Areas/list"));
        if (status === 200 || status === 201) {
            setCities(data?.results)
        }
    }
    function closeDeleteModal() {
        setDeleteModal(false);
    }
    const [deleteModal, setDeleteModal] = useState(false);
    useEffect(() => {
        getAllHotel();
    }, [])
    const deleteRoom = async () => {
        const { data, status } = await axios.delete(`Areas/delete/${roomId}`)
        if (status == 204) {
            toast.success("Area deleted successfully")
            getAllHotel();
            setDeleteModal(false)
        }
    }
    const areaColumns2 = [

        {
            name: "Name",
            selector: (row) => row.title,
            cell: (row) => (
                <span>{row.title}</span>
            ),
            sortable: true,
            
        },

        {
            name: "description",
            selector: (row) => row.description,
            cell: (row) => (
                <span> {row.description}</span>
            ),
            sortable: true,
            hide: "lg",
        },
        {
            name: "status",
            selector: (row) => row.status,
            cell: (row) => (
                <span className={`badge text-bg-${row.status === "Active" ? "success-soft"
                        : row.status === "Inactive" ? "warning-soft"
                            : "primary-soft"}`
                }>
                    {row.status ? row.status : 'General'}
                </span>
            ),
            sortable: true,
        },
        {
            name: "action",
            cell: (row) => (
                <div className="text-end w-100">
                    <Dropdown>
                        <Dropdown.Toggle size="sm" as={CustomDropdownToggle} className="btn btn-sm btn-icon btn-zoom me-n1">
                            <Icon name="more-v"></Icon>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-sm" as={CustomDropdownMenu} align="end">
                            <div className="dropdown-content py-1">
                                <LinkList className="link-list-hover-bg-primary link-list-md">
                                    <LinkListItem to={`/location/area-add`}>
                                        <Icon name="edit"></Icon><span>Edit</span>
                                    </LinkListItem>
                                    <li>
                                        <Button className="btn-custom" onClick={() => {setRoomId(row?._id);setDeleteModal(true)}}>
                                            <Icon name="trash"></Icon><span>Delete</span>
                                        </Button>
                                    </li>
                                </LinkList>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            ),
            sortable: false,
            
        },

    ];
    return (
        <Layout title="Cities" content="container">
            <Block.Head>
                <Block.HeadBetween>
                    <Block.HeadContent>
                        <Block.Title tag="h2">Area</Block.Title>
                        <nav>
                            <ol className="breadcrumb breadcrumb-arrow mb-0">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item">Location</li>
                                <li className="breadcrumb-item active" aria-current="page">Area</li>
                            </ol>
                        </nav>
                    </Block.HeadContent>
                    <Block.HeadContent>
                        <ul className="d-flex">
                            <li>
                                <Link to="/location/add-area">
                                    <Button className="d-inline-flex" variant="primary">
                                        <Icon name="plus" />
                                        <span>Add Area</span>
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </Block.HeadContent>
                </Block.HeadBetween>
            </Block.Head>

            <Block>
                <Card>
                    <DataTable tableClassName="data-table-head-light table-responsive" data={cities ?? []} columns={areaColumns2} />
                </Card>
            </Block>
            <Modal show={deleteModal} onHide={closeDeleteModal}>
                <div className="modal-content">
                    <div className="modal-body p-5 text-center">
                        <div className="media media-rounded media-xxl media-middle mx-auto text-bg-danger mb-4"><em className="icon ni ni-cross"></em></div>
                        <h3>Are You Sure ?</h3>
                        <p className="small">This room will be removed permanently.</p>
                        <ul className="d-flex gap g-3 justify-content-center pt-1">
                            <li><Button variant="success" onClick={() => { deleteRoom() }}>Yes Delete it!</Button></li>
                            <li><Button variant="danger" className="btn-soft" onClick={closeDeleteModal}>Cancel</Button></li>
                        </ul>
                    </div>
                    <button type="button" className="btn-close position-absolute top-0 end-0 p-3" onClick={closeDeleteModal} aria-label="Close"></button>
                </div>
            </Modal>
        </Layout>
    )
}

export default Area;