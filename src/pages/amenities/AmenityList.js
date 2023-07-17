import { useEffect, useState } from 'react';
import { Card, Button, Modal, Form, Row, Col, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MediaGroup, Media, MediaText, Image, CustomDropdownToggle, CustomDropdownMenu, LinkList, LinkListItem } from "../../components";
import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import DataTable from '../../components/DataTable/DataTable';
import { Icon, Select } from '../../components';
import axios from '../../services/axios';
import { kImageURL } from '../../services/constants';
import { toast } from 'react-toastify';
function AmenityList() {
    const [deleteModal, setdeleteModal] = useState(false);
    const [owners, setOwners] = useState(null);
    const handleShowModal = () => setdeleteModal(true);
    const handleCloseModal = () => setdeleteModal(false);
    const [roomId, setRoomId] = useState(null)
    const getAllAminitiesList = async () => {
        const { data, status } = await axios.get("Amenties/list");
        if (status === 200 || status === 201) {
            setOwners(data?.results)
        }
    }
    useEffect(() => {
        getAllAminitiesList();
    }, [])
    const amenityColumns = [
        {
            name: "icon",
            grow: 2,
            selector: (row) => row.icon,
            cell: (row) => (
                <MediaGroup>
                    <Media size="md" shape="circle" variant={row.theme && row.theme}>
                    { row.icon ? 
                        <Image src={kImageURL +row.icon} staticImage/> : ""
                    }
                    </Media>
                </MediaGroup>
            ),
        },
        {
            name: "Amenity Name",
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
                <span className={`badge text-bg-${
                    row.status === "Active" ? "success-soft" 
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
                                    <LinkListItem to={`/amenities/add-amenity/${row._id}`}>
                                        <Icon name="edit"></Icon><span>Edit</span>
                                    </LinkListItem>
                                    <Button className="btn-custom" onClick={() => { setRoomId(row._id); handleShowModal() }}>
                                        <Icon name="trash"></Icon><span>Delete</span>
                                    </Button>
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
    const deleteUser = async () => {
        const { data, status } = await axios.delete(`Amenties/delete/${roomId}`)
        if (status == 204) {
            toast.success(`Amenity deleted successfully`)
            getAllAminitiesList();
            setdeleteModal(false)
        }
    }
  return (
    <Layout title="Amenity" content="container">
        <Block.Head>
            <Block.HeadBetween>
                <Block.HeadContent>
                    <Block.Title tag="h2">Amenity List</Block.Title>
                    <nav>
                        <ol className="breadcrumb breadcrumb-arrow mb-0">
                            <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Amenity</li>
                        </ol>
                    </nav>
                </Block.HeadContent>
                <Block.HeadContent>
                    <ul className="d-flex">
                        <li>
                            <Link to="/amenities/add-amenity">
                                <Button className="d-inline-flex" variant="primary">
                                    <Icon name="plus"/>
                                    <span>Add Amenity</span>
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </Block.HeadContent>
            </Block.HeadBetween>
        </Block.Head>

      <Block>
        <Card>
          <DataTable tableClassName="data-table-head-light table-responsive" data={owners ?? []} columns={amenityColumns}/>
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

export default AmenityList;