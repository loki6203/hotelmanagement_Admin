import { useEffect, useState } from 'react';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import DataTable from '../../components/DataTable/DataTable';
import { Icon, Select } from '../../components';
import amenities, { amenityColumns } from '../../store/users/AmenityData';
import axios from '../../services/axios';

import { Dropdown } from "react-bootstrap";

import { MediaGroup, Media, MediaText, Image, CustomDropdownToggle, CustomDropdownMenu, LinkList, LinkListItem } from "../../components";
import { toInitials } from "../../utilities";
import { kImageURL } from "../../services/constants";
import { toast } from 'react-toastify';
function PropertyTypesList() {
    const [deleteModal, setdeleteModal] = useState(false);
    const handleShowModal = () => setdeleteModal(true);
    const handleCloseModal = () => setdeleteModal(false);
    const [roomId, setRoomId] = useState(null)
    const [owners, setOwners] = useState(null);
    const getAllAminitiesList = async () => {
        const { data, status } = await axios.get("PropertyType/list");
        if (status === 200 || status === 201) {
            setOwners(data?.results)
        }
    }
    useEffect(() => {
        getAllAminitiesList();
    }, [])
    const deleteUser = async () => {
        const { data, status } = await axios.delete(`PropertyType/delete/${roomId}`)
        if (status == 204) {
            toast.success(`property type deleted successfully`)
            getAllAminitiesList();
            setdeleteModal(false)
        }
    }

    const propertyTypesColumns = [
        {
            name: "icon",
            grow: 2,
            selector: (row) => row.icon,
            cell: (row) => (
                <MediaGroup>
                    <Media size="md" shape="circle" variant={row.theme && row.theme}>
                        {row.icon ?
                            <Image src={kImageURL + row.icon} staticImage /> : ""
                        }
                    </Media>
                </MediaGroup>
            ),
        },
        {
            name: "Property Name",
            selector: (row) => row.title,
            cell: (row) => (
                <span>{row.title}</span>
            ),
            sortable: true,
            
        },
        {
            name: "status",
            selector: (row) => row.status,
            cell: (row) => (
                <span className={`badge text-bg-${row.status === "Active" ? "success-soft"
                        : row.status === "Pending" ? "warning-soft"
                            : row.status === "Inactive" ? "secondary-soft"
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
                                    <LinkListItem to={`/propetyTypes/add-propertyType/${row._id}`}>
                                        <Icon name="edit"></Icon><span>Edit</span>
                                    </LinkListItem>
                                    <li>
                                        <Button className="btn-custom" onClick={() => { setRoomId(row._id); handleShowModal() }}>
                                            <Icon name="trash"></Icon><span>Delete</span>
                                        </Button>
                                    </li>
                                    {/* <LinkListItem to={`/user-manage/user-edit/${row.id}`}>
                                    <Icon name="trash"></Icon><span>Delete</span>
                                </LinkListItem> */}
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
        <Layout title="Property Types" content="container">
            <Block.Head>
                <Block.HeadBetween>
                    <Block.HeadContent>
                        <Block.Title tag="h2">Property Types List</Block.Title>
                        <nav>
                            <ol className="breadcrumb breadcrumb-arrow mb-0">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Property type</li>
                            </ol>
                        </nav>
                    </Block.HeadContent>
                    <Block.HeadContent>
                        <ul className="d-flex">
                            <li>
                                <Link to="/propetyTypes/add-propertyType">
                                    <Button className="d-inline-flex" variant="primary">
                                        <Icon name="plus" />
                                        <span>Add Property Type</span>
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </Block.HeadContent>
                </Block.HeadBetween>
            </Block.Head>

            <Block>
                <Card>
                    <DataTable tableClassName="data-table-head-light table-responsive" data={owners ?? []} columns={propertyTypesColumns} />
                </Card>
            </Block>
            <Modal show={deleteModal} onHide={handleCloseModal}>
                <div className="modal-content">
                    <div className="modal-body p-5 text-center">
                        <div className="media media-rounded media-xxl media-middle mx-auto text-bg-danger mb-4"><em className="icon ni ni-cross"></em></div>
                        <h3>Are You Sure ?</h3>
                        <p className="small">This room will be removed permanently.</p>
                        <ul className="d-flex gap g-3 justify-content-center pt-1">
                            <li><Button variant="success" onClick={() => { deleteUser() }}>Yes Delete it!</Button></li>
                            <li><Button variant="danger" className="btn-soft" onClick={handleCloseModal}>Cancel</Button></li>
                        </ul>
                    </div>
                    <button type="button" className="btn-close position-absolute top-0 end-0 p-3" onClick={handleCloseModal} aria-label="Close"></button>
                </div>
            </Modal>
        </Layout>
    )
}

export default PropertyTypesList;